import React from "react";
import { Navigate } from "react-router-dom";
import { CustomerProvider, useCustomer } from "./CustomerContext";
import { Loader2, AlertCircle, RefreshCw, LogOut } from "lucide-react";

function GuardContent({ children }) {
  const {
    token,
    customerProfile,
    isLoadingProfile,
    profileError,
    refreshProfile,
    logoutCustomer,
  } = useCustomer();

  // 1. If currently loading initial profile and we have a token
  if (isLoadingProfile && !customerProfile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-[#0B2545] shadow-xs animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin text-[#C9A227]" />
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#0B2545]">
            Accessing TrustEdge Member Portal...
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Verifying your customer session and retrieving active coverage
          </p>
        </div>
      </div>
    );
  }

  // 2. If no token or no verified profile and not loading -> Redirect to unified /login page
  if (!token || (!customerProfile && !isLoadingProfile && !profileError)) {
    return <Navigate to="/login" replace />;
  }

  // 3. If there is a profile error (e.g. 403 or network failure) and no cached profile
  if (profileError && !customerProfile) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0B2545]">
              Unable to Access Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {profileError}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={refreshProfile}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B2545] hover:bg-[#0E2F52] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <button
              type="button"
              onClick={() => {
                logoutCustomer();
                window.location.href = "/login";
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-500" />
              <span>Sign In Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Authenticated with verified profile
  return children;
}

export default function CustomerAuthGuard({ children }) {
  return (
    <CustomerProvider>
      <GuardContent>{children}</GuardContent>
    </CustomerProvider>
  );
}
