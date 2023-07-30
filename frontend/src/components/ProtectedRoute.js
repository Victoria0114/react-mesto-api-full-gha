import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  return props.loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};
export default ProtectedRoute;

// тренажер:
// import React from 'react';
// import { Navigate } from "react-router-dom";

// const ProtectedRouteElement = ({ element: Component, ...props  }) => {
//   return (
//     props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
// )}

// export default ProtectedRouteElement;