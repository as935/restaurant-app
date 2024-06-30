// src/components/PrivateRoute.js

import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');

  return (
    <Route
      {...rest}
      element={accessToken ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
