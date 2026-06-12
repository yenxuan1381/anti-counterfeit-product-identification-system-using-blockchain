import { AlertColor, PaletteMode } from '@mui/material'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISnackbar, ThemeState } from './theme.types'

export const initialStateSnackbar: ISnackbar = {
  message: '',
  open: false,
  severity: 'error',
}

const initialState: ThemeState = {
  theme: 'light',
  snackbar: initialStateSnackbar,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<PaletteMode>) => {
      state.theme = action.payload
    },
    setSnackbar: (state, action: PayloadAction<ISnackbar>) => {
      state.snackbar = action.payload
    },
  },
})

export const { setTheme, setSnackbar } = themeSlice.actions

export default themeSlice.reducer
