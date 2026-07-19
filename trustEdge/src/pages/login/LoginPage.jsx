import { useAPI } from "../../lib/hooks/useAPI";
import { API_ENDPOINTS } from "../../lib/constant/ApiEndpoints";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ─── API CALL ──────────────────────────────────────────
  const {
    isLoading,
    error,
    callApi: loginUser,
  } = useAPI(API_ENDPOINTS.AUTH.LOGIN, {
    method: "POST",

    onSuccess: (data) => {
      login(data);

      if (data?.user?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    },

    onFailure: (err) => {
      console.error(err?.response?.data);
    },
  });

  const handleLogin = () => {
    if (!formData?.email || !formData?.password) return;
    loginUser(formData);
  };

  return (
    <div className="min-h-screen w-full bg-slate-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="rahul@example.com"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              {error.response?.data?.non_field_errors?.[0] || "Login failed"}
            </p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400
                   text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
