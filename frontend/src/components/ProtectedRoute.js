import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-up" replace />
  );
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
