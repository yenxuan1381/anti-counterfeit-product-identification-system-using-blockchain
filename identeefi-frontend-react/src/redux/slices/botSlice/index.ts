import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Tx = {
  hash: string
  timeStamp: string
  to: string
  txreceipt_status: string
  value: string
  from: string
  USDC: number
  GOLD: number
  goldUSD: number
  method: string
}

export type Assets = {
  ETH: string
  USDC: string
  GOLD: string
}

interface BotState {
  txHistory: Tx[]
  assets: Assets
}

const initialState: BotState = {
  txHistory: [],
  assets: {
    ETH: '0',
    USDC: '0',
    GOLD: '0',
  },
}

export const botSlice = createSlice({
  name: 'bot',
  initialState,
  reducers: {
    setTxHistory: (state, action: PayloadAction<Tx[]>) => {
      state.txHistory = action.payload
    },
    setAssets: (state, action: PayloadAction<Assets>) => {
      state.assets = action.payload
    },
  },
})

export const { setTxHistory, setAssets } = botSlice.actions

export default botSlice.reducer
