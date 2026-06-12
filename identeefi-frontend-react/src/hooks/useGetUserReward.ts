import { useState, useEffect, useCallback } from 'react'
import { useStakingDatabase } from './useContract/useStakingDatabase'
import { ethers } from 'ethers'
import BigNumber from 'bignumber.js'

export default (account: string) => {
  const [userReward, setUserReward] = useState('0.0')
  const { getUserReward, getUserDetails } = useStakingDatabase()

  const fetchUserReward = useCallback(async () => {
    let _userDetailsForReward: any = await getUserDetails(
      account?.toLowerCase(),
    )

    if (!_userDetailsForReward) return

    if (_userDetailsForReward[3].toString() <= 0) {
      setUserReward('0.0')
      return
    }

    let _userReward: any = await getUserReward(
      account?.toLowerCase(),
      _userDetailsForReward[3],
    )

    // calculate user reward

    let _totalStakedAmount = new BigNumber(_userDetailsForReward[3].toString())

    let _stakedAmountPlusReward = new BigNumber(_userReward[0].toString())

    _stakedAmountPlusReward = _stakedAmountPlusReward.minus(_totalStakedAmount)

    if (_stakedAmountPlusReward.isGreaterThanOrEqualTo(0)) {
      setUserReward(
        ethers.utils.formatEther(_stakedAmountPlusReward.toString()),
      )
    } else {
      setUserReward('0.0')
    }
  }, [account])

  useEffect(() => {
    fetchUserReward()
  }, [fetchUserReward])

  return userReward
}
