import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({ children }: Props) => {
  const { authenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return authenticated ? <Navigate to="/blogs" replace /> : <>{children}</>;
};

export default PublicRoute;
