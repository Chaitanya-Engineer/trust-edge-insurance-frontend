import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_ENDPOINTS } from "../lib/constant/ApiEndpoints";
import {
  setCredentials,
  setUser,
  clearCredentials,
  selectUser,
  selectIsLoggedIn,
  selectIsAdmin,
} from "../store/slices/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const dispatch = useDispatch();

  // Redux se state lo — useState nahi chahiye ab
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  // ─── App Start Pe Token Check ──────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .get(`${BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        })
        .then((res) => {
          // Redux mein user set karo
          dispatch(setUser(res?.data));
        })
        .catch(() => {
          dispatch(clearCredentials());
        });
    }
  }, [dispatch]);

  // ─── Login ─────────────────────────────────────────────
  // LoginPage se { user, tokens } aayega
  const login = (data) => {
    dispatch(setCredentials(data));
  };

  // ─── Logout ────────────────────────────────────────────
  const logout = () => {
    dispatch(clearCredentials());
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isAdmin,
        isUser: user?.role === "USER",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be inside AuthProvider");
  return context;
}
