import { useState, useEffect, useCallback } from 'react'
import { useStakingDatabase } from './useContract/useStakingDatabase'
import { useAppSelector } from '.'
import { ethers } from 'ethers'

export default (account: string) => {
  const [stakedAmount, setStakedAmount] = useState('0.0')

  const { userDetails } = useStakingDatabase()
  const availableContracts = useAppSelector(
    state => state.wallet.availableContracts,
  )

  const getStakedAmount = useCallback(async () => {
    if (!availableContracts || !userDetails) {
      return
    }

    const details: any = await userDetails(account)

    if (!details) {
      return
    }

    const stakedAmount = ethers.utils.formatEther(
      details?.totalAmount.toString(),
    )

    setStakedAmount(stakedAmount)
  }, [userDetails, availableContracts])

  useEffect(() => {
    getStakedAmount()
  }, [getStakedAmount])

  return stakedAmount
}
