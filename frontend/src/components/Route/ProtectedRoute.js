// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, redirect, Route } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//     const { loading, isAuthenticated, user } = useSelector((state) => state.user);

//     if (loading) {
//       return null; // Optional: Handle loading state
//     }
  
//     return (
//       <Route
//         // {...rest}
//         element={
//         //   isAuthenticated ? (
//             <Component />
//         //   ) : (
//         //     <Navigate to="/login" replace />
//         //   )
//         }
//       />
//     );
// };

// export default ProtectedRoute;