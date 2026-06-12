import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig  } from '@web3modal/wagmi/react/config';
import { defineChain } from 'viem'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, bscTestnet } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from '../../components/Router'

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '7236c984a38479e85f91b945bd9076a8'
console.log('bsc bsc', bscTestnet)
// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const vanarChain = {
  id: 0x13308,
  name: 'Vanguard',
  nativeCurrency: { name: 'Vanar', symbol: 'VG', decimals: 18 },
  rpcUrls: {
    default: { 
      http: ['https://rpc-vanguard.vanarchain.com']},
  },
  blockExplorers: {
    default: { name: 'Vanguard Explorer', url: 'https://explorer-vanguard.vanarchain.com' },
  },
  // contracts: {
  //   ensRegistry: {
  //     address: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  //   },
  //   ensUniversalResolver: {
  //     address: '0xE4Acdd618deED4e6d2f03b9bf62dc6118FC9A4da',
  //     blockCreated: 16773775,
  //   },
  //   multicall3: {
  //     address: '0xca11bde05977b3631167028862be2a173976ca11',
  //     blockCreated: 14353601,
    // },
  // },
}




// const vanarChain = {
//   id: 0x13308, // Your custom chain's ID
//   name: 'Vanguard', // Name of your custom chain
//   rpcUrl: {
//     default: {
//       http: ['https://rpc-vanguard.vanarchain.com']
//     }
//   }, // RPC URL of your custom chain
//   nativeCurrency: {
//     name: 'Vanguard',
//     symbol: 'VG',
//     decimals: 18
//   },
//   blockExplorers: {
//     default: {
//       name: 'Vanguard Explorer',
//       url: 'https://explorer-vanguard.vanarchain.com',
//       apiUrl: ''
//     }
//   },
//   contracts: {
//   multicall3: {
//     address: '0xca11bde05977b3631167028862be2a173976ca11',
//     blockCreated: 7654707,
//   },
// };
// }
console.log("vanar",vanarChain)
const chains = [vanarChain, mainnet, arbitrum, bscTestnet]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // ...wagmiOptions // Optional - Override createConfig parameters
})
console.log("config",config)

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
})

function Web3ModalProvider() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}><Router /></QueryClientProvider>
    </WagmiProvider>
  )
}
export default Web3ModalProvider;