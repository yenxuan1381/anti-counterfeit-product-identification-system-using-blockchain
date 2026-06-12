/* eslint-disable @typescript-eslint/no-explicit-any */

import { BaseContract, Overrides } from 'ethers';
import { ChainData, chainConfig } from '../constants/chains'

/* eslint-disable @typescript-eslint/no-extra-semi */
export const shortenAddress = (address: string, subStart = 8, subEnd = 8) => {
  return (
    address.substring(0, subStart) +
    '...' +
    address.substring(address.length - subEnd, address.length)
  )
}

export const formatNumber = (num: number) => {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => Math.abs(num) >= x.threshold);
  if (found) {
    const formatted = (num / found.threshold).toFixed(2) + found.suffix;
    return formatted;
  }

  return num;
}

export const numberFormatter = (num: string) => {
  if (num.includes('.')) {
    // decimal
    num = parseFloat(num).toFixed(2)
  }

  return num
}

export const sixDigitsFormatter = (num: number): string => {
  if (num < 1) {
    return String(parseFloat(num.toPrecision(2)))
  }
  if (num <= 9999.99) {
    const amount = truncateExact(num, 2)
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else if (num <= 999999.99) {
    const amount = Math.trunc(num)
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  } else {
    const si = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
      { value: 1e6, symbol: 'M' },
      { value: 1e9, symbol: 'G' },
      { value: 1e12, symbol: 'T' },
      { value: 1e15, symbol: 'P' },
      { value: 1e18, symbol: 'E' },
    ]
    let i
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break
      }
    }
    const amount = truncate(num / si[i].value) + si[i].symbol
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
}

export const truncateExact = (num: number, fixed: number): number => {
  if (num) {
    const sNumber = num.toString()
    const index = sNumber.indexOf('.')
    const newNumber = index !== 0 ? sNumber : '0' + sNumber
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (fixed || -1) + '})?')
    const number = newNumber.toString().match(re)
    if (number) {
      return parseFloat(number[0])
    }
    return num
  } else {
    return num
  }
}
export const truncate = (num: number) => {
  if (num) {
    const floatedTo = num >= 1 ? 2 : 3
    const re = new RegExp('^-?\\d+(?:.\\d{0,' + (floatedTo || -1) + '})?')
    const number = num?.toString()?.match(re)
    if (number) {
      return number[0]
    }
  } else {
    return num
  }
}
type ChainChangeRequestType = (chainId: string, cb: () => void) => Promise<void>
type AddChainToMetamaskType = (
  chainData: ChainData,
  cb: () => void,
) => Promise<void>

export const chainChangeRequest: ChainChangeRequestType = async (
  chainId,
  cb,
) => {
  console.log('chainChangeRequest', chainId)
  ;(window as any).ethereum
    .request({
      method: 'eth_requestAccounts',
    })
    .then(function () {
      ;(window as any).ethereum
        .request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId,
            },
          ],
        })
        .then(() => {
          cb()
        })
        .catch((error: any) => {
          console.error('change req err #1', error)
          addChainToMetamask(chainConfig[chainId], cb)
        })
    })
    .catch((error: any) => {
      console.error('change req err #2', error)
      addChainToMetamask(chainConfig[chainId], cb)
    })
}
export const addChainToMetamask: AddChainToMetamaskType = async (
  chainData,
  cb,
) => {
  console.log('addChainToMetamask', chainData)
  try {
    ;(window as any).ethereum
      .request({
        method: 'eth_requestAccounts',
      })
      .then(function () {
        ;(window as any).ethereum
          .request({
            method: 'wallet_addEthereumChain',
            params: [chainData],
          })
          .then(() => {
            cb()
          })
          .catch((error: string) => {
            console.error('change add err #2', error)
          })
      })
  } catch (error) {
    console.error('change add err #1', error)
  }
}

export const validateAndFormatInput = (inputValue: string) => {
  // Remove any non-numeric characters except dot
  const cleanedInput = inputValue.replace(/[^\d.]/g, '')
  let parts = cleanedInput.split('.')
  let integerPart = parts[0]
  let decimalPart = parts[1] || ''

  if (integerPart.length >= 4) {
    // 1000 and above
    decimalPart = decimalPart.substring(0, 2)
  } else if (integerPart.length === 3) {
    // 100 - 999
    decimalPart = decimalPart.substring(0, 3)
  } else if (integerPart.length <= 2 && integerPart !== '0') {
    // 1 - 99
    decimalPart = decimalPart.substring(0, 4)
  } else if (integerPart === '0') {
    // Less than 1
    let nonZeroIndex = Array.from(decimalPart).findIndex(
      char => char !== '0' && char !== '.',
    )
    if (nonZeroIndex !== -1) {
      decimalPart = decimalPart.substring(0, nonZeroIndex + 4)
    }
  }

  return parts.length > 1 ? `${integerPart}.${decimalPart}` : integerPart
}

export const callStaticMethod = async (
  contract: BaseContract,
  methodName: string,
  args: Array<any>,
  overrides?: Overrides | (Overrides & { from?: string })
) : Promise<Boolean> => {
  // Cast the contract's callStatic property to any to bypass TypeScript's type checking
  const callStaticAny: any = contract.callStatic;

  // Now you can safely access the method using bracket notation
  const methodRef = callStaticAny[methodName];
  // Ensure the method actually exists before attempting to call it
  if (typeof methodRef !== "function") {
    throw new Error(`Method ${methodName} does not exist on contract.`);
  }

  // Perform the static call
  try {
    await methodRef(...args, overrides || {});
    return true;
  } catch (error: any) {
    // @ts-ignore
    const revertData = error.data;
    const decodedError = contract.interface.parseError(revertData);
    throw new Error(
      `Static call failed: error: ${decodedError.name} \nCalled method: ${error.method} with arguments: ${error.args}  `
    );
  }
}