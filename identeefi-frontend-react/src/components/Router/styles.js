import { HomeBackground } from '../../assets/index'
import { Box, Grid } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ThemeContainer = styled(Grid)(({ theme }) => ({
  // background: 'linear-gradient(0deg, #0F051F, #0F051F)',
  display: 'flex',
  height: '100%',
  minHeight: '100vh',
  backgroundImage: `url(${HomeBackground})`,
  backgroundColor: '#020202',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize:"cover"
}))
