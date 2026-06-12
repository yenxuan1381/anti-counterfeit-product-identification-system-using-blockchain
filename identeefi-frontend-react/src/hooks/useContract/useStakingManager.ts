import { StakingManager } from '@contracts/types'
import useContract from '.'
import { AvailableContracts } from './types'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppSelector } from '..'

export const useStakingManager = () => {
  const availableContracts = useAppSelector(
    state => state.wallet.availableContracts,
  )

  const stakingManagerContract = useContract<StakingManager>(
    availableContracts?.STAKING_MANAGER,
  )

  // create stake function
  const stake = async (amount: string, address: string, activeLockUpOption: number) => {
    try {
      const tx = await stakingManagerContract?.stake(address, activeLockUpOption , {
        value: ethers.utils.parseEther(amount.toString()),
        gasLimit: 1000000,
      })

      return tx?.wait()
    } catch (error) {
      console.log(error)
    }
  }

  const unstake = async (amount: string) => {
    try {
      const tx = await stakingManagerContract?.unstake(
        ethers.utils.parseEther(amount),
        {
          gasLimit: 400000,
        },
      )

      return tx?.wait()
    } catch (error) {
      console.log(error)
    }
  }

  const claimReward = async () => {
    try {
      const tx = await stakingManagerContract?.claimReward({ gasLimit: 1000000 })
      return tx?.wait()
    } catch (error) {
      console.log(error)
    }
  }

  const getTotalStaked = async () => {
    try {
      const totalStaked = await stakingManagerContract?.totalStakedAmount()

      return totalStaked?.toString() || 0
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  return {
    stake,
    unstake,
    getTotalStaked,
    claimReward,
  }
}
