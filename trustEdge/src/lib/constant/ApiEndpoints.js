export const API_ENDPOINTS = {
  // ── Auth ──────────────────────────────────────────────────
  AUTH: {
    REGISTER: "/api/auth/register/",
    LOGIN: "/api/auth/login/",
    ME: "/api/auth/me/",
  },
  ADMIN: {
    ADMIN_DASHBOARD:"api/dashboard/",
    USER_REGISTRATION: "/api/customers/register/",
    USERS_LIST: "/api/customers/",
    USERS_LIST_DROPDOWN: "/api/customers/dropdown/",
    UPDATE_OR_VIEW_CUSTOMER_BY_ID: "/api/customers/detail/",
    CUSTOMER_DROPDOWN: "/api/customers/dropdown/",
    CREATE_POLICY: "/api/policies/create_and_add_policy/",
    POLICIES_LIST: "/api/policies/",
    SHOW_POLICY_BY_CUSTOMER_ID : "/api/policies/view_policy_by_customer/",
    VIEW_AND_UPDATE_POLICY : "/api/policies/detail/",
    EXPIRED_POLICIES: "/api/dashboard/policy-alerts/",
    SHOW_PENDING_POLICY_USER: "/api/dashboard/pending-policies/"
  },
};
