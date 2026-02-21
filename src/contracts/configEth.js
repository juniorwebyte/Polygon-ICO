// ============================================================
// ETHEREUM MAINNET - configEth.js
// Chain ID: 1 | Explorer: etherscan.io
// ============================================================

import TokenContractAbi from "./TokenContractAbi.json";
import PresaleContractAbi from "./PresaleContractAbi.json";

// Explorer link para transações
export const networkLink = "https://etherscan.io/tx/";

// ⚠️ ATUALIZE estes endereços após o deploy na mainnet ⚠️
const tokenContractAddress = "0xF1CD03880758F286a167438B787Be3facc285e65"; // TODO: mainnet address
export const presaleContractAddress = "0xE429f7A2BDac87e8B02C9a14E68C668f417Ec6ec"; // TODO: mainnet address

// Chain ID da Ethereum Mainnet
const contractChainId = 1;

// Configuração do contrato do token
export const tokenContractConfig = {
  address: tokenContractAddress,
  abi: TokenContractAbi,
  chainId: contractChainId,
};

// Leitura: nome do token
export const tokenNameCall = {
  ...tokenContractConfig,
  functionName: "name",
};

// Leitura: símbolo do token
export const tokenSymbolCall = {
  ...tokenContractConfig,
  functionName: "symbol",
};

// Leitura: decimais do token
export const tokenDecimalsCall = {
  ...tokenContractConfig,
  functionName: "decimals",
};

// Leitura: saldo de tokens de um endereço
export const tokenBalanceOfCall = {
  ...tokenContractConfig,
  functionName: "balanceOf",
};

// Configuração do contrato de presale
export const presaleContractConfig = {
  address: presaleContractAddress,
  abi: PresaleContractAbi,
  chainId: contractChainId,
};

// Leitura: total de tokens na presale
export const presaleTokenAmountCall = {
  ...presaleContractConfig,
  functionName: "presaleTokenAmount",
};

// Leitura: total de tokens vendidos
export const totalSoldCall = {
  ...presaleContractConfig,
  functionName: "totalSold",
};

// Leitura: número máximo de stages
export const maxStageCall = {
  ...presaleContractConfig,
  functionName: "maxStage",
};

// Leitura: stage atual ativo
export const currentStageIdCall = {
  ...presaleContractConfig,
  functionName: "getCurrentStageIdActive",
};

// Leitura: informações de um stage específico
export const currentStageInfoCall = {
  ...presaleContractConfig,
  functionName: "stages",
};

// Escrita: comprar tokens
export const buyTokenCall = {
  ...presaleContractConfig,
  functionName: "buyToken",
};

// Taxa de câmbio ETH/USD via Coinbase API
export const GetUSDExchangeRate = async () => {
  const requestOptions = { method: "GET", redirect: "follow" };
  return fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=ETH",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result.data.rates.USD)
    .catch((error) => {
      console.error("ETH/USD rate error:", error);
      return "0";
    });
};
