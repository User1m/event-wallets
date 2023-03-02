import React from 'react'
import './static/css/styles.css'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import LandingPage from './app/Pages/Landing/index'
import WalletPage from './app/Pages/Wallet/index'
import ConfirmPage from '@app/Pages/Confirm'

function App () {
  return (
    <div className="topLevel">
      <ToastContainer limit={1} style={{ fontSize: '16px' }} />
      <Routes>
        <Route path="/:orgId" element={<LandingPage />} />
        <Route path="/:orgId/u/:uId/confirm" element={<ConfirmPage />} />
        <Route path="/:orgId/u/:uId/wallet" element={<WalletPage />} />
        <Route path="/:orgId/u/:uId/transfer" element={<ConfirmPage />} />
        <Route path="/:orgId/emailConf/*" element={<ConfirmPage />} />
      </Routes>
    </div>
  )
}

export default App
