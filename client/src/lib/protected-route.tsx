import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";


type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { authenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return authenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
