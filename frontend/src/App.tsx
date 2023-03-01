import React from 'react'
import './static/css/styles.css'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './app/Pages/Landing/index'
import WalletPage from './app/Pages/Wallet/index'
import ConfirmEmail from '@app/Pages/ConfirmEmail'

function App () {
  return (
    <div className="topLevel">
      <Routes>
        <Route path="/:orgId" element={<LandingPage />} />
        <Route path="/:orgId/u/:uId/confirm" element={<ConfirmEmail />} />
        <Route path="/:orgId/u/:uId/wallet" element={<WalletPage />} />
        <Route path="/:orgId/emailConf" element={<ConfirmEmail />} />
      </Routes>
    </div>
  )
}

export default App
