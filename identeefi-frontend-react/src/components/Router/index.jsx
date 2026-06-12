import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
// import Home from '@pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useWeb3React } from '@web3-react/core'
import GoldButton from '../../components/Buttons/GoldButton'
import { addChainToMetamask, chainChangeRequest } from '../../utils'
import { styled } from '@mui/material/styles'
import { SupportedChainId, chainConfig } from '../../constants/chains'
// import Info from '@pages/Info'
import Loader from '../../components/Loader'
import { useAppDispatch, useAppSelector } from '../../hooks/'
import { Alert, Box, Snackbar, Typography } from '@mui/material'
// import { StakeBackground } from '@assets/'
import { useSelector } from 'react-redux'
import { initialStateSnackbar, setSnackbar } from '../../redux/slices/themeSlice'
import { ThemeContainer } from './styles'
import { setAvailableContracts } from '../../redux/slices/walletSlice'
import {
  AvailableContracts,
  ChainContracts,
  ChainParams,
} from '../../hooks/useContract/types'

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

const Router = () => {
  const [showNetworkError, setShowNetworkError] = useState(null);

  const { account, chainId } = useWeb3React();

  const snackbarSelector = useAppSelector((state) => state.theme.snackbar);
  const availableContracts = useAppSelector((state) => state.wallet.availableContracts);

  const dispatch = useAppDispatch();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackbar(initialStateSnackbar));
  };

  const txInProgress = useAppSelector((state) => state.wallet.txInProgress);

  useEffect(() => {
    if (chainId) {
      if (
        chainId !== SupportedChainId.VANAR_TESTNET &&
        chainId !== SupportedChainId.GOERLI &&
        chainId !== SupportedChainId.HARDHAT_NETWORK &&
        chainId !== SupportedChainId.SEPOLIA
      ) {
        setShowNetworkError(true);
      } else setShowNetworkError(false);
    }
  }, [chainId]);

  useEffect(() => {
    if (
      (chainId &&
        (chainId === SupportedChainId.VANAR_TESTNET ||
          chainId === SupportedChainId.GOERLI)) ||
      chainId === SupportedChainId.HARDHAT_NETWORK ||
      chainId === SupportedChainId.SEPOLIA
    ) {
      let _chainId = chainId;

      dispatch(setAvailableContracts(ChainContracts[_chainId]));
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
              () => console.log('changed')
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

  return (
    <BrowserRouter>
      <ThemeContainer container flexDirection={'column'}>
        <Navbar />
        {txInProgress && <Loader />}

        <GoldButton
          style={{ marginTop: 10 }}
          onClick={() => {
            const desiredChainId = SupportedChainId.VANAR_TESTNET; // Example, you can set this dynamically
            chainChangeRequest(
              `0x${Number(desiredChainId).toString(16).toUpperCase()}`,
              () => console.log('Network switched')
            );
          }}
        >
          <Typography color="#000" variant="h6">
            Switch to Vanar Testnet
          </Typography>
        </GoldButton>

        {/* Other Routes and Components */}
      </ThemeContainer>

      <Snackbar
        open={snackbarSelector.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarSelector.severity}
          sx={{ width: '100%', background: '#000', color: '#FFFFFF' }}
        >
          {snackbarSelector.message}
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
};

export default Router;