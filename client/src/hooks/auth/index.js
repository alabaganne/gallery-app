import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import api from "../../components/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();

  const login = async ({ email, password }) => {
    const res = await api.post("/auth", {
      email: email,
      password: password,
    });
    setCookies("token", res.data.token); // your token
    setCookies("name", res.data.name); // optional data
    navigate("/");
  };

  const register = async ({ username, email, password }) => {
    console.log("from auth: ", username, email, password);
    const res = await api.post("/auth", {
      username,
      email: email,
      password: password,
    });
    setCookies("token", res.data.token); // your token
    setCookies("name", res.data.name); // optional data
    navigate("/");
  };

  const logout = () => {
    ["token", "name"].forEach((obj) => removeCookie(obj)); // remove data save in cookies
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      cookies,
      register,
      login,
      logout,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
