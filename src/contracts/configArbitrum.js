// ============================================================
// ARBITRUM ONE MAINNET - configArbitrum.js
// Chain ID: 42161 | Explorer: arbiscan.io
// ============================================================

import TokenContractAbi from "./TokenContractAbi.json";
import PresaleContractAbi from "./PresaleContractAbi.json";

export const networkLink = "https://arbiscan.io/tx/";

// ⚠️ ATUALIZE estes endereços após o deploy na Arbitrum mainnet ⚠️
const tokenContractAddress = "0x0000000000000000000000000000000000000000"; // TODO: deploy address
export const presaleContractAddress = "0x0000000000000000000000000000000000000000"; // TODO: deploy address

const contractChainId = 42161;

export const tokenContractConfig = {
  address: tokenContractAddress,
  abi: TokenContractAbi,
  chainId: contractChainId,
};

export const tokenNameCall = { ...tokenContractConfig, functionName: "name" };
export const tokenSymbolCall = { ...tokenContractConfig, functionName: "symbol" };
export const tokenDecimalsCall = { ...tokenContractConfig, functionName: "decimals" };
export const tokenBalanceOfCall = { ...tokenContractConfig, functionName: "balanceOf" };

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

// Taxa de câmbio ETH/USD (Arbitrum usa ETH como gas)
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
