// import { useWeb3React } from '@web3-react/core'
// import { useEffect, useState } from 'react'
// import useContract from './useContract'
// import { MantleToken } from '@contracts/types'
// import { AvailableContracts } from './useContract/types'
// import { utils } from 'ethers'
// import { useAppSelector } from '.'
// import { useSelector } from 'react-redux'

// type TokenInfos = {
//   [key: string]: {
//     decimals: string
//     balance: string
//     allowance: string
//     symbol: string
//   }
// }

// export default () => {
//   const { account, provider } = useWeb3React()

//   const availableContracts = useAppSelector(
//     state => state.wallet.availableContracts,
//   )
//   const liquidTokenContract = useContract<MantleToken>(
//     availableContracts.LIQUID_TOKEN,
//   )
//   const [tokenInfos, setTokenInfos] = useState<TokenInfos | undefined>()
//   const txInProgress = useAppSelector(state => state.wallet.txInProgress)

//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-extra-semi
//     ;(async () => {
//       try {
//         if (account && !txInProgress) {
//           const [
//             tokenBalance,
//             liquidTokenAllowance,
//             liquidTokenBalance,
//             liquidTokenDecimals,
//             liquidTokenSymbol,
//           ] = await Promise.all([
//             provider?.getBalance(account),
//             liquidTokenContract?.allowance(
//               account,
//               availableContracts.DEPOSITOR,
//             ),
//             liquidTokenContract?.balanceOf(account),
//             liquidTokenContract?.decimals(),
//             liquidTokenContract?.symbol(),
//           ])

//           setTokenInfos({
//             [availableContracts.LIQUID_TOKEN]: {
//               allowance: utils.formatUnits(liquidTokenAllowance || '0'),
//               balance: utils.formatUnits(liquidTokenBalance || '0'),
//               decimals: liquidTokenDecimals?.toString() || '0',
//               symbol: liquidTokenSymbol || '',
//             },
//             native: {
//               allowance: '0',
//               balance: utils.formatUnits(tokenBalance || '0'),
//               decimals: '18',
//               symbol: 'Bit',
//             },
//           })
//         }
//       } catch (error) {
//         console.error(error)
//       }
//     })()
//   }, [txInProgress])

//   return tokenInfos
// }
