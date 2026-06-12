import React, { FC, useMemo } from 'react'
import { CssBaseline, PaletteMode, ThemeOptions } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useThemeSwitch } from '../hooks/switchTheme'


  // interface BreakpointOverrides {
  //   xs: true
  //   sm: true
  //   smd: true
  //   md: true
  //   lg: true
  //   xl: true
  //   mobile: false
  //   tablet: false
  //   laptop: false
  //   desktop: false
  // }

  // interface Palette {
  //   regular: Palette['primary']
  // }


const getDesignTokens = (mode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      smd: 992,
      md: 1152,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#fff',
            contrastText: '#9247FF',
          },
          background: {
            default: 'rgba(146, 71, 255, 0.10)',
            paper: '#020202',
          },
          text: {
            primary: '#fff',
            secondary: '#141414',
          },
          error: {
            main: '#ff0033',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#141414',
          },
          background: {
            default: 'rgba(146, 71, 255, 0.10)',
            paper: '#020202',
          },
          text: {
            primary: '#fff',
            secondary: '#141414',
          },
        }),
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'rgba(255,255,255,0.5)',
          fontWeight: '700',
          '&.Mui-selected': {
            color: 'rgba(255,255,255,1)',
            fontWeight: '700',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        contained: {
          background: '#03D9AF',
          color: '#101010',
          ':hover': {
            background: '#03D9AF',
            color: '#101010',
            opacity: '0.6',
          },
          ':disabled': {
            background: '#03D9AF',
            color: '#101010',
            opacity:"0.5",
          },
        },

        outlined: {
          border: '1px solid #FFFFF',
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        filled: {
          background: '#03D9AF',
          textTransform: 'uppercase',
          color: '#111111',
          fontSize: '14px',
          fontWeight: '500',
          ':hover': {
            background: '#03D9AF',
            textTransform: 'uppercase',
            color: '#111111',
            fontSize: '14px',
            fontWeight: '500',
          },
        },
        outlined: {
          border: '1px solid #03D9AF',
          color: '#FFFFFF',
          fontWeight: '500',
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '36px',
        },
        h2: {
          fontSize: '24px',
        },
        h3: {
          fontSize: '20px',
        },
        h4: {
          fontSize: '18px',
        },

        h5: {
          fontSize: '16px',
        },
        h6: {
          fontSize: '14px',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: '1px solid #FFFFFF',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        input: {
          '::placeholder': {
            color: '#F6F6F6',
            fontSize: '36px',
            opacity: '0.8',
          },
          color: '#F6F6F6',
          fontSize: '36px',
        },
      },
    },
  },

  typography: {
    fontFamily: 'Poppins',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
})

const Theme= ({ children }) => {
  const [mode] = useThemeSwitch()

  const theme = useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode],
  )

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default Theme
