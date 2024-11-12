import { useState, useEffect, createContext } from "react";
import { Auth, Users } from "../api";

const authController = new Auth();
const userController = new Users();

export const AuthContext = createContext();

export function AuthProvider(props) {
  const { children } = props;

  const [laoding, setLaoding] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [isAutenticado, setIsAutenticado] = useState(false);

  const login = async (accessToken) => {
    try {
      const response = await userController.getMe(accessToken);
      // console.log(response);

      // delete response.password;

      setUsuario(response.results[0]);
      setToken(response.results[0].token_speaker);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    setIsAutenticado(false);
    authController.removeToken();
  };

  useEffect(() => {
    (async () => {
      const accessToken = authController.getAcessToken();
      if (!accessToken) {
        logout();
        setLaoding(false);
        setIsAutenticado(false);
        return;
      } else {
        await login(accessToken);
        setIsAutenticado(true);
      }
      setLaoding(false);
    })();
  }, []);

  const data = {
    accessToken: token,
    isAutenticado,
    usuario,
    login,
    logout,
  };

  // console.log(token);

  if (laoding) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
