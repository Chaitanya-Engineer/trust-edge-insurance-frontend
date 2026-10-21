export const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
  ],
  Insurance: [
    { label: "All Insurance", href: "/insurance" },
    { label: "Health Insurance", href: "/insurance/health" },
    { label: "Motor Insurance", href: "/insurance/motor" },
    { label: "Property Insurance", href: "/insurance/property" },
    { label: "Marine Insurance", href: "/insurance/marine" },
    { label: "Workmen Compensation", href: "/insurance/workmen-compensation" },
    { label: "Personal Insurance", href: "/insurance/personal" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Claim Process", href: "/claims" },
    { label: "WhatsApp Us", href: "https://wa.me/919773548537" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

import { lazy } from "react";
import { ROLES } from "./roles";

// ─── Lazy Imports ─────────────────────────────────────────────

// Public Pages
const HomePage = lazy(() => import("../../pages/public/HomePage"));
const InsuranceDirectoryPage = lazy(() =>
  import("../../pages/public/insurance/InsuranceDirectoryPage")
);
const InsuranceCategoryPage = lazy(() =>
  import("../../pages/public/insurance/InsuranceCategoryPage")
);
const AboutPage = lazy(() => import("../../pages/public/AboutPage"));
const ContactPage = lazy(() => import("../../pages/public/ContactPage"));
const LoginPage = lazy(() => import("../../pages/login/LoginPage"));
const PrivacyPage = lazy(() => import("../../pages/public/PrivacyPage"));
const TermsPage = lazy(() => import("../../pages/public/TermsPage"));
const DisclaimerPage = lazy(() => import("../../pages/public/DisclaimerPage"));
const HelpCenterPage = lazy(() => import("../../pages/public/HelpCenterPage"));
const ClaimProcessPage = lazy(() =>
  import("../../pages/public/ClaimProcessPage")
);

// // Admin Pages
const AdminDashboardPage = lazy(() =>
  import("../../pages/admin/DashboardPage")
);
const AdminUsersDashboardPage = lazy(() =>
  import("../../pages/admin/UserDashboardPage/UserDashboardPage")
);
const AdminPoliciesPage = lazy(() =>
  import("../../pages/admin/PolicyDashboardPage/PolicyDashboardPage")
);
const ExpiredNotificationReport = lazy(() =>
  import("../../pages/admin/ExpiryNotificationReport/ExpiryNotificationReport")
);

export const routes = [
  // ── Public Routes ─────────────────────────────────────────
  {
    name: "Home",
    path: "/",
    component: HomePage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Insurance",
    path: "/insurance",
    component: InsuranceDirectoryPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Insurance Category",
    path: "/insurance/:categoryId",
    component: InsuranceCategoryPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "About",
    path: "/about",
    component: AboutPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Contact",
    path: "/contact",
    component: ContactPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Privacy Policy",
    path: "/privacy",
    component: PrivacyPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Terms",
    path: "/terms",
    component: TermsPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Disclaimer",
    path: "/disclaimer",
    component: DisclaimerPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Help Center",
    path: "/help",
    component: HelpCenterPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },
  {
    name: "Claim Process",
    path: "/claims",
    component: ClaimProcessPage,
    userRoles: [ROLES.ALL],
    layout: "public",
  },

  // ── Auth Routes ────────────────────────────────────────────
  {
    name: "Login",
    path: "/login",
    component: LoginPage,
    userRoles: [ROLES.ALL],
    layout: "auth",
  },

  // // ── Admin Routes ───────────────────────────────────────────
  {
    name: "Admin Dashboard",
    path: "/admin",
    component: AdminDashboardPage,
    userRoles: [ROLES.ADMIN],
    layout: "admin",
  },
  {
    name: " Users Dashboard",
    path: "/admin/user-dashboard",
    component: AdminUsersDashboardPage,
    userRoles: [ROLES.ADMIN],
    layout: "admin",
  },
  {
    name: "Admin Policies",
    path: "/admin/policies",
    component: AdminPoliciesPage,
    userRoles: [ROLES.ADMIN],
    layout: "admin",
  },
  {
    name: "Expiry Notification Report",
    path: "/admin/expiry-notification",
    component: ExpiredNotificationReport,
    userRoles: [ROLES.ADMIN],
    layout: "admin",
  },
];
