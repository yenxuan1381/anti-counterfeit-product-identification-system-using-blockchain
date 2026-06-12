// // ChangeNetwork.jsx

// import React, { useEffect, useState } from 'react';
// import Navbar from '../Navbar';
// // import Home from '@pages/Home';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import GoldButton from '../../components/Buttons/GoldButton';
// import { styled } from '@mui/material/styles';
// import { SupportedChainId } from '../../constants/chains';
// import Loader from '../../components/Loader';
// import { useAppDispatch, useAppSelector } from '../../hooks/';
// import { Alert, Snackbar, Typography } from '@mui/material';
// import { setSnackbar, initialStateSnackbar } from '../../redux/slices/themeSlice';
// import { ThemeContainer } from './styles';
// // import Test from '@pages/Test';
// import { useChainId, useSwitchChain } from 'wagmi';

// const WrongNetworkErrorContainer = styled('div')(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   height: '100vh',
//   width: '100vw',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   color: theme.palette.primary.main,
//   fontSize: 16,
// }));

// const ChangeNetwork = () => {
//   const [showNetworkError, setShowNetworkError] = useState(null);
//   const { chainId: chainIdWagmi } = useChainId();
//   const { switchChain } = useSwitchChain();

//   const snackbarSelector = useAppSelector((state) => state.theme.snackbar);
//   const dispatch = useAppDispatch();

//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     dispatch(setSnackbar(initialStateSnackbar));
//   };

//   useEffect(() => {
//     if (chainIdWagmi) {
//       if (
//         chainIdWagmi !== SupportedChainId.VANAR_TESTNET &&
//         chainIdWagmi !== SupportedChainId.GOERLI &&
//         chainIdWagmi !== SupportedChainId.HARDHAT_NETWORK &&
//         chainIdWagmi !== SupportedChainId.SEPOLIA &&
//         chainIdWagmi !== SupportedChainId.BSC &&
//         chainIdWagmi !== SupportedChainId.MAINNET
//       ) {
//         setShowNetworkError(true);
//       } else {
//         setShowNetworkError(false);
//       }
//     }
//   }, [chainIdWagmi]);

//   if (showNetworkError) {
//     return (
//       <WrongNetworkErrorContainer>
//         <div>Unsupported Network, please switch to Vanar Testnet</div>
//         <GoldButton
//           style={{ marginTop: 10 }}
//           onClick={() => switchChain(78600)}
//         >
//           <Typography color="#000" variant="h6">
//             Switch Network
//           </Typography>
//         </GoldButton>
//       </WrongNetworkErrorContainer>
//     );
//   }

//   return (
//     <BrowserRouter>
//       <ThemeContainer container flexDirection={'column'}>
//         <Navbar />
//         <Loader />

//         <Routes>
//           {/* <Route path="/" element={<Home />} /> */}
//           {/* <Route path="/test" element={<Test />} /> */}
//         </Routes>
//       </ThemeContainer>

//       <Snackbar
//         open={snackbarSelector.open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
//       >
//         <Alert
//           onClose={handleClose}
//           severity={snackbarSelector.severity}
//           sx={{ width: '100%', background: '#000', color: '#FFFFFF' }}
//         >
//           {snackbarSelector.message}
//         </Alert>
//       </Snackbar>
//     </BrowserRouter>
//   );
// };

// export default ChangeNetwork;
