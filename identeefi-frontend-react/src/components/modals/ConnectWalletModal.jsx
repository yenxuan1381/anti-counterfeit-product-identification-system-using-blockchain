import React, { useCallback, useEffect } from 'react'
import { Box, Button, Modal } from '@mui/material'
import ModalBody from '../ModalBody'
import {
  ConnectionType,
  getConnection,
  getConnectionName,
} from '../../connection'
import GoldenTitle from '../Titles/GoldenTitle'
import { Connector } from '@web3-react/types'
import { useAppDispatch } from '../../hooks'
import { useWeb3React } from '@web3-react/core'
import { setSelectedWallet } from '../../redux/slices/walletSlice'



const ConnectWalletModal =({ open, setOpen, wallets }) => {
  const { account, connector } = useWeb3React()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const connectionType = sessionStorage.getItem('connection-type')

    if (connectionType) {
      const connector = getConnection(
        connectionType,
      ).connector

      tryActivation(connector)
    }
  }, [])

  const tryActivation = useCallback(
    async (connector) => {
      const connectionType = getConnection(connector).type

      sessionStorage.setItem('connection-type', connectionType)

      try {
        //  setPendingConnector(connector)
        //  setWalletView(WALLET_VIEWS.PENDING)
        //  dispatch(updateConnectionError({ connectionType, error: undefined }))

        await connector.activate()
        dispatch(setSelectedWallet(connectionType))
        setOpen(false)
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

  function onDisconnectClick() {
    sessionStorage.removeItem('connection-type')
    sessionStorage.removeItem('account')
    sessionStorage.removeItem('signature')

    connector.deactivate && connector.deactivate()
    connector.resetState && connector.resetState()
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <ModalBody
          sx={{
            height: '200px',
            width: '300px',
            border:"1px solid #FFFF"
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '20px',
              height: '70px',
            }}
          >
            <GoldenTitle>Connect Wallet</GoldenTitle>
            
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              // height: 'calc(100% - 70px)',
              flex: 1,
            }}
          >
            {wallets.map((walletType, i) => {
              return (
                <>
                  <Button
                    variant="contained"
                    onClick={() => {
                      tryActivation(getConnection(walletType).connector)
                    }}
                    key={walletType}
                    sx={{
                      marginBottom: wallets.length - 1 === i ? 0 : 2,
                      minWidth: '250px',
                      borderRadius:"100px"
                    }}
                  >
                    Connect {getConnectionName(walletType)}
                  </Button>
                </>
              )
            })}
          </Box>
        </ModalBody>
      </>
    </Modal>
  )
}

export default ConnectWalletModal
