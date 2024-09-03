import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/store";

const ProtectedPage = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};
export { ProtectedPage };