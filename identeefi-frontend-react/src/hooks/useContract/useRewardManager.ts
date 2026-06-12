import {
  RewardManager,
  StakingDatabase,
  StakingManager,
} from '@contracts/types'
import useContract from '.'
import { AvailableContracts } from './types'
import { useAppSelector } from '..'

export const useRewardManager = () => {
  const availableContracts = useAppSelector(
    state => state.wallet.availableContracts,
  )
  const rewardManagerContract = useContract<RewardManager>(
    availableContracts.REWARD_MANAGER,
  )

  const totalReward = async () => {
    const reward = await rewardManagerContract?.totalReward()
    return reward
  }

  return {
    totalReward,
  }
}
