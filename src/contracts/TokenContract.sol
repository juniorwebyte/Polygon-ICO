// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title GittuToken
 * @dev Token ERC-20 para produção com funcionalidades completas.
 *      Mint | Burn | Pause | ReentrancyGuard | Owner Control
 *
 * ======================= DEPLOY NO REMIX IDE =======================
 * 1. Acesse: https://remix.ethereum.org
 * 2. Cole este arquivo em: contracts/TokenContract.sol
 * 3. Compile com: Solidity 0.8.20, optimizer ativo (200 runs)
 * 4. Deploy: sem parâmetros no constructor
 * 5. Anote o endereço gerado (TOKEN CONTRACT ADDRESS)
 * ==================================================================
 */
contract GittuToken is ERC20, ERC20Burnable, ERC20Pausable, Ownable, ReentrancyGuard {

    // Supply total: 100 bilhões de tokens
    uint256 public constant MAX_SUPPLY = 100_000_000_000 * 10 ** 18;

    // Cap de mint por chamada (proteção contra erros)
    uint256 public constant MINT_CAP_PER_TX = 1_000_000_000 * 10 ** 18;

    // Controle de endereços bloqueados (anti-fraude)
    mapping(address => bool) public blacklisted;

    // Eventos
    event Blacklisted(address indexed account);
    event Unblacklisted(address indexed account);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor() ERC20("Gittu Token", "GITTU") Ownable(msg.sender) {
        // Mint do supply inicial para o owner
        _mint(msg.sender, MAX_SUPPLY);
    }

    // ==================== FUNÇÕES DO OWNER ====================

    /**
     * @dev Pausa todas as transferências de token
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Retoma as transferências de token
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Minta novos tokens (respeitando o MAX_SUPPLY)
     * @param to Endereço destino
     * @param amount Quantidade de tokens (com decimais)
     */
    function mint(address to, uint256 amount) public onlyOwner nonReentrant {
        require(to != address(0), "GittuToken: mint to zero address");
        require(amount > 0, "GittuToken: amount must be > 0");
        require(amount <= MINT_CAP_PER_TX, "GittuToken: exceeds per-tx mint cap");
        require(totalSupply() + amount <= MAX_SUPPLY, "GittuToken: exceeds max supply");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Adiciona endereço à blacklist
     */
    function blacklist(address account) public onlyOwner {
        require(account != address(0), "GittuToken: zero address");
        require(!blacklisted[account], "GittuToken: already blacklisted");
        blacklisted[account] = true;
        emit Blacklisted(account);
    }

    /**
     * @dev Remove endereço da blacklist
     */
    function unblacklist(address account) public onlyOwner {
        require(blacklisted[account], "GittuToken: not blacklisted");
        blacklisted[account] = false;
        emit Unblacklisted(account);
    }

    /**
     * @dev Recupera tokens ERC20 enviados por engano para este contrato
     */
    function recoverERC20(address tokenAddress, uint256 amount) public onlyOwner {
        require(tokenAddress != address(this), "GittuToken: cannot recover own token");
        IERC20(tokenAddress).transfer(msg.sender, amount);
    }

    // ==================== OVERRIDES INTERNOS ====================

    /**
     * @dev Hook de update: valida blacklist + pause
     */
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20, ERC20Pausable) {
        require(!blacklisted[from], "GittuToken: sender is blacklisted");
        require(!blacklisted[to], "GittuToken: recipient is blacklisted");
        super._update(from, to, value);
    }

    /**
     * @dev Retorna número de casas decimais (padrão 18)
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
