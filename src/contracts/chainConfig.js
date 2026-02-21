// ============================================================
// CHAIN CONFIG - Todas as redes de produção
// Suporta: ETH | BNB | Polygon | Arbitrum | Avalanche | Base
// ============================================================

import * as ConfigModuleEth from "./configEth";
import * as ConfigModuleBnb from "./configBnb";
import * as ConfigModulePolygon from "./configPolygon";
import * as ConfigModuleArbitrum from "./configArbitrum";
import * as ConfigModuleAvalanche from "./configAvalanche";
import * as ConfigModuleBase from "./configBase";

// ====== ÍCONES DAS REDES ======
// Substitua pelos ícones reais no diretório src/assets/images/token/
import IconEth from "../assets/images/token/eth.png";
import IconBnb from "../assets/images/token/bnb.png";
// Para as novas redes, adicione os ícones correspondentes:
// import IconPolygon from "../assets/images/token/polygon.png";
// import IconArbitrum from "../assets/images/token/arbitrum.png";
// import IconAvalanche from "../assets/images/token/avalanche.png";
// import IconBase from "../assets/images/token/base.png";

// Fallback para ícones que ainda não foram adicionados
const IconPolygon = IconEth;
const IconArbitrum = IconEth;
const IconAvalanche = IconBnb;
const IconBase = IconEth;

// ====== DEFINIÇÃO DAS REDES ======
const chains = {
  ETH: {
    id: 1,
    icon: IconEth,
    name: "Ethereum",
    chainId: 1,
    configModule: ConfigModuleEth,
    payWith: "ETH",
    title: "Buy on ETH",
    nativeCurrency: "ETH",
    color: "#627EEA",
  },
  BNB: {
    id: 2,
    icon: IconBnb,
    name: "BNB Chain",
    chainId: 56,
    configModule: ConfigModuleBnb,
    payWith: "BNB",
    title: "Buy on BNB",
    nativeCurrency: "BNB",
    color: "#F3BA2F",
  },
  POLYGON: {
    id: 3,
    icon: IconPolygon,
    name: "Polygon",
    chainId: 137,
    configModule: ConfigModulePolygon,
    payWith: "MATIC",
    title: "Buy on Polygon",
    nativeCurrency: "MATIC",
    color: "#8247E5",
  },
  ARBITRUM: {
    id: 4,
    icon: IconArbitrum,
    name: "Arbitrum",
    chainId: 42161,
    configModule: ConfigModuleArbitrum,
    payWith: "ETH",
    title: "Buy on Arbitrum",
    nativeCurrency: "ETH",
    color: "#28A0F0",
  },
  AVALANCHE: {
    id: 5,
    icon: IconAvalanche,
    name: "Avalanche",
    chainId: 43114,
    configModule: ConfigModuleAvalanche,
    payWith: "AVAX",
    title: "Buy on Avalanche",
    nativeCurrency: "AVAX",
    color: "#E84142",
  },
  BASE: {
    id: 6,
    icon: IconBase,
    name: "Base",
    chainId: 8453,
    configModule: ConfigModuleBase,
    payWith: "ETH",
    title: "Buy on Base",
    nativeCurrency: "ETH",
    color: "#0052FF",
  },
};

// ====== LISTA DE REDES PARA O FRONTEND ======
// Cada rede exibe a rede alternativa para troca rápida
export const chainInfo = [
  {
    ...chains.ETH,
    buyChainId: chains.BNB.chainId,
    buyTitle: chains.BNB.title,
    buyIcon: chains.BNB.icon,
    buyConfigModule: chains.BNB.configModule,
  },
  {
    ...chains.BNB,
    buyChainId: chains.ETH.chainId,
    buyTitle: chains.ETH.title,
    buyIcon: chains.ETH.icon,
    buyConfigModule: chains.ETH.configModule,
  },
  {
    ...chains.POLYGON,
    buyChainId: chains.ETH.chainId,
    buyTitle: chains.ETH.title,
    buyIcon: chains.ETH.icon,
    buyConfigModule: chains.ETH.configModule,
  },
  {
    ...chains.ARBITRUM,
    buyChainId: chains.ETH.chainId,
    buyTitle: chains.ETH.title,
    buyIcon: chains.ETH.icon,
    buyConfigModule: chains.ETH.configModule,
  },
  {
    ...chains.AVALANCHE,
    buyChainId: chains.BNB.chainId,
    buyTitle: chains.BNB.title,
    buyIcon: chains.BNB.icon,
    buyConfigModule: chains.BNB.configModule,
  },
  {
    ...chains.BASE,
    buyChainId: chains.ETH.chainId,
    buyTitle: chains.ETH.title,
    buyIcon: chains.ETH.icon,
    buyConfigModule: chains.ETH.configModule,
  },
];

// ====== HELPER: busca config pelo chainId ======
export const chainConfig = (chainId) => {
  const config = chainInfo.find((item) => item.chainId === chainId);
  return config || chainInfo[0]; // fallback para ETH
};

// ====== LISTA DE CHAIN IDs SUPORTADOS ======
export const supportedChainIds = chainInfo.map((c) => c.chainId);
// [1, 56, 137, 42161, 43114, 8453]

// ====== TABELA DE PRICE FEEDS CHAINLINK (MAINNET) ======
// Use estes endereços no constructor do PresaleContract.sol
export const chainlinkPriceFeeds = {
  1:     "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419", // ETH/USD - Ethereum
  56:    "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE", // BNB/USD - BSC
  137:   "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0", // MATIC/USD - Polygon
  42161: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612", // ETH/USD - Arbitrum
  43114: "0x0A77230d17318075983913bC2145DB16C7366156", // AVAX/USD - Avalanche
  8453:  "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70", // ETH/USD - Base
};
