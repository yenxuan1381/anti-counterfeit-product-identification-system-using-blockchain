import { StakingDatabase, StakingManager } from '@contracts/types'
import useContract from '.'
import { AvailableContracts } from './types'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'
import { useAppSelector } from '..'

export const useStakingDatabase = () => {
  const availableContracts = useAppSelector(
    state => state.wallet.availableContracts,
  )

  const stakingDatabaseContract = useContract<StakingDatabase>(
    availableContracts?.STAKING_DATABASE,
  )

  const userDetails = async (address: string) => {
    console.log('userDetails', { address, stakingDatabaseContract })
    try {
      const user = await stakingDatabaseContract?.userDetails(
        address.toLowerCase(),
      )
      return user
    } catch (error) {
      console.log('userDetails error', error)
    }
  }

  const getTotalShare = async () => {
    const totalShare = await stakingDatabaseContract?.totalShare()
    return totalShare;
  }

  const getUserDetailsForReward = async (address: string) => {
    const user = await stakingDatabaseContract?.getUserDetailsForReward(address)
    return user
  }

  const getUserDetails = async (address: string) => {
    const user = await stakingDatabaseContract?.getUserDetails(address)
    return user
  }
  const getUserReward = async (address: string, stakedAmount: string) => {
    console.log('getUserReward', address, stakedAmount)
    const user = await stakingDatabaseContract?.getUserReward(
      address,
      stakedAmount,
      0,
    )
    return user
  }

  return {
    userDetails,
    getUserDetailsForReward,
    getUserDetails,
    getUserReward,
    getTotalShare,
  }
}
