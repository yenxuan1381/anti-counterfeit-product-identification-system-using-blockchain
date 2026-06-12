import '../../css/Role.css'
import { Button } from '../Button'
import { Link,useNavigate } from 'react-router-dom'
import { Box, Button as Btn } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useState, useEffect } from 'react'
import WalletConnect from './WalletConnect'
import { useAccount } from 'wagmi';
import { config } from './WalletConnect'
const getEthereumObject = () => window.ethereum

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject()

    /*
     * First make sure we have access to the Ethereum object.
     */
    if (!ethereum) {
      console.error('Make sure you have Metamask!')
      return null
    }

    console.log('We have the Ethereum object', ethereum)
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    if (accounts.length !== 0) {
      const account = accounts[0]
      console.log('Found an authorized account:', account)
      return account
    } else {
      console.error('No authorized account found')
      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

const Retailer = () => {
  const [currentAccount, setCurrentAccount] = useState('')
  const { isConnected, address ,isConnecting} = useAccount({config});

  const [connected,setConnected] =  useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedStatus = sessionStorage.getItem('walletConnected');
    setConnected(storedStatus === 'true');
  }, []);

  useEffect(() => {
    sessionStorage.setItem('walletConnected', connected.toString());
  }, [connected]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.clear();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleProfileClick = () => {
    if (connected) {
      console.log("isConnected",isConnected);
      navigate('/profile');
    }else{
      alert("Pls connect to your wallet first")
    }
  };

  const handleUpdateProduct = () => {
    if (connected) {
      console.log("isConnected",isConnected);
      navigate('/scanner');
    }else{
      alert("Pls connect to your wallet first")
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('walletConnected');
    setConnected(false);
    setCurrentAccount('');
    navigate('/login');
  };


  useEffect(() => {
    findMetaMaskAccount().then(account => {
      if (account !== null) {
        setCurrentAccount(account)
      }
    })
  }, [])

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject()
      if (!ethereum) {
        alert('Get MetaMask!')
        return
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      console.log('Connected', accounts[0])
      setCurrentAccount(accounts[0])
      setConnected(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="role-container">
      <div className="role-container-box">
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}
        >
          <Btn onClick={handleLogout} href="/login" endIcon={<LogoutIcon />}>
            Logout
          </Btn>
        </Box>

        <h2>Welcome:</h2>
        <h1>Retailer</h1>
<div>
          <Button
            className="btns"
            buttonStyle="btn--long"
            buttonSize="btn--large"
            disabled={!connected}
            onClick={handleProfileClick}
          >
            Check Profile
          </Button>
        </div>

        <div>
          <Button
            className="btns"
            buttonStyle="btn--long"
            buttonSize="btn--large"
            disabled={!connected}
            onClick={handleUpdateProduct}
          >
            Update Product
          </Button>
        </div>

        <WalletConnect onClick={connectWallet} />
        {/* {!currentAccount && (
                    <Button className="btns" buttonStyle='btn--long' buttonSize='btn--large' onClick={connectWallet}>Connect Wallet</Button>
                )} */}
      </div>
    </div>
  )
}

export default Retailer
