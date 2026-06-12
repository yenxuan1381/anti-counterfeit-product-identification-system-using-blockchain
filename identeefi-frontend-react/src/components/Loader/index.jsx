import React from 'react'
import './index.css'
import { Logo } from '../../assets/index'
import { Typography } from '@mui/material'

const Loader = () => {
  return (
    <div className="lds-container">
      <div className="lds-spinner">
        <div className="lds-inner">
          <img src={Logo} alt="logo" className="loader-logo" />
          <Typography variant="h4" marginTop={4}>
            Loading
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default Loader
