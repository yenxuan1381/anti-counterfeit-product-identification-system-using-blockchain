import { Contract } from '@ethersproject/contracts'
import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { addressToFactoryMapping } from './types'
import { SupportedChainId } from '../../constants/chains'

export default function useContract<T extends Contract = Contract>(
  _contractAddress: string,
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (
      chainId !== SupportedChainId.VANAR_TESTNET &&
      chainId !== SupportedChainId.GOERLI &&
      chainId !== SupportedChainId.HARDHAT_NETWORK &&
      chainId !== SupportedChainId.SEPOLIA &&
      chainId !== SupportedChainId.BSC
    )
      return null
    const factory = addressToFactoryMapping({
      chainId: chainId ? chainId : SupportedChainId.GOERLI,
    })[_contractAddress]

    if (!provider || !account || !chainId || !factory) return null

    return factory.connect(
      _contractAddress,
      account ? provider.getSigner(account) : provider,
    ) as T
  }, [_contractAddress, provider, account, chainId])
}
