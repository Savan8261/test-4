import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ role, children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
