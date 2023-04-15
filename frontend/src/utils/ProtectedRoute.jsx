import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { MainPath } from './Path';

// This will protect the admin page from unauthenticated user passing url directly
const ProtectedRoute = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to={MainPath.LOGIN} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
