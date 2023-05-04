import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WithAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
      }
    }, [navigate]);

    return <Component {...props} />;
  };

  // Make sure to return a valid React component
  return function WithAuth(props) {
    return <AuthenticatedComponent {...props} />;
  };
};

export default WithAuth;
