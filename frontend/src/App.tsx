import React from 'react';
import './styles/styles.css';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormDataProvider from './app/context/contextData';
import LoginForm from './app/common/Login/loginForm';
import ProtectedRoute from './utils/protectedRoute';

function App () {
  return (
    <FormDataProvider>
      <div className="App">
        <ToastContainer limit={1} style={{ fontSize: '16px' }} />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          {/* <Route
            path="/cp/dashboard/"
            element={
              // <ProtectedRoute>
              <HomeLayout />
              // </ProtectedRoute>
            }
          /> */}
        </Routes>
      </div>
    </FormDataProvider>
  );
}

export default App;
