import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import toast from 'react-hot-toast';

const PrivateRoute = () => {
  const [isNotified, setIsNotified] = useState(false);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    if (!accessToken && !isNotified) {
      toast.error('Debes iniciar sesión para acceder a esta página.');
      setIsNotified(true);
    }
  }, [accessToken, isNotified]);

  if (!accessToken)  return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;