// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title GittuPresale
 * @dev Contrato de Pré-Venda com suporte multi-chain, ReentrancyGuard,
 *      Pausable e proteções de segurança aprimoradas.
 *
 * ======================= DEPLOY NO REMIX IDE =======================
 * 1. Compile com Solidity 0.8.20, optimizer ON (200 runs)
 * 2. Parâmetros do constructor:
 *    - _payment   : Sua carteira (recebe os pagamentos)
 *    - _token     : Endereço do TokenContract.sol deployado
 *    - _priceFeed : Veja tabela de Price Feeds abaixo
 *
 * CHAINLINK PRICE FEEDS (MAINNET):
 * ┌──────────────┬─────────────────────────────────────────────────┐
 * │ Rede         │ Endereço do Price Feed (ETH/USD ou BNB/USD)     │
 * ├──────────────┼─────────────────────────────────────────────────┤
 * │ Ethereum     │ 0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419      │
 * │ BNB Chain    │ 0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE      │
 * │ Polygon      │ 0xAB594600376Ec9fD91F8e885dADF0CE036862dE0      │
 * │ Arbitrum     │ 0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612      │
 * │ Avalanche    │ 0x0A77230d17318075983913bC2145DB16C7366156      │
 * │ Base         │ 0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70      │
 * └──────────────┴─────────────────────────────────────────────────┘
 *
 * 3. Após deploy:
 *    a) Transfira tokens para o contrato de presale
 *    b) Chame flipPresaleActive() para ativar
 *    c) Configure os stages com setStage() se necessário
 * ==================================================================
 */
contract GittuPresale is Ownable, ReentrancyGuard, Pausable {

    // ==================== STATE VARIABLES ====================

    IERC20 public token;
    IERC20Metadata public tokenMetadata;
    AggregatorV3Interface public priceFeed;

    address public paymentAddress;
    uint256 public presaleTokenAmount;
    bool public presaleActive = false;
    uint256 public totalSold = 0;

    // Preço mínimo de compra em USD (8 decimais, ex: 1e6 = $0.01)
    uint256 public minPurchaseUSD = 1_000_000; // $0.01

    // Limite de tokens por carteira
    uint256 public maxTokensPerWallet = 0; // 0 = sem limite

    // Mapping de tokens comprados por carteira
    mapping(address => uint256) public walletPurchases;

    struct Stage {
        uint256 id;
        uint256 bonus;      // Bonus em % (ex: 20 = 20%)
        uint256 price;      // Preço em USD com 8 decimais (ex: 1e6 = $0.01/token)
        uint256 start;      // Unix timestamp de início
        uint256 end;        // Unix timestamp de fim
        uint256 sold;       // Tokens vendidos neste stage
        uint256 cap;        // Cap de tokens para este stage (0 = sem limite)
    }

    mapping(uint256 => Stage) public stages;
    uint256 public maxStage = 10;
    uint256 public currentStageId = 0;

    // ==================== EVENTOS ====================

    event TokensPurchased(
        address indexed buyer,
        uint256 tokenAmount,
        uint256 bonusAmount,
        uint256 ethPaid,
        uint256 stageId
    );
    event StageAdded(uint256 indexed stageId, uint256 price, uint256 bonus);
    event StageUpdated(uint256 indexed stageId, uint256 price, uint256 bonus);
    event PresaleToggled(bool active);
    event FundsWithdrawn(address indexed to, uint256 amount);
    event TokensWithdrawn(address indexed to, uint256 amount);
    event PaymentAddressUpdated(address indexed newAddress);
    event PriceFeedUpdated(address indexed newFeed);

    // ==================== CONSTRUCTOR ====================

    constructor(
        address _payment,
        address _token,
        address _priceFeed
    ) Ownable(msg.sender) {
        require(_payment != address(0), "Presale: zero payment address");
        require(_token != address(0), "Presale: zero token address");
        require(_priceFeed != address(0), "Presale: zero price feed address");

        token = IERC20(_token);
        tokenMetadata = IERC20Metadata(_token);
        paymentAddress = _payment;
        priceFeed = AggregatorV3Interface(_priceFeed);

        // Supply total de presale: 60% do supply (ajuste conforme necessário)
        // Defina manualmente com setPresaleTokenAmount() após deploy
        presaleTokenAmount = 60_000_000_000 * 10 ** 18;

        // ====== STAGES DE PRODUÇÃO ======
        // Stage 1: Fase Early Bird - 20% bonus, preço $0.001/token
        stages[1] = Stage({
            id: 1,
            bonus: 20,
            price: 100_000,         // $0.001 (8 decimais)
            start: 1745000000,      // Ajuste para sua data de início
            end: 1747591999,        // Ajuste para sua data de fim
            sold: 0,
            cap: 10_000_000_000 * 10 ** 18  // Cap: 10 bilhões de tokens
        });

        // Stage 2: Fase 2 - 15% bonus, preço $0.002/token
        stages[2] = Stage({
            id: 2,
            bonus: 15,
            price: 200_000,
            start: 1747592000,
            end: 1750183999,
            sold: 0,
            cap: 15_000_000_000 * 10 ** 18
        });

        // Stage 3: Fase 3 - 10% bonus, preço $0.003/token
        stages[3] = Stage({
            id: 3,
            bonus: 10,
            price: 300_000,
            start: 1750184000,
            end: 1752775999,
            sold: 0,
            cap: 15_000_000_000 * 10 ** 18
        });

        // Stage 4: Fase Final - 5% bonus, preço $0.004/token
        stages[4] = Stage({
            id: 4,
            bonus: 5,
            price: 400_000,
            start: 1752776000,
            end: 1755367999,
            sold: 0,
            cap: 20_000_000_000 * 10 ** 18
        });

        currentStageId = 4;
    }

    // ==================== LEITURA DE PREÇO ====================

    /**
     * @dev Retorna o preço do ativo nativo em USD (8 decimais)
     *      Ex: ETH/USD, BNB/USD, MATIC/USD via Chainlink
     */
    function getNativeToUsdPrice() public view returns (int256) {
        (, int256 price, , uint256 updatedAt, ) = priceFeed.latestRoundData();
        // Validação: feed não pode ter mais de 1 hora de atraso
        require(
            block.timestamp - updatedAt <= 3600,
            "Presale: stale price feed"
        );
        require(price > 0, "Presale: invalid price");
        return price;
    }

    /**
     * @dev Converte quantidade de ativo nativo para USD
     */
    function convertNativeToUsd(uint256 nativeAmount) public view returns (uint256) {
        int256 nativeToUsdPrice = getNativeToUsdPrice();
        uint256 usdAmount = (nativeAmount * uint256(nativeToUsdPrice)) /
            (10 ** priceFeed.decimals());
        return usdAmount;
    }

    /**
     * @dev Calcula quanto ativo nativo é necessário para comprar _amount tokens
     */
    function calculateCost(uint256 _amount) public view returns (uint256) {
        uint256 _id = getCurrentStageIdActive();
        require(_id > 0, "Presale: no active stage");
        uint256 _price = stages[_id].price;
        uint256 _totalPayUsd = _amount * _price;
        uint256 _nativeToUsd = convertNativeToUsd(1e18);
        return _totalPayUsd / _nativeToUsd;
    }

    // ==================== COMPRA DE TOKENS ====================

    /**
     * @dev Compra tokens durante a presale
     * @param _amount Número de tokens (SEM decimais, ex: 1000 = 1000 tokens)
     */
    function buyToken(uint256 _amount) public payable nonReentrant whenNotPaused {
        require(presaleActive, "Presale: not active");
        require(_amount > 0, "Presale: amount must be > 0");

        uint256 _id = getCurrentStageIdActive();
        require(_id > 0, "Presale: no active stage");

        Stage storage stage = stages[_id];
        require(block.timestamp >= stage.start, "Presale: not started yet");
        require(block.timestamp <= stage.end, "Presale: stage ended");

        // Calcular custo
        uint256 _price = stage.price;
        uint256 _totalPayUsd = _amount * _price;
        require(_totalPayUsd >= minPurchaseUSD, "Presale: below minimum purchase");

        uint256 _nativeToUsd = convertNativeToUsd(1e18);
        uint256 _totalPayAmount = _totalPayUsd / _nativeToUsd;
        require(msg.value >= _totalPayAmount, "Presale: insufficient payment");

        // Calcular tokens + bonus
        uint256 _weiAmount = _amount * 10 ** tokenMetadata.decimals();
        uint256 _bonusAmount = (_weiAmount * stage.bonus) / 100;
        uint256 _totalTokenAmount = _weiAmount + _bonusAmount;

        // Validações de cap
        if (stage.cap > 0) {
            require(
                stage.sold + _totalTokenAmount <= stage.cap,
                "Presale: stage cap reached"
            );
        }

        require(
            _totalTokenAmount <= token.balanceOf(address(this)),
            "Presale: insufficient token balance"
        );

        require(
            (totalSold + _totalTokenAmount) <= presaleTokenAmount,
            "Presale: total cap reached"
        );

        // Limite por carteira
        if (maxTokensPerWallet > 0) {
            require(
                walletPurchases[msg.sender] + _totalTokenAmount <= maxTokensPerWallet,
                "Presale: wallet cap reached"
            );
        }

        // Reembolso de excesso
        uint256 excess = msg.value - _totalPayAmount;

        // Transferência do pagamento
        (bool paymentSent, ) = paymentAddress.call{value: _totalPayAmount}("");
        require(paymentSent, "Presale: payment transfer failed");

        // Reembolso do excesso para o comprador
        if (excess > 0) {
            (bool refundSent, ) = msg.sender.call{value: excess}("");
            require(refundSent, "Presale: refund failed");
        }

        // Transferência dos tokens
        require(
            token.transfer(msg.sender, _totalTokenAmount),
            "Presale: token transfer failed"
        );

        // Atualizar estado
        totalSold += _totalTokenAmount;
        stage.sold += _totalTokenAmount;
        walletPurchases[msg.sender] += _totalTokenAmount;

        emit TokensPurchased(
            msg.sender,
            _weiAmount,
            _bonusAmount,
            _totalPayAmount,
            _id
        );
    }

    // ==================== LEITURA DE STAGE ====================

    /**
     * @dev Retorna o ID do stage ativo no momento
     */
    function getCurrentStageIdActive() public view returns (uint256) {
        for (uint256 i = 1; i <= currentStageId; i++) {
            if (
                block.timestamp >= stages[i].start &&
                block.timestamp <= stages[i].end
            ) {
                return i;
            }
        }
        return 0;
    }

    /**
     * @dev Retorna todas as informações de um stage
     */
    function getStageInfo(uint256 _id) public view returns (Stage memory) {
        require(stages[_id].id == _id, "Presale: stage not found");
        return stages[_id];
    }

    /**
     * @dev Retorna tokens comprados por uma carteira
     */
    function getWalletPurchases(address _wallet) public view returns (uint256) {
        return walletPurchases[_wallet];
    }

    // ==================== FUNÇÕES DO OWNER ====================

    function setToken(address _token) public onlyOwner {
        require(_token != address(0), "Presale: zero address");
        token = IERC20(_token);
        tokenMetadata = IERC20Metadata(_token);
    }

    function setPriceFeed(address _priceFeed) public onlyOwner {
        require(_priceFeed != address(0), "Presale: zero address");
        priceFeed = AggregatorV3Interface(_priceFeed);
        emit PriceFeedUpdated(_priceFeed);
    }

    function setPaymentAddress(address _paymentAddress) public onlyOwner {
        require(_paymentAddress != address(0), "Presale: zero address");
        paymentAddress = _paymentAddress;
        emit PaymentAddressUpdated(_paymentAddress);
    }

    function setPresaleTokenAmount(uint256 _amount) public onlyOwner {
        presaleTokenAmount = _amount;
    }

    function flipPresaleActive() public onlyOwner {
        presaleActive = !presaleActive;
        emit PresaleToggled(presaleActive);
    }

    function setMaxStage(uint256 _maxStage) public onlyOwner {
        maxStage = _maxStage;
    }

    function setMinPurchaseUSD(uint256 _minUSD) public onlyOwner {
        minPurchaseUSD = _minUSD;
    }

    function setMaxTokensPerWallet(uint256 _max) public onlyOwner {
        maxTokensPerWallet = _max;
    }

    function addStage(
        uint256 _bonus,
        uint256 _price,
        uint256 _start,
        uint256 _end,
        uint256 _cap
    ) public onlyOwner {
        uint256 _id = currentStageId + 1;
        require(_id <= maxStage, "Presale: max stages reached");
        require(_bonus <= 100, "Presale: bonus must be <= 100");
        require(_start > 0 && _end > 0, "Presale: invalid dates");
        require(_start < _end, "Presale: start must be before end");
        currentStageId += 1;
        stages[_id] = Stage(_id, _bonus, _price, _start, _end, 0, _cap);
        emit StageAdded(_id, _price, _bonus);
    }

    function setStage(
        uint256 _id,
        uint256 _bonus,
        uint256 _price,
        uint256 _start,
        uint256 _end,
        uint256 _cap
    ) public onlyOwner {
        require(stages[_id].id == _id, "Presale: stage not found");
        require(_bonus <= 100, "Presale: bonus must be <= 100");
        require(_start > 0 && _end > 0, "Presale: invalid dates");
        require(_start < _end, "Presale: start must be before end");
        uint256 _sold = stages[_id].sold;
        stages[_id] = Stage(_id, _bonus, _price, _start, _end, _sold, _cap);
        emit StageUpdated(_id, _price, _bonus);
    }

    function pausePresale() public onlyOwner {
        _pause();
    }

    function unpausePresale() public onlyOwner {
        _unpause();
    }

    function withdrawFunds() public onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "Presale: no funds to withdraw");
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Presale: withdraw failed");
        emit FundsWithdrawn(msg.sender, balance);
    }

    function withdrawTokens(address _to, uint256 _amount) public onlyOwner nonReentrant {
        require(_to != address(0), "Presale: zero address");
        uint256 _tokenBalance = token.balanceOf(address(this));
        require(_tokenBalance >= _amount, "Presale: insufficient token balance");
        require(token.transfer(_to, _amount), "Presale: transfer failed");
        emit TokensWithdrawn(_to, _amount);
    }

    // ==================== RECEBER ETH ====================
    receive() external payable {}
    fallback() external payable {}
}
