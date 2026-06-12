import { combineReducers } from 'redux'
import walletReducer from '../slices/walletSlice'
import themeReducer from '../slices/themeSlice'
import botReducer from '../slices/botSlice'

const reducers = combineReducers({
  wallet: walletReducer,
  theme: themeReducer,
  bot: botReducer,
})

export default reducers
