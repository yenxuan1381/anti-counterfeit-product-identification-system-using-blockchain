import { darken, styled } from '@mui/material/styles'

const GoldButton =styled('button')(({theme,disabled}) => ({
    backgroundColor: !disabled
      ? theme.palette.primary.main
      : darken(theme.palette.primary.main, 0.25),
    color: theme.palette.background.default,
    border: !disabled
      ? `1px solid ${theme.palette.primary.main}`
      : `1px solid ${darken(theme.palette.primary.main, 0.25)}`,
    // padding: '10px',
    cursor: !disabled ? 'pointer' : 'auto',
    borderRadius: '5px',
    transition: 'all 0.25s ease',
    height: 35,

    '&:hover': {
      backgroundColor: `${darken(theme.palette.primary.main, 0.25)}`,
      border: `1px solid ${darken(theme.palette.primary.main, 0.25)}`,
    },
  }),
)
export default GoldButton;