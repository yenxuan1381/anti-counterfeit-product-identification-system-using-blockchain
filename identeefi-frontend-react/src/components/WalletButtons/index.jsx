// import '@walletconnect/react-native-compat';
import React, { FC, useCallback, useEffect, useState } from 'react'
import {defaultWagmiConfig }from "@web3modal/wagmi"
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia,polygon,arbitrum } from 'wagmi/chains'
import { createWeb3Modal ,useWeb3Modal} from '@web3modal/wagmi/react'
import { WagmiProvider } from 'wagmi'
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import  {WagmiConfig} from 'wagmi'
// import { mainnet, polygon, arbitrum } from 'viem/chains'
import { Connector } from '@web3-react/types'
import {
  ConnectionType,
  getConnection,
  getConnectionName,
} from '../../connection'
import { useAppDispatch } from '../../hooks'
import { setSelectedWallet } from '../../redux/slices/walletSlice'
import { useWeb3React } from '@web3-react/core'
import GoldButton from '../../components/Buttons/GoldButton.jsx'
import OutlinedButton from '../../components/Buttons/OutlinedButton.jsx'
import { shortenAddress } from '../../utils'
import Toast from '../modals/Toast'
import { Box, Button, Grid, Typography, styled } from '@mui/material'
import ConnectWalletModal from '../modals/ConnectWalletModal'
// import { MetaMaskAvatar } from 'react-metamask-avatar'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
// import  ConnectionType  from '../../connection/index.js';

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'
// import { useNetwork } from 'wagmi'
// import { getChainId } from 'wagmi';

// const ButtonsContainer = styled('div')(() => ({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   // width: '310px',
//   justifyContent: 'center',
//   width:"100%",
//   border:"1px solid blue"
// }))

const projectId ='02199594d20a19c660e1e9df699e0800';
const metadata = {
  name: 'Web3Modal RN',
  description: 'Web3Modal RN Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}
const vanarChain = {
  id: 0x13308,
  name: 'Vanguard',
  nativeCurrency: { name: 'Vanar', symbol: 'VG', decimals: 18 },
  rpcUrls: {
    default: { 
      http: ['https://rpc-vanguard.vanarchain.com']},
  },
  blockExplorers: {
    default: { name: 'Vanguard Explorer', url: 'https://explorer-vanguard.vanarchain.com' },
  },
}
const chains = [mainnet, polygon, arbitrum, vanarChain] 

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

//new 
export const config = createConfig({
  chains: [mainnet, sepolia, vanarChain],
  connectors:[
    injected(),
    walletConnect({projectId}),
    metaMask(),
    safe()

  ],
  transports: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/'),
    [sepolia.id]: http(),
    [polygon.id]: http('https://polygon-rpc.com'),
    [vanarChain.id]:http('https://explorer-vanguard.vanarchain.com')
  },
})
 const ButtonsContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'fullWidth',
})(({ theme, fullWidth }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  // width: '310px',
  justifyContent:  'center',
  width: fullWidth ? '100%' : 'auto',
}))


 const ConnectWalletButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'fullWidth',
})(({ theme, fullWidth }) => ({
  borderRadius: '100px',
  width: fullWidth ? '100%' : 200,
  height: 50,
  fontSize: '16px',
  fontWeight: 600,
  textTransform: 'initial',
  background: '#03D9AF',
  color: '#101010',
}))



const WalletButtons = (props) => {
  console.log("wallet hook test");
  const { open, close } = useWeb3Modal()
  const { address, isConnecting, isDisconnected, isConnected } = useAccount()
  // console.log('is connect')

  // (async () => {
  //   const chainId = await getChainId();
  //   console.log('chain id', chainId)
  // })()

  // const { chain } = useNetwork()

  // console.log('chain id', chain)

  console.log('account', { address, isConnected })

  const [modalOpen, setModalOpen] = useState(false)
  // const { open: wagmiOpen, close } = useWeb3Modal()

  const { account, connector } = useWeb3React()

  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false)

  const dispatch = useAppDispatch()

  const [anchorEl, setAnchorEl] = React.useState(null)
  // const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    const connectionType = sessionStorage.getItem('connection-type')
    console.log('connection type', connectionType)

    if (connectionType) {
      const connector = getConnection(
        connectionType ,
      ).connector

      tryActivation(connector)
    }
  }, [])

  const tryActivation = useCallback(
    async (connector) => {
      const connectionType = getConnection(connector).type
    console.log(connectionType)
      sessionStorage.setItem('connection-type', connectionType)

      try {
        //  setPendingConnector(connector)
        //  setWalletView(WALLET_VIEWS.PENDING)
        //  dispatch(updateConnectionError({ connectionType, error: undefined }))

        await connector.activate()
        dispatch(setSelectedWallet(connectionType))
      } catch (error) {
        console.error(`web3-react connection error: ${error}`)
        // dispatch(
        //   updateConnectionError({ connectionType, error: error.message }),
        // )
        // sendAnalyticsEvent(EventName.WALLET_CONNECT_TXN_COMPLETED, {
        //   result: WALLET_CONNECTION_RESULT.FAILED,
        //   wallet_type: getConnectionName(connectionType, getIsMetaMask()),
        // })
      }
    },
    [dispatch],
  )

  useEffect(() => {
    console.log('wallet status changed', { isConnected })
  }, [isConnected])

  function onDisconnectClick() {
    sessionStorage.removeItem('connection-type')
    sessionStorage.removeItem('account')
    sessionStorage.removeItem('signature')

    connector.deactivate && connector.deactivate()
    connector.resetState && connector.resetState()
  }

  const handleDisconnectWallet = () => {
    console.log('disconnect')
    close()
  }

  return (
    <>


 
      <ButtonsContainer fullWidth={props.fullWidth ? true: false}>
        {address ? (      <ConnectWalletButton 
            onClick={() => {
              console.log('click')
              open()
            }}
           >Connect Wallet</ConnectWalletButton>) : shortenAddress(address.toLowerCase(), 4, 8)}
           {/* <button onClick={handleDisconnectWallet} >Disconnect</button> */}
        {/* {!account ? (
    
          <ConnectWalletButton
            variant="contained"
            onClick={() => setShowConnectWalletModal(true)}
            fullWidth={props.fullWidth ? true : false}
          >
            Connect Wallet
          </ConnectWalletButton>
        ) : (
          <>
             <Button
              variant="outlined"
              onClick={() => {
                navigator.clipboard.writeText(account)
                setModalOpen(true)
              }}
              sx={{
                marginRight: 1,
                textTransform: 'none',
              }}
            >
              {shortenAddress(account.toLowerCase(), 4, 8)}
            </Button>
            <Button
              variant="contained"
              style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              onClick={onDisconnectClick}
            >
              Disconnect
            </Button> 

            <Box
              onClick={handleClick}
              display={'flex'}
              alignItems={'center'}
              sx={{ cursor: 'pointer' }}
            >
              <MetaMaskAvatar address={account} size={24} />
              <Typography variant="h5" marginLeft={2}>
                {shortenAddress(account.toLowerCase(), 4, 8)}
              </Typography>
              <ArrowDropDownIcon />
            </Box>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              // open={open}
              open={false}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <MenuItem
                onClick={() => {
                  handleClose()
                  onDisconnectClick()
                }}
              >
                Disconnect
              </MenuItem>
            </Menu>
          </>
        )} */}
      </ButtonsContainer>
      <Toast
        open={modalOpen}
        setOpen={setModalOpen}
        message="Address copied to clipboard"
      />

      <ConnectWalletModal
        open={showConnectWalletModal}
        setOpen={setShowConnectWalletModal}
        wallets={ConnectionType?.wallets}
      />


    </>
  )
}

// export default {WalletButtons,ButtonsContainer,ConnectWalletButton}
export default WalletButtons;
