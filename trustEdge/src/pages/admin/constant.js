// ─── Dashboard Dummy Data ─────────────────────────────────────
// Jab API ready ho jaaye tab DashboardPage.jsx mein
// is data ko useAPI hook se replace kar dena

export const DUMMY_DASHBOARD = {

  // ── KPI Stats ───────────────────────────────────────────
  stats: {
    total_users: 248,
    active_policies: 183,
    pending_documents: 12,
    total_revenue: 482000,
  },

  // ── Line Chart — Monthly Signups ────────────────────────
  monthly_signups: [
    { month: "Jan", users: 12 },
    { month: "Feb", users: 18 },
    { month: "Mar", users: 25 },
    { month: "Apr", users: 20 },
    { month: "May", users: 32 },
    { month: "Jun", users: 28 },
    { month: "Jul", users: 35 },
  ],

  // ── Donut Chart — Plan Distribution ─────────────────────
  plan_distribution: [
    { name: "Health",  value: 40 },
    { name: "Life",    value: 35 },
    { name: "Vehicle", value: 25 },
  ],

  // ── Recent Users Table ───────────────────────────────────
  recent_users: [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "9876543210",
      created_at: "2026-06-21T10:30:00Z",
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "9123456789",
      created_at: "2026-06-21T09:15:00Z",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@example.com",
      phone: "9988776655",
      created_at: "2026-06-20T14:20:00Z",
    },
    {
      id: 4,
      name: "Neha Kapoor",
      email: "neha@example.com",
      phone: "9011223344",
      created_at: "2026-06-20T11:00:00Z",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram@example.com",
      phone: "9765432109",
      created_at: "2026-06-19T16:45:00Z",
    },
  ],

  // ── Pending Documents ────────────────────────────────────
  pending_documents: [
    {
      id: 1,
      user_name: "Priya Patel",
      user_email: "priya@example.com",
      document_type: "Aadhaar",
      uploaded_at: "2026-06-21T09:15:00Z",
      status: "PENDING",
    },
    {
      id: 2,
      user_name: "Amit Singh",
      user_email: "amit@example.com",
      document_type: "PAN",
      uploaded_at: "2026-06-20T14:20:00Z",
      status: "PENDING",
    },
    {
      id: 3,
      user_name: "Neha Kapoor",
      user_email: "neha@example.com",
      document_type: "Aadhaar",
      uploaded_at: "2026-06-20T11:00:00Z",
      status: "PENDING",
    },
  ],
};