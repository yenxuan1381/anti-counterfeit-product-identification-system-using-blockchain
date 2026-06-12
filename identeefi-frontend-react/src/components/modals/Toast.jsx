import React, { useEffect } from 'react'

import { styled } from '@mui/material/styles'

const ToastBody = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  //color: theme.palette.background.paper,
  color: '#fff',
  background:
    'linear-gradient(85.44deg, #1A074B -9.45%, #BC40D9 64.38%, #FE834A 102.01%, #FE824C 244.22%)',
  position: 'fixed',
  bottom: 20,
  right: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 10,
  boxShadow: `17px 19px 37px -10px black`,
  padding: 16,
  zIndex: 99999999,
  transition: 'all 0.5s ease',
  fontSize: 14,
  fontWeight: 500,
}))



const Toast= ({ open, setOpen, message }) => {
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setOpen(false)
      }, 5000)
    }
  }, [open])

  if (!open) return null

  return <ToastBody onClick={() => setOpen(false)}>{message}</ToastBody>
}

export default Toast
