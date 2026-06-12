import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { chainChangeRequest } from '../../utils';
import { SupportedChainId } from '../../constants/chains';
import GoldButton from '../Buttons/GoldButton';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const WrongNetworkErrorContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  fontSize: 16,
}));

const NetworkCheck = ({ children }) => {
  const { chainId } = useWeb3React();
  const [showNetworkError, setShowNetworkError] = useState(false);

  useEffect(() => {
    console.log('chainId:', chainId); // Debugging
    if (chainId && chainId !== SupportedChainId.VANAR_TESTNET) {
      setShowNetworkError(true);
    } else {
      setShowNetworkError(false);
    }
  }, [chainId]);

  if (showNetworkError) {
    return (
      <WrongNetworkErrorContainer>
        <div>Unsupported Network, please switch to Vanar Testnet</div>
        <GoldButton
          style={{ marginTop: 10 }}
          onClick={() =>
            chainChangeRequest(
              `0x${Number(SupportedChainId.VANAR_TESTNET).toString(16).toUpperCase()}`,
              () => console.log('Network switched')
            )
          }
        >
          <Typography color="#000" variant="h6">
            Switch Network
          </Typography>
        </GoldButton>
      </WrongNetworkErrorContainer>
    );
  }

  return <>{children}</>;
};

export default NetworkCheck;
