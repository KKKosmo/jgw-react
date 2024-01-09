// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactNode;
  isAuthenticated: boolean;
  fallbackPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  isAuthenticated,
  fallbackPath,
  ...rest
}: PrivateRouteProps) => {
  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to={fallbackPath} replace />
  );
};

export default PrivateRoute;
