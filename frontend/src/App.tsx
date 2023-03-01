import React from 'react';
import './static/css/styles.css';
// import { Routes, Route } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import FormDataProvider from './app/context/contextData';
// import LoginForm from './app/common/Login/loginForm';
// import ProtectedRoute from './utils/protectedRoute';
// import LandingPage from './landingPage';
import LandingPage from './app/Pages/Landing/index';
import WalletPage from './app/Pages/Wallet/index';
import ConfirmEmail from '@app/Pages/ConfirmEmail';

function App () {
  let Page;

  switch (window.location.pathname) {
    case '/':
      Page = <LandingPage></LandingPage>;
      break;

    case '/wallet':
      Page = <WalletPage></WalletPage>;
      break;

    case '/emailConf':
      Page = <ConfirmEmail></ConfirmEmail>;

      break;
  }

  return (

  <div className="topLevel">
      {Page}
      {/* <LandingPage></LandingPage> */}
      {/* <WalletPage></WalletPage> */}

  </div>

  );
}

export default App;
