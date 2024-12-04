import React from 'react';

const ProtectedComponent = ({ allowedRoles = [], userRoles = [], children }) => {
  const canRender = allowedRoles.some((role) => userRoles.includes(role));
  return canRender ? <>{children}</> : null;
};

export default ProtectedComponent;
