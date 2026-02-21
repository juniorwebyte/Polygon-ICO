// ============================================================
// BNB SMART CHAIN MAINNET - configBnb.js
// Chain ID: 56 | Explorer: bscscan.com
// ============================================================

import TokenContractAbi from "./TokenContractAbi.json";
import PresaleContractAbi from "./PresaleContractAbi.json";

// Explorer link para transações
export const networkLink = "https://bscscan.com/tx/";

// ⚠️ ATUALIZE estes endereços após o deploy na mainnet ⚠️
const tokenContractAddress = "0x846DED5db577DdfB3C054F0c847f2F7bdc83919a"; // TODO: mainnet address
export const presaleContractAddress = "0xc58F918221ce4F51C8673D93Db5f658502FEC0Fb"; // TODO: mainnet address

// Chain ID da BNB Smart Chain Mainnet
const contractChainId = 56;

// Configuração do contrato do token
export const tokenContractConfig = {
  address: tokenContractAddress,
  abi: TokenContractAbi,
  chainId: contractChainId,
};

export const tokenNameCall = { ...tokenContractConfig, functionName: "name" };
export const tokenSymbolCall = { ...tokenContractConfig, functionName: "symbol" };
export const tokenDecimalsCall = { ...tokenContractConfig, functionName: "decimals" };
export const tokenBalanceOfCall = { ...tokenContractConfig, functionName: "balanceOf" };

// Configuração do contrato de presale
export const presaleContractConfig = {
  address: presaleContractAddress,
  abi: PresaleContractAbi,
  chainId: contractChainId,
};

export const presaleTokenAmountCall = { ...presaleContractConfig, functionName: "presaleTokenAmount" };
export const totalSoldCall = { ...presaleContractConfig, functionName: "totalSold" };
export const maxStageCall = { ...presaleContractConfig, functionName: "maxStage" };
export const currentStageIdCall = { ...presaleContractConfig, functionName: "getCurrentStageIdActive" };
export const currentStageInfoCall = { ...presaleContractConfig, functionName: "stages" };
export const buyTokenCall = { ...presaleContractConfig, functionName: "buyToken" };

// Taxa de câmbio BNB/USD via Coinbase API
export const GetUSDExchangeRate = async () => {
  const requestOptions = { method: "GET", redirect: "follow" };
  return fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=BNB",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result.data.rates.USD)
    .catch((error) => {
      console.error("BNB/USD rate error:", error);
      return "0";
    });
};
