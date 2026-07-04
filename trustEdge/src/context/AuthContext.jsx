import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../lib/constant/ApiEndpoints";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── Context Banao ────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ─── App Start Pe Check Karo ─────────────────────────────

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios
        .get(`${BASE_URL}${API_ENDPOINTS.AUTH.ME}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => {
          // Token expire ho gaya — clear karo
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // ─── Login ───────────────────────────────────────────────

  const login = (userData) => {
    setUser(userData);
  };

  // ─── Register ────────────────────────────────────────────

  const register = (userData) => {
    setUser(userData);
  };

  // ─── Logout ──────────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  // ─── Helpers ─────────────────────────────────────────────
  const isAdmin = user?.role === "ADMIN";
  const isUser = user?.role === "USER";
  const isLoggedIn = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isUser,
        isLoggedIn,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

// ─── Custom Hook ─────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
