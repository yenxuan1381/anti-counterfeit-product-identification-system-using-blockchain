import { styled } from '@mui/material/styles'

export default styled('div')<{ size?: number; weight?: number }>(
  ({ theme, size, weight }) => ({
    color: theme.palette.primary.main,
    fontSize: size || 20,
    fontWeight: weight || 'bold',
  }),
)
