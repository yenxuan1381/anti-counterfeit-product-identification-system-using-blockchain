export enum SupportedChainId {
  // MAINNET = 1,
  // ROPSTEN = 3,
  // RINKEBY = 4,
  GOERLI = 5,
  // KOVAN = 42,

  MANTLE_TESTNET = 5001,
  VANAR_TESTNET = 78600,
  SEPOLIA = 11155111,
  BSC = 97,

  //   ARBITRUM_ONE = 42161,
  //   ARBITRUM_RINKEBY = 421611,

  //   OPTIMISM = 10,
  //   OPTIMISTIC_KOVAN = 69,

  //   POLYGON = 137,
  //   POLYGON_MUMBAI = 80001,

  //   CELO = 42220,
  //   CELO_ALFAJORES = 44787,

  HARDHAT_NETWORK = 31337,
}

export const CHAIN_IDS_TO_NAMES = {
  // [SupportedChainId.MAINNET]: 'mainnet',
  // [SupportedChainId.ROPSTEN]: 'ropsten',
  // [SupportedChainId.RINKEBY]: 'rinkeby',
  [SupportedChainId.GOERLI]: 'goerli',
  // [SupportedChainId.KOVAN]: 'kovan',

  [SupportedChainId.MANTLE_TESTNET]: 'mantle_testnet',
  [SupportedChainId.VANAR_TESTNET]: 'Vanguard',
  [SupportedChainId.SEPOLIA]: 'sepolia',
  [SupportedChainId.BSC]: 'bsc',

  //   [SupportedChainId.POLYGON]: 'polygon',
  //   [SupportedChainId.POLYGON_MUMBAI]: 'polygon_mumbai',
  //   [SupportedChainId.CELO]: 'celo',
  //   [SupportedChainId.CELO_ALFAJORES]: 'celo_alfajores',
  //   [SupportedChainId.ARBITRUM_ONE]: 'arbitrum',
  //   [SupportedChainId.ARBITRUM_RINKEBY]: 'arbitrum_rinkeby',
  //   [SupportedChainId.OPTIMISM]: 'optimism',
  //   [SupportedChainId.OPTIMISTIC_KOVAN]: 'optimistic_kovan',
}

export interface ChainData {
  chainId: string
  chainName: string
  rpcUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  blockExplorerUrls: string[]
}

export const chainConfig: { [key: string]: ChainData } = {
  '0x1389': {
    chainId: '0x1389',
    chainName: 'Mantle testnet',
    rpcUrls: ['https://rpc.testnet.mantle.xyz'],
    nativeCurrency: {
      name: 'BIT',
      symbol: 'BIT',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer.testnet.mantle.xyz/'],
  },
  '0x5': {
    chainId: '0x5',
    chainName: 'Goerli',
    rpcUrls: ['https://goerli.infura.io/v3/'],
    nativeCurrency: {
      name: 'Goerli Ether',
      symbol: 'GoETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://goerli.etherscan.io'],
  },

  '0x6648E5': {
    chainId: '0x13308',
    chainName: 'Vanguard',
    rpcUrls: ['https://rpc-vanguard.vanarchain.com'],
    nativeCurrency: {
      name: 'Vanguard',
      symbol: 'VG',
      decimals: 18,
    },
    blockExplorerUrls: ['https://explorer-vanguard.vanarchain.com/'],
  },
  '11155111': {
    chainId: '0xaa36a7',
    chainName: 'Sepolia',
    rpcUrls: ['https://sepolia.infura.io/v3/'],
    nativeCurrency: {
      name: 'Sepolia Ether',
      symbol: 'ETH',
      decimals: 18,
    },
    // blockExplorerUrls: ['https://explorer-sepolia.vanarchain.com/'],
    blockExplorerUrls: ['https://sepolia.etherscan.io/']
  },
  '97': {
    chainId: '97',
    chainName: 'BSC',
    rpcUrls: ['https://data-seed-prebsc-2-s1.binance.org:8545/'],
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://testnet.bscscan.com/'],
  },
}
