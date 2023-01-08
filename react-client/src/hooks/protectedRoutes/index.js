import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth";

export const ProtectRoutes = (props) => {
  const auth = useAuth();
  console.log(auth);
  const { cookies } = useAuth();
  return cookies.token ? <Outlet /> : <Navigate to="/login" exact />;
};
