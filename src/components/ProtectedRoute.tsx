import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [navigate, location]);

  return isAuthenticated() ? <>{children}</> : null;
};

export default ProtectedRoute;