import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials, setUser, clearCredentials } from "../../store/slices/authSlice";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const CustomerContext = createContext(null);

let inMemoryProfile = null;
let inMemoryPolicies = [];

// ── Normalization Helpers ──────────────────────────────────────────────
export const normalizeProfile = (raw) => {
  if (!raw) return null;
  return {
    customer_id: raw.customer_id || raw.customerId || raw.id || "—",
    customerId: raw.customer_id || raw.customerId || raw.id || "—",
    name: raw.name || raw.fullName || raw.username || "Customer",
    fullName: raw.name || raw.fullName || raw.username || "Customer",
    email: raw.email || raw.emailAddress || "—",
    phone: raw.phone || raw.mobile_number || raw.mobileNumber || "—",
    date_of_birth: raw.date_of_birth || raw.dob || "—",
    gender: raw.gender || "—",
    address: raw.address || "—",
    city: raw.city || "—",
    state: raw.state || "—",
    pincode: raw.pincode || raw.pinCode || "—",
    pan_no: raw.pan_no || raw.panNumber || "",
    aadhar_no: raw.aadhar_no || raw.aadhaarNumber || "",
    created_at: raw.created_at || raw.createdAt || "",
    documents: Array.isArray(raw.documents) ? raw.documents : [],
    status: raw.status || "Verified",
    kyc_status: raw.kyc_status || "VERIFIED",
  };
};

export const calculatePolicyTenure = (issueDate, expiryDate) => {
  if (!issueDate || !expiryDate || issueDate === "—" || expiryDate === "—") return null;
  const start = new Date(issueDate);
  const end = new Date(expiryDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) return null;

  // Align standard inclusive insurance end-date (+1 day to end)
  const adjustedEnd = new Date(end.getTime());
  adjustedEnd.setDate(adjustedEnd.getDate() + 1);

  let years = adjustedEnd.getFullYear() - start.getFullYear();
  let months = adjustedEnd.getMonth() - start.getMonth();
  let days = adjustedEnd.getDate() - start.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonthDays = new Date(adjustedEnd.getFullYear(), adjustedEnd.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // If days close to a full month boundary
  if (days >= 28) {
    months += 1;
    days = 0;
    if (months >= 12) {
      years += 1;
      months -= 12;
    }
  } else if (days <= 2 && (years > 0 || months > 0)) {
    // Negligible 1-2 day boundary variance
    days = 0;
  }

  const parts = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? "Year" : "Years"}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? "Month" : "Months"}`);
  if (days > 0) parts.push(`${days} ${days === 1 ? "Day" : "Days"}`);

  return parts.length > 0 ? parts.join(" ") : "1 Year";
};

export const normalizePolicy = (p) => {
  if (!p) return null;
  const policyId = p.policy_id || p.policyId || p.id || "—";
  const rawPrice =
    parseFloat(String(p.premium_amount || p.price || 0).replace(/,/g, "")) || 0;
  const formattedPremium = `₹${rawPrice.toLocaleString("en-IN")}`;
  const pdfUrl = p.policy_pdf_url || p.policyPdfUrl || null;
  const desc = p.policy_description || {};
  const pay = p.payment_details || {};

  const issueDate = p.issue_date || p.issueDate || "—";
  const expiryDate = p.expiry_date || p.expiryDate || "—";
  const calculatedTenure = calculatePolicyTenure(issueDate, expiryDate);

  // Dynamic tenure priority: calculated from dates > backend tenure if non-generic > default
  const dynamicTenure =
    calculatedTenure ||
    p.policy_tenure ||
    p.tenure ||
    (desc.policy_tenure && desc.policy_tenure !== "1 Year" ? desc.policy_tenure : null) ||
    (desc.policy_term && desc.policy_term !== "1 Year" ? desc.policy_term : null) ||
    desc.policy_tenure ||
    desc.policy_term ||
    "1 Year";

  return {
    id: p.id || policyId,
    policy_id: policyId,
    policyId: policyId,
    policy_name: p.policy_name || p.policyName || "Insurance Policy",
    policyName: p.policy_name || p.policyName || "Insurance Policy",
    category: p.category || "General Insurance",
    sub_type: p.sub_type || p.subType || "Standard",
    subType: p.sub_type || p.subType || "Standard",
    status: p.status || "Active",
    issue_date: issueDate,
    issueDate: issueDate,
    expiry_date: expiryDate,
    expiryDate: expiryDate,
    policy_tenure: dynamicTenure,
    policyTenure: dynamicTenure,
    tenure: dynamicTenure,
    price: rawPrice ? String(rawPrice) : "0",
    premium_amount: rawPrice,
    formattedPremium,
    policy_pdf_url: pdfUrl,
    policy_description: {
      ...desc,
      policy_tenure: dynamicTenure,
      policy_term: dynamicTenure,
    },
    payment_details: pay,
    customer_name: p.customer_name || p.customerName || p.policyHolderName || "",
    customer_id: p.customer_id || p.customerId || "",
    isRenewalUpcoming:
      p.status === "Renewal Due" ||
      Boolean(p.isRenewalUpcoming) ||
      Boolean(p.is_renewal_upcoming),
  };
};

export function CustomerProvider({ children }) {
  const dispatch = useDispatch();

  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [customerProfile, setCustomerProfile] = useState(() => inMemoryProfile);
  const [customerPolicies, setCustomerPolicies] = useState(() => inMemoryPolicies);
  const [isLoadingProfile, setIsLoadingProfile] = useState(() =>
    Boolean(!inMemoryProfile && localStorage.getItem("access_token"))
  );
  const [isLoadingPolicies, setIsLoadingPolicies] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [policiesError, setPoliciesError] = useState(null);

  // ── Logout ─────────────────────────────────────────────────────────────
  const logoutCustomer = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    inMemoryProfile = null;
    inMemoryPolicies = [];
    setToken(null);
    setCustomerProfile(null);
    setCustomerPolicies([]);
    setProfileError(null);
    setPoliciesError(null);
    dispatch(clearCredentials());
  }, [dispatch]);

  // ── Fetch Policies (POST /api/policies/view_policy_by_customer/) ───────
  const fetchCustomerPolicies = useCallback(
    async (customerId, activeToken) => {
      const authToken = activeToken || token || localStorage.getItem("access_token");
      if (!customerId || !authToken) return;

      setIsLoadingPolicies(true);
      setPoliciesError(null);

      try {
        const response = await axios.post(
          `${BASE_URL}/api/policies/view_policy_by_customer/`,
          { customer_id: String(customerId) },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        const rawList = Array.isArray(response.data)
          ? response.data
          : response.data?.results || [];

        const normalized = rawList.map(normalizePolicy).filter(Boolean);
        inMemoryPolicies = normalized;
        setCustomerPolicies(normalized);
      } catch (err) {
        console.error("Failed to fetch customer policies:", err);
        setPoliciesError(
          err?.response?.data?.detail ||
            err?.response?.data?.message ||
            "Unable to load policies at this time."
        );
      } finally {
        setIsLoadingPolicies(false);
      }
    },
    [token]
  );

  // ── Fetch Profile (GET /api/customers/me/) ─────────────────────────────
  const fetchCustomerProfile = useCallback(
    async (activeToken, force = false) => {
      const authToken = activeToken || token || localStorage.getItem("access_token");
      if (!authToken) {
        setIsLoadingProfile(false);
        return;
      }

      if (inMemoryProfile && !force) {
        setCustomerProfile(inMemoryProfile);
        setIsLoadingProfile(false);
        if (!inMemoryPolicies.length && inMemoryProfile.customer_id) {
          fetchCustomerPolicies(inMemoryProfile.customer_id, authToken);
        }
        return;
      }

      setIsLoadingProfile(true);
      setProfileError(null);

      try {
        const response = await axios.get(`${BASE_URL}/api/customers/me/`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "ngrok-skip-browser-warning": "true",
          },
        });

        const normalized = normalizeProfile(response.data);
        inMemoryProfile = normalized;
        setCustomerProfile(normalized);

        dispatch(setUser(normalized));

        if (normalized?.customer_id && normalized.customer_id !== "—") {
          fetchCustomerPolicies(normalized.customer_id, authToken);
        }
      } catch (err) {
        console.error("Failed to load customer profile:", err);
        if (err?.response?.status === 401) {
          logoutCustomer();
        } else if (err?.response?.status === 403) {
          setProfileError("Access Denied: Your account is not authorized as a customer.");
        } else {
          setProfileError(
            err?.response?.data?.detail ||
              err?.response?.data?.message ||
              "Failed to load verified customer profile."
          );
        }
      } finally {
        setIsLoadingProfile(false);
      }
    },
    [token, dispatch, logoutCustomer, fetchCustomerPolicies]
  );

  useEffect(() => {
    if (token) {
      fetchCustomerProfile(token);
    } else {
      setCustomerProfile(null);
      setCustomerPolicies([]);
      setIsLoadingProfile(false);
    }
  }, [token, fetchCustomerProfile]);

  const loginCustomer = async (email, password) => {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login/`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    const data = response.data;
    const accessToken = data?.tokens?.access || data?.access;
    const refreshToken = data?.tokens?.refresh || data?.refresh;

    if (!accessToken) {
      throw new Error("No access token returned from login.");
    }

    localStorage.setItem("access_token", accessToken);
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }
    setToken(accessToken);

    dispatch(
      setCredentials({
        user: data.user || { email, role: "USER" },
        tokens: { access: accessToken, refresh: refreshToken },
      })
    );

    await fetchCustomerProfile(accessToken, true);
    return data;
  };

  const refreshProfile = () => fetchCustomerProfile(token, true);
  const refreshPolicies = () => {
    if (customerProfile?.customer_id) {
      fetchCustomerPolicies(customerProfile.customer_id, token);
    }
  };

  const value = {
    token,
    isAuthenticated: Boolean(token && customerProfile),
    customerProfile,
    customerPolicies,
    isLoadingProfile,
    isLoadingPolicies,
    profileError,
    policiesError,
    loginCustomer,
    logoutCustomer,
    refreshProfile,
    refreshPolicies,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
}
