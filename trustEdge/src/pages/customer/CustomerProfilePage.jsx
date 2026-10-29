import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Eye,
  EyeOff,
  Headphones,
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useCustomer } from "./CustomerContext";
import CustomerAuthGuard from "./CustomerAuthGuard";

function ProfileContent() {
  const { customerProfile, isLoadingProfile, profileError, refreshProfile } =
    useCustomer();

  const [showPan, setShowPan] = useState(false);
  const [showAadhaar, setShowAadhaar] = useState(false);

  // Masking helpers with safe empty handling
  const maskPan = (pan) => {
    if (!pan || String(pan).trim() === "") return "Not provided";
    return showPan ? pan : `••••••${String(pan).slice(-4)}`;
  };

  const maskAadhaar = (aadhaar) => {
    if (!aadhaar || String(aadhaar).trim() === "") return "Not provided";
    return showAadhaar ? aadhaar : `•••• •••• ${String(aadhaar).slice(-4)}`;
  };

  const getInitials = (name) => {
    if (!name) return "TE";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const customerName = customerProfile?.name || "Valued Customer";
  const customerId = customerProfile?.customer_id || customerProfile?.customerId || "—";
  const memberSince = customerProfile?.created_at
    ? new Date(customerProfile.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Verified Member";

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn max-w-5xl mx-auto">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B2545] tracking-tight">
            Customer Profile
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your verified personal details and communication address registered with TrustEdge.
          </p>
        </div>
        <button
          type="button"
          onClick={refreshProfile}
          disabled={isLoadingProfile}
          className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold shadow-2xs transition-colors"
          title="Refresh verified profile"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingProfile ? "animate-spin text-[#C9A227]" : ""}`} />
          <span>Sync Profile</span>
        </button>
      </div>

      {profileError && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-3 text-amber-800 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{profileError}</span>
          </div>
          <button
            type="button"
            onClick={refreshProfile}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg text-xs"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── Profile Top Identity Card ─────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-5">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#0B2545] to-[#123E68] text-white flex items-center justify-center font-bold text-base sm:text-lg shadow-xs shrink-0 ring-4 ring-slate-100">
            {getInitials(customerName)}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-2xl font-bold text-[#0B2545]">
                {customerName}
              </h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                KYC Verified
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Customer ID:{" "}
              <span className="font-mono font-bold text-slate-800">
                {customerId}
              </span>{" "}
              • Registered: {memberSince}
            </p>
          </div>
        </div>
      </div>

      {/* ── Section 1: Personal Information ───────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-100 text-[#0B2545]">
              <User className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#0B2545]">
              Personal Information
            </h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
          {/* Full Name */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              Full Name
            </span>
            <span className="font-bold text-slate-800 mt-1 block">
              {customerProfile?.name || "—"}
            </span>
          </div>

          {/* Date of Birth */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              Date of Birth
            </span>
            <span className="font-semibold text-slate-800 mt-1 block">
              {customerProfile?.date_of_birth || "—"}
            </span>
          </div>

          {/* Gender */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              Gender
            </span>
            <span className="font-semibold text-slate-800 mt-1 block capitalize">
              {customerProfile?.gender || "—"}
            </span>
          </div>

          {/* Mobile Number */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              Mobile Number
            </span>
            <span className="font-semibold text-slate-800 mt-1 block font-mono">
              {customerProfile?.phone || "—"}
            </span>
          </div>

          {/* Email Address */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              Email Address
            </span>
            <span className="font-semibold text-slate-800 mt-1 block font-mono text-xs sm:text-sm truncate">
              {customerProfile?.email || "—"}
            </span>
          </div>

          {/* PAN Card Number */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                PAN Card Number
              </span>
              {customerProfile?.pan_no && (
                <button
                  type="button"
                  onClick={() => setShowPan(!showPan)}
                  className="text-slate-500 hover:text-[#0B2545] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {showPan ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>{showPan ? "Hide" : "Reveal"}</span>
                </button>
              )}
            </div>
            <span className="font-mono font-bold text-slate-800 mt-1 block">
              {maskPan(customerProfile?.pan_no)}
            </span>
          </div>

          {/* Aadhaar Number */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">
                Aadhaar Number
              </span>
              {customerProfile?.aadhar_no && (
                <button
                  type="button"
                  onClick={() => setShowAadhaar(!showAadhaar)}
                  className="text-slate-500 hover:text-[#0B2545] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {showAadhaar ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                  )}
                  <span>{showAadhaar ? "Hide" : "Reveal"}</span>
                </button>
              )}
            </div>
            <span className="font-mono font-bold text-slate-800 mt-1 block">
              {maskAadhaar(customerProfile?.aadhar_no)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Section 2: Address Information ────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-100 text-[#2F6F3E]">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#0B2545]">
              Address Information
            </h3>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
            Residential
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-sm">
          {/* Address */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100 sm:col-span-2">
            <span className="text-xs text-slate-500 block font-medium">
              Residential Address
            </span>
            <span className="font-semibold text-slate-800 mt-1 block">
              {customerProfile?.address || "—"}
            </span>
          </div>

          {/* City */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              City
            </span>
            <span className="font-semibold text-slate-800 mt-1 block">
              {customerProfile?.city || "—"}
            </span>
          </div>

          {/* State */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              State
            </span>
            <span className="font-semibold text-slate-800 mt-1 block">
              {customerProfile?.state || "—"}
            </span>
          </div>

          {/* Pincode */}
          <div className="bg-slate-50/70 p-3 sm:p-3.5 rounded-xl border border-slate-100">
            <span className="text-xs text-slate-500 block font-medium">
              Pincode
            </span>
            <span className="font-mono font-bold text-[#0B2545] mt-1 block">
              {customerProfile?.pincode || "—"}
            </span>
          </div>
        </div>
      </div>

      {/* ── Section 3: Secondary Support Entry Point ──────────────── */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#0B2545] text-white shrink-0 mt-0.5">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B2545]">
              Need to update your contact or address details?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-xl leading-relaxed">
              Profile details are kept read-only to safeguard your verified KYC records. To request an update, please connect with our advisory desk.
            </p>
          </div>
        </div>

        <Link
          to="/customer/support"
          className="inline-flex items-center justify-center gap-2 h-10 px-5 rounded-xl bg-[#0B2545] hover:bg-[#0E2F52] text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs w-full sm:w-auto self-start md:self-center shrink-0"
        >
          <span>Contact Support Desk</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export default function CustomerProfilePage() {
  return (
    <CustomerAuthGuard>
      <ProfileContent />
    </CustomerAuthGuard>
  );
}
