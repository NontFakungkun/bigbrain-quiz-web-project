import React from 'react';
import { Outlet } from 'react-router-dom';
// import { MainPath } from "./Path";

// This will protect the admin page from unauthenticated user passing url directly
const ProtectedRoute = () => {
//   if (not logged in) {
//     return <Navigate to={MainPath.LOGIN} replace />;
//   }
  return <Outlet />;
};

export default ProtectedRoute;
