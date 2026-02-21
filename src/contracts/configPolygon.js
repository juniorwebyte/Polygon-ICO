// ============================================================
// POLYGON MAINNET - configPolygon.js
// Chain ID: 137 | Explorer: polygonscan.com
// ============================================================

import TokenContractAbi from "./TokenContractAbi.json";
import PresaleContractAbi from "./PresaleContractAbi.json";

export const networkLink = "https://polygonscan.com/tx/";

// ⚠️ ATUALIZE estes endereços após o deploy na Polygon mainnet ⚠️
const tokenContractAddress = "0x0000000000000000000000000000000000000000"; // TODO: deploy address
export const presaleContractAddress = "0x0000000000000000000000000000000000000000"; // TODO: deploy address

const contractChainId = 137;

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

// Taxa de câmbio MATIC/USD
export const GetUSDExchangeRate = async () => {
  const requestOptions = { method: "GET", redirect: "follow" };
  return fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=MATIC",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result.data.rates.USD)
    .catch((error) => {
      console.error("MATIC/USD rate error:", error);
      return "0";
    });
};
