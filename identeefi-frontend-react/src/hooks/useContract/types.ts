// import { Interface } from '@ethersproject/abi'
// import { Provider } from '@ethersproject/providers'
// import { Signer } from 'ethers'
// import { Contract } from '@ethersproject/contracts'
// import {
//   MantleToken__factory,
//   Depositor__factory,
//   StakingManager__factory,
//   StakingDatabase__factory,
//   RewardManager__factory,
// } from '@contracts/types'
// import { SupportedChainId } from '../../constants/chains'

// interface Factory {
//   readonly abi: unknown
//   createInterface: () => Interface
//   connect: (address: string, signerOrProvider: Signer | Provider) => Contract
// }

// export const ChainContracts = {
//   // TODO: change these contracts
//   // [SupportedChainId.VANAR_TESTNET]: {
//   //   LIQUID_TOKEN: '0x32A9B7E659e5c03DeDB7f9Bc794d72c6CA93B3DA',
//   //   DEPOSITOR: '0xb5c30d61558350C6278D058c89360794A2A09245',
//   //   STAKING_MANAGER: '0x5B8219f49Ef7001377B1Ce115d6BCdDFa751920C',
//   //   STAKING_DATABASE: '0x2F462789a607097E1ce413cb2a0eAB5c015615A5',
//   //   REWARD_MANAGER: '0x08cDef4Dab4657b2be254174cAa5086Ea6e87Bf8',
//   // },
//   [SupportedChainId.VANAR_TESTNET]: {
//     LIQUID_TOKEN: '0x32A9B7E659e5c03DeDB7f9Bc794d72c6CA93B3DA',
//     DEPOSITOR: '0xb5c30d61558350C6278D058c89360794A2A09245',
//     STAKING_MANAGER: '0x814268f0675d2145AdC15CE229428f384d8cfB58',
//     STAKING_DATABASE: '0xB083C03963e804dfa3e2233023eF9F4469694876',
//     REWARD_MANAGER: '0x8c44995d6619DcB73657A39790E5305753866Df4',
//     BOOST: '0xB81FA6c23740a84408665D3EcD3CD2cF37148a75'
//   },
//   [SupportedChainId.GOERLI]: {
//     LIQUID_TOKEN: '0x32A9B7E659e5c03DeDB7f9Bc794d72c6CA93B3DA',
//     DEPOSITOR: '0xb5c30d61558350C6278D058c89360794A2A09245',
//     STAKING_MANAGER: '0x7cF9c34447d80164696Be58D4650Bd951f3aE9cc',
//     STAKING_DATABASE: '0xEaC000B547c24958ca5203990B863cf1d4002FCa',
//     REWARD_MANAGER: '0xC65c64de34c1D50F15F2786548520894ae88B0B0',
//   },
//   //// SEPOLIA ////
//   [SupportedChainId.SEPOLIA]: {
//     LIQUID_TOKEN: '',
//     DEPOSITOR: '',
//     STAKING_MANAGER: '0x15DcF42c4440AE226c4e4aD5F66625C7FA39305d',
//     STAKING_DATABASE: '0x2c5aabc3e46A60E2D56a298176d4fa73d850a717',
//     REWARD_MANAGER: '0x30Df88513A915d988dbC681aFe52a1Fd545d4311',
//     BOOST: '0x66e01665Ae7599e87Cda3d67bF70F75dd11494C6',
//   },

//   [SupportedChainId.HARDHAT_NETWORK]: {
//     LIQUID_TOKEN: '0x32A9B7E659e5c03DeDB7f9Bc794d72c6CA93B3DA',
//     DEPOSITOR: '0xb5c30d61558350C6278D058c89360794A2A09245',
//     STAKING_MANAGER: '0xb4e9A5BC64DC07f890367F72941403EEd7faDCbB',
//     STAKING_DATABASE: '0xfc073209b7936A771F77F63D42019a3a93311869',
//     REWARD_MANAGER: '0xDC57724Ea354ec925BaFfCA0cCf8A1248a8E5CF1',
//   },
//   [SupportedChainId.BSC]: {
//     LIQUID_TOKEN: '',
//     DEPOSITOR: '',
//     STAKING_MANAGER: '0xc80574Cb9b4dA61Ef4166fC819B14b2A1Fd8bE79',
//     STAKING_DATABASE: '0xAbD3FAec929233BdF0B3a32d1eDd3e2429798f4F',
//     REWARD_MANAGER: '0x4370779C85b2E8bb30135289e4590ec82E6B28C6',
//     BOOST: '0x7c37bE66017BddF33568f7C9382892F6b5a8Ac0B',
//   },
// }

// export const AvailableContracts = {
//   LIQUID_TOKEN: '0x32A9B7E659e5c03DeDB7f9Bc794d72c6CA93B3DA',
//   DEPOSITOR: '0xb5c30d61558350C6278D058c89360794A2A09245',
//   STAKING_MANAGER: '0xb5c30d61558350C6278D058c89360794A2A09d45',
//   STAKING_DATABASE: '0xE4B22C03Ef30E414337343B8aF85b8e05735cf29',
//   REWARD_MANAGER: '0x32A9B7E659e5c03DeDB7f9Bc794d73c6CA93B3DA',
// }

// export interface ChainParams {
//   chainId:
//     | SupportedChainId.GOERLI
//     | SupportedChainId.VANAR_TESTNET
//     | SupportedChainId.HARDHAT_NETWORK
//     | SupportedChainId.SEPOLIA
//     | SupportedChainId.BSC
// }

// export const addressToFactoryMapping = ({ chainId }: ChainParams): any => {
//   // if chain is goerli return available contracts of goerli

//   // TODO: change these contracts
//   return {
//     [ChainContracts[chainId].DEPOSITOR]: Depositor__factory,
//     [ChainContracts[chainId].LIQUID_TOKEN]: MantleToken__factory,
//     [ChainContracts[chainId].STAKING_MANAGER]: StakingManager__factory,
//     [ChainContracts[chainId].STAKING_DATABASE]: StakingDatabase__factory,
//     [ChainContracts[chainId].REWARD_MANAGER]: RewardManager__factory,
//   }
// }
