import { ConnectionType } from '../connection'
import { getConnection } from '../connection'
import { useMemo } from 'react'
import { useAppSelector } from '.'
// import { Provider } from 'react-redux';
// import {store} from '../redux/configureStore'
const SELECTABLE_WALLETS = [
  ConnectionType.INJECTED,
  //   ConnectionType.COINBASE_WALLET,
  ConnectionType.WALLET_CONNECT,
]

export default function useOrderedConnections() {
  const selectedWallet = useAppSelector(state => state?.wallet?.selectedWallet)
  return useMemo(() => {
    // <Provider store={store}>
    //   </Provider>
    
    const orderedConnectionTypes = []
    // Always attempt to use to Gnosis Safe first, as we can't know if we're in a SafeContext.
    // orderedConnectionTypes.push(ConnectionType.GNOSIS_SAFE)
    
    // Add the `selectedWallet` to the top so it's prioritized, then add the other selectable wallets.
    if (selectedWallet) {
      orderedConnectionTypes.push(selectedWallet)
    }
    orderedConnectionTypes.push(
      ...SELECTABLE_WALLETS.filter(wallet => wallet !== selectedWallet),
    )
    console.log(orderedConnectionTypes)
    // Add network connection last as it should be the fallback.
    // orderedConnectionTypes.push(ConnectionType.NETWORK)
    
    console.log("useAppDistpatch")
    return orderedConnectionTypes.map(getConnection)
  }, [selectedWallet])
}
