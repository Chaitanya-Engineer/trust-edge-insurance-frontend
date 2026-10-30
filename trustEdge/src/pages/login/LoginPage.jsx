import { useAPI } from "../../lib/hooks/useAPI";
import { API_ENDPOINTS } from "../../lib/constant/ApiEndpoints";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import teLoginImg from "../../assets/trust edge logo.jpeg";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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
        navigate("/customer");
      }
    },

    onFailure: (err) => {
      console.error(err?.response?.data);
    },
  });

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (!formData?.username || !formData?.password || isLoading) return;

    // Pass username under the email payload key for backend compatibility
    loginUser({
      email: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 font-sans">
      {/* ══════════════════════════════════════
          LEFT SIDE: FULL LOGO BANNER (DESKTOP)
      ══════════════════════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 bg-white flex-col justify-between p-16 border-r border-slate-200/60 relative">
        {/* Soft background gold glow - extremely quiet */}
        <div className="pointer-events-none absolute right-0 top-0 h-[320px] w-[320px] rounded-full bg-gold/3 blur-[80px]" />

        {/* Back to Home Link */}
        <div className="relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-navy transition-colors duration-300 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Home
          </Link>
        </div>

        {/* Central Logo Banner */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center w-full">
          <img
            src={teLoginImg}
            alt="TrustEdge Insurance Logo Banner"
            className="max-w-[420px] w-full h-auto object-contain select-none animate-fadeInUp"
          />
        </div>

        {/* Motto / Footer */}
        <div className="relative z-10 pt-6 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span>TrustEdge Insurance LLP</span>
          <span>Protecting Today. Securing Tomorrow.</span>
        </div>
      </div>

      {/* ══════════════════════════════════════
          RIGHT SIDE: CLEAN LIGHT LOGIN CARD
      ══════════════════════════════════════ */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-slate-50 relative">
        {/* Mobile-only Back to Home Link */}
        <div className="lg:hidden absolute top-6 left-6 z-20">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-navy transition-colors duration-300 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            Home
          </Link>
        </div>

        {/* Minimal White Login Card */}
        <div className="relative z-10 w-full max-w-[380px] bg-white border border-slate-200/80 p-8 sm:p-10 rounded-[24px] shadow-[0_10px_35px_rgba(0,0,0,0.03)] animate-fadeInUp">
          {/* Mobile-only Logo container (centered full logo) */}
          <div className="lg:hidden flex flex-col items-center mb-8 text-center bg-white p-4 rounded-2xl border border-slate-100">
            <img
              src={teLoginImg}
              alt="TrustEdge Logo"
              className="h-28 w-auto object-contain select-none"
            />
            <p className="text-[10px] font-bold text-navy uppercase tracking-wider mt-3">
              Portal Sign In
            </p>
          </div>

          {/* Desktop-only Header */}
          <div className="hidden lg:flex flex-col items-start mb-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 border border-slate-200/60 text-navy mb-3.5">
              <ShieldCheck className="w-5 h-5 text-navy" />
            </div>
            <h2 className="text-xl font-extrabold text-navy tracking-tight">
              Sign In to Your Account
            </h2>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              Access your advisor or customer insurance portal.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider px-1">
                Username / Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  required
                  name="username"
                  type="text"
                  placeholder="Enter username or email"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 text-navy rounded-2xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold placeholder-slate-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider px-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 text-navy rounded-2xl text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold placeholder-slate-400 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-gold transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-2xl animate-fadeInUp">
                <p className="text-xs text-red-600 font-medium text-center">
                  {error.response?.data?.non_field_errors?.[0] ||
                    "Invalid credentials. Please try again."}
                </p>
              </div>
            )}

            {/* Submit Button - Solid Gold with Navy text */}
            <button
              type="submit"
              disabled={isLoading || !formData.username || !formData.password}
              className="w-full bg-gold hover:bg-gold-light disabled:bg-gold/40 disabled:text-navy/60 text-navy font-bold py-3.5 rounded-2xl text-sm transition-all duration-300 shadow-md shadow-gold/5 hover:shadow-gold/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
