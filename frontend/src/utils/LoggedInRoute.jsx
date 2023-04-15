import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { MainPath } from './Path';

// This will prevent the logged in users from having to login again when passing login/register page url
const LoggedInRoute = () => {
  if (localStorage.getItem('token')) {
    return <Navigate to={MainPath.DASHBOARD} replace />;
  }
  return <Outlet />;
};

export default LoggedInRoute;
