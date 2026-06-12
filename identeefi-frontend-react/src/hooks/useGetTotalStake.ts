import { useState, useEffect, useCallback } from 'react'
import { useStakingDatabase } from './useContract/useStakingDatabase'
import { useStakingManager } from './useContract/useStakingManager'
import { ethers } from 'ethers'

export default (account: string) => {
  const [stakedAmount, setStakedAmount] = useState('0.0')

  const { getTotalStaked } = useStakingManager()

  const getStakedAmount = useCallback(async () => {
    let _totalStakedAmount = await getTotalStaked()

    _totalStakedAmount = ethers.utils.formatEther(_totalStakedAmount.toString())
    setStakedAmount(_totalStakedAmount.toString())
  }, [account])

  useEffect(() => {
    getStakedAmount()
  }, [getStakedAmount])

  return stakedAmount
}
