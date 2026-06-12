import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectionType } from '../../../connection'
interface WalletState {
  selectedWallet: ConnectionType
  txInProgress: boolean
  availableContracts: any
}

const initialState: WalletState = {
  selectedWallet: ConnectionType.INJECTED,
  txInProgress: false,
  availableContracts: null,
}

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setSelectedWallet: (state, action: PayloadAction<ConnectionType>) => {
      state.selectedWallet = action.payload
    },
    setTxInProgress: (state, action: PayloadAction<boolean>) => {
      state.txInProgress = action.payload
    },

    setAvailableContracts: (state, action: PayloadAction<any>) => {
      state.availableContracts = action.payload
    },
  },
})

export const { setSelectedWallet, setTxInProgress, setAvailableContracts } =
  walletSlice.actions

export default walletSlice.reducer
