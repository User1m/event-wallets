import React from 'react';
import { Navigate } from 'react-router-dom';

interface IChildren {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: IChildren) => {
  const auth = localStorage.getItem('token');
  return auth ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
