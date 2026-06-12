import { AlertColor, PaletteMode } from '@mui/material'

export interface ISnackbar {
  severity?: AlertColor
  open: boolean
  message?: string
}

export interface ThemeState {
  theme: PaletteMode
  snackbar: ISnackbar
}
