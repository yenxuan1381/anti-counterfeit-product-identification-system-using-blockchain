import { useWeb3React } from '@web3-react/core'
import { utils } from 'ethers'
import { useEffect, useState } from 'react'

export default () => {
  const [txCost, setTxCost] = useState('0')
  const { provider } = useWeb3React()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      if (provider) {
        const gasPrice = await provider.getGasPrice()
        const transactionCost = utils.formatUnits(gasPrice.mul(21000), 'mwei')

        console.log(`Current transaction cost: ${transactionCost} BIT`)

        setTxCost(transactionCost)
      }
    })()
  }, [provider])

  return txCost
}
