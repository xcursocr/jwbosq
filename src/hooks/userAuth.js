import { useContext } from "react";
import { AuthContext } from "../contex";

export const useAuth = () => useContext(AuthContext);