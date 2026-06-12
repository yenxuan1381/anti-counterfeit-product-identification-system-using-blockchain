import { PaletteMode } from '@mui/material'
import { useAppDispatch, useAppSelector } from '..'
import { setTheme } from '../../redux/slices/themeSlice'

export const useThemeSwitch = (): [PaletteMode, () => void] => {
  const mode: PaletteMode = useAppSelector(state => {
    return state.theme.theme
  })

  const dispatch = useAppDispatch()

  const switchTheme = () => {
    dispatch(setTheme(mode === 'light' ? 'dark' : 'light'))
  }

  return [mode, switchTheme]
}
