import { darken, styled } from '@mui/material/styles'

const OutlinedButton =  styled('button')(({ theme }) => ({
  backgroundColor: 'transparent',
  color: theme.palette.primary.main,
  border: `1px solid ${theme.palette.primary.main}`,
  padding: '10px',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'all 0.25s ease',
  height: 35,

  '&:hover': {
    color: `${darken(theme.palette.primary.main, 0.25)}`,
    border: `1px solid ${darken(theme.palette.primary.main, 0.25)}`,
  },
}))
export default OutlinedButton;