export const footerLinks = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Plans: [
    { label: "Health Insurance", href: "/plans#health" },
    { label: "Life Insurance", href: "/plans#life" },
    { label: "Vehicle Insurance", href: "/plans#vehicle" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Claim Process", href: "/claims" },
    { label: "WhatsApp Us", href: "https://wa.me/919999999999" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

import { lazy } from "react";
import { ROLES } from "./roles";

// ─── Lazy Imports ─────────────────────────────────────────────

// Public Pages
const HomePage = lazy(() => import("../../pages/public/HomePage"));
const PlansPage = lazy(() => import("../../pages/public/PlansPage"));
const AboutPage = lazy(() => import("../../pages/public/AboutPage"));
const ContactPage = lazy(() => import("../../pages/public/ContactPage"));
const LoginPage = lazy(() => import("../../pages/login/LoginPage"));
// // Auth Pages
// const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
// const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
// const ForgotPasswordPage = lazy(() =>
//   import("../pages/auth/ForgotPasswordPage")
// );

// // Admin Pages
const AdminDashboardPage = lazy(() =>
  import("../../pages/admin/DashboardPage")
);
// const AdminUsersPage = lazy(() => import("../pages/admin/UsersPage"));
// const AdminUserDetail = lazy(() => import("../pages/admin/UserDetailPage"));
// const AdminPlansPage = lazy(() => import("../pages/admin/PlansPage"));
// const AdminPlanForm = lazy(() => import("../pages/admin/PlanFormPage"));
// const AdminPoliciesPage = lazy(() => import("../pages/admin/PoliciesPage"));
// const AdminDocumentsPage = lazy(() => import("../pages/admin/DocumentsPage"));
// const AdminReportsPage = lazy(() => import("../pages/admin/ReportsPage"));
// const AdminSettingsPage = lazy(() => import("../pages/admin/SettingsPage"));

// // User Pages
// const UserDashboardPage = lazy(() => import("../pages/user/DashboardPage"));
// const UserProfilePage = lazy(() => import("../pages/user/ProfilePage"));
// const UserPoliciesPage = lazy(() => import("../pages/user/MyPoliciesPage"));
// const UserBrowsePlans = lazy(() => import("../pages/user/BrowsePlansPage"));
// const UserDocumentsPage = lazy(() => import("../pages/user/DocumentsPage"));
// const UserSupportPage = lazy(() => import("../pages/user/SupportPage"));

// // Fallback
// const NotFoundPage = lazy(() => import("../pages/public/NotFoundPage"));

// ─── Route Config ─────────────────────────────────────────────

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
    name: "Plans",
    path: "/plans",
    component: PlansPage,
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

  // ── Auth Routes ────────────────────────────────────────────
  {
    name: "Login",
    path: "/login",
    component: LoginPage,
    userRoles: [ROLES.ALL],
    layout: "auth",
  },
  // {
  //   name: "Register",
  //   path: "/register",
  //   component: RegisterPage,
  //   userRoles: [ROLES.ALL],
  //   layout: "auth",
  // },
  // {
  //   name: "Forgot Password",
  //   path: "/forgot-password",
  //   component: ForgotPasswordPage,
  //   userRoles: [ROLES.ALL],
  //   layout: "auth",
  // },

  // // ── Admin Routes ───────────────────────────────────────────
  {
    name: "Admin Dashboard",
    path: "/admin",
    component: AdminDashboardPage,
    userRoles: [ROLES.ADMIN],
    layout: "admin",
  },
  // {
  //   name: "Admin Users",
  //   path: "/admin/users",
  //   component: AdminUsersPage,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },
  // {
  //   name: "Admin User Detail",
  //   path: "/admin/users/:id",
  //   component: AdminUserDetail,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },
  // {
  //   name: "Admin Plans",
  //   path: "/admin/plans",
  //   component: AdminPlansPage,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },
  // {
  //   name: "Admin Plan Form",
  //   path: "/admin/plans/:id",
  //   component: AdminPlanForm,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },
  // {
  //   name: "Admin Policies",
  //   path: "/admin/policies",
  //   component: AdminPoliciesPage,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },
  // {
  //   name: "Admin Documents",
  //   path: "/admin/documents",
  //   component: AdminDocumentsPage,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },
  // {
  //   name: "Admin Reports",
  //   path: "/admin/reports",
  //   component: AdminReportsPage,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },
  // {
  //   name: "Admin Settings",
  //   path: "/admin/settings",
  //   component: AdminSettingsPage,
  //   userRoles: [ROLES.ADMIN],
  //   layout: "admin",
  // },

  // // ── User Routes ────────────────────────────────────────────
  // {
  //   name: "User Dashboard",
  //   path: "/dashboard",
  //   component: UserDashboardPage,
  //   userRoles: [ROLES.USER],
  //   layout: "user",
  // },
  // {
  //   name: "My Profile",
  //   path: "/profile",
  //   component: UserProfilePage,
  //   userRoles: [ROLES.USER],
  //   layout: "user",
  // },
  // {
  //   name: "My Policies",
  //   path: "/my-policies",
  //   component: UserPoliciesPage,
  //   userRoles: [ROLES.USER],
  //   layout: "user",
  // },
  // {
  //   name: "Browse Plans",
  //   path: "/browse-plans",
  //   component: UserBrowsePlans,
  //   userRoles: [ROLES.USER],
  //   layout: "user",
  // },
  // {
  //   name: "My Documents",
  //   path: "/documents",
  //   component: UserDocumentsPage,
  //   userRoles: [ROLES.USER],
  //   layout: "user",
  // },
  // {
  //   name: "Support",
  //   path: "/support",
  //   component: UserSupportPage,
  //   userRoles: [ROLES.USER],
  //   layout: "user",
  // },

  // // ── 404 ───────────────────────────────────────────────────
  // {
  //   name: "Not Found",
  //   path: "*",
  //   component: NotFoundPage,
  //   userRoles: [ROLES.ALL],
  //   layout: "public",
  // },
];
