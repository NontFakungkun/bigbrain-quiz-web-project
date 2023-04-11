import React from 'react';
import { Outlet } from 'react-router-dom';
// import { MainPath } from "./Path";

// This will prevent the logged in users from having to login again when passing login/register page url
const LoggedInRoute = () => {
//   if (logged in) {
//     return <Navigate to={MainPath.DASHBOARD} replace />;
//   }
  return <Outlet />;
};

export default LoggedInRoute;
