// import "./consoleFilter";
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './redux/configureStore'
import { config } from './components/wagmi/config'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './components/Router'
import NetworkCheck from './components/pages/NetworkCheck'
const root = ReactDOM.createRoot(document.getElementById('root'))
const queryClient = new QueryClient()

root.render(

  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        {/* <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}> */}
            {/* <Routes>
              <Route path="/*" element={<App />} />
            </Routes> */}


            <App />

{/*            
          </QueryClientProvider>
        </WagmiProvider> */}
      </BrowserRouter>
    </AuthProvider>
  </Provider>

)
