import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canActive, children, redirectPath = '/' }) => {
  if (!canActive) return <Navigate to={redirectPath} />
  return <Outlet />
}

export default ProtectedRoute;
