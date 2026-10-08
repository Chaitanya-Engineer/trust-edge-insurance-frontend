// ==============================================================================
// TrustEdge Insurance Reports - Database Schema Aligned Constants & Models
// Schema Sources:
//   - policies_policy (id, policy_id, customer_id, policy_name, category, sub_type,
//                      issue_date, expiry_date, premium_amount, status, payment_details)
//   - customers_customer (customer_id, user_id, pan_no, aadhar_no)
//   - users_user (name, phone, email)
// ==============================================================================

export const REPORT_TABS = [
  { id: "financials", label: "Financial Overview", countKey: "totalCollected" },
  { id: "policies", label: "Policy & Categories", countKey: "policyCount" },
  { id: "renewals", label: "Renewals & Payments", countKey: "renewalsDue" },
  { id: "claims", label: "Claims & Partners", countKey: "claimsCount" },
];

export const DATE_RANGE_OPTIONS = [
  { value: "this_month", label: "This Month (Mar 2026)" },
  { value: "last_3_months", label: "Last 3 Months" },
  { value: "last_6_months", label: "Last 6 Months" },
  { value: "this_year", label: "This Year (2026)" },
  { value: "all", label: "All Time" },
];

export const CATEGORY_OPTIONS = [
  { value: "ALL", label: "All Categories" },
  { value: "Health Insurance", label: "Health Insurance" },
  { value: "Motor Insurance", label: "Motor Insurance" },
  { value: "Property Insurance", label: "Property Insurance" },
  { value: "Personal Insurance", label: "Personal Accident" },
  { value: "Marine Insurance", label: "Marine Insurance" },
  { value: "Workmen Compensation", label: "Workmen Compensation" },
];

export const STATUS_OPTIONS = [
  { value: "ALL", label: "All Statuses" },
  { value: "Active", label: "Active" },
  { value: "Review Required", label: "Review Required" },
  { value: "Expired", label: "Expired" },
];
export const POLICY_STATUS_OPTIONS = STATUS_OPTIONS;

export const CLAIM_STATUS_OPTIONS = [
  { value: "ALL", label: "All Claim Statuses" },
  { value: "Settled", label: "Settled" },
  { value: "Approved", label: "Approved" },
  { value: "Under Review", label: "Under Review" },
  { value: "Rejected", label: "Rejected" },
];

export const PAYMENT_STATUS_OPTIONS = [
  { value: "ALL", label: "All Payment Statuses" },
  { value: "PAID", label: "Paid" },
  { value: "PENDING", label: "Pending" },
  { value: "OVERDUE", label: "Overdue" },
];

export const PARTNER_OPTIONS = [
  { value: "ALL", label: "All Underwriters" },
  { value: "Star Health", label: "Star Health" },
  { value: "HDFC ERGO", label: "HDFC ERGO" },
  { value: "Tata AIG", label: "Tata AIG" },
  { value: "Bajaj Allianz", label: "Bajaj Allianz" },
  { value: "Care Health", label: "Care Health" },
  { value: "Go Digit", label: "Go Digit" },
  { value: "Niva Bupa", label: "Niva Bupa" },
  { value: "ICICI Lombard", label: "ICICI Lombard" },
  { value: "New India Assurance", label: "New India Assurance" },
];

// Master Database-Derived Policies Dataset
export const MASTER_POLICIES_REPORT_DATA = [
  {
    policy_id: "POL-2026-001",
    customer_id: "CUST-101",
    customer_name: "Priya Mehta",
    customer_phone: "+91 98765 43210",
    policy_name: "Star Health Comprehensive",
    category: "Health Insurance",
    sub_type: "Family Floater",
    partner: "Star Health",
    premium_amount: 25000,
    status: "Active",
    issue_date: "2026-01-15",
    expiry_date: "2027-01-14",
    payment_status: "PAID",
    payment_mode: "UPI",
    created_at: "2026-01-15T11:00:00Z",
  },
  {
    policy_id: "POL-2026-002",
    customer_id: "CUST-101",
    customer_name: "Priya Mehta",
    customer_phone: "+91 98765 43210",
    policy_name: "HDFC ERGO Private Car",
    category: "Motor Insurance",
    sub_type: "Car",
    partner: "HDFC ERGO",
    premium_amount: 12200,
    status: "Active",
    issue_date: "2026-02-01",
    expiry_date: "2027-01-31",
    payment_status: "PAID",
    payment_mode: "Card",
    created_at: "2026-02-01T14:30:00Z",
  },
  {
    policy_id: "POL-2024-003",
    customer_id: "CUST-101",
    customer_name: "Priya Mehta",
    customer_phone: "+91 98765 43210",
    policy_name: "ICICI Prudential iProtect",
    category: "Personal Insurance",
    sub_type: "Term Life",
    partner: "Care Health",
    premium_amount: 18000,
    status: "Expired",
    issue_date: "2024-01-05",
    expiry_date: "2026-01-04",
    payment_status: "PAID",
    payment_mode: "Cheque",
    created_at: "2024-01-05T12:00:00Z",
  },
  {
    policy_id: "POL-2026-004",
    customer_id: "CUST-102",
    customer_name: "Rahul Sharma",
    customer_phone: "+91 91234 56789",
    policy_name: "Care Supreme Health",
    category: "Health Insurance",
    sub_type: "Individual",
    partner: "Care Health",
    premium_amount: 14500,
    status: "Active",
    issue_date: "2026-03-01",
    expiry_date: "2027-02-28",
    payment_status: "PAID",
    payment_mode: "UPI",
    created_at: "2026-03-01T10:00:00Z",
  },
  {
    policy_id: "POL-2026-005",
    customer_id: "CUST-103",
    customer_name: "Ananya Verma",
    customer_phone: "+91 98111 22334",
    policy_name: "Tata AIG Auto Secure",
    category: "Motor Insurance",
    sub_type: "Two Wheeler",
    partner: "Tata AIG",
    premium_amount: 3800,
    status: "Review Required",
    issue_date: "2026-03-10",
    expiry_date: "2027-03-09",
    payment_status: "PENDING",
    payment_mode: "NetBanking",
    created_at: "2026-03-10T10:15:00Z",
  },
  {
    policy_id: "POL-2026-006",
    customer_id: "CUST-104",
    customer_name: "Vikram Mehta",
    customer_phone: "+91 97654 32109",
    policy_name: "Bajaj Allianz Commercial",
    category: "Property Insurance",
    sub_type: "Commercial Asset",
    partner: "Bajaj Allianz",
    premium_amount: 32000,
    status: "Active",
    issue_date: "2026-03-15",
    expiry_date: "2027-03-14",
    payment_status: "PAID",
    payment_mode: "Cheque",
    created_at: "2026-03-15T16:45:00Z",
  },
  {
    policy_id: "POL-2026-007",
    customer_id: "CUST-105",
    customer_name: "Sneha Gupta",
    customer_phone: "+91 96333 44556",
    policy_name: "Niva Bupa ReAssure 2.0",
    category: "Health Insurance",
    sub_type: "Family Floater",
    partner: "Niva Bupa",
    premium_amount: 21500,
    status: "Active",
    issue_date: "2026-03-20",
    expiry_date: "2027-03-19",
    payment_status: "PAID",
    payment_mode: "UPI",
    created_at: "2026-03-20T10:00:00Z",
  },
  {
    policy_id: "POL-2026-008",
    customer_id: "CUST-106",
    customer_name: "Karan Johar",
    customer_phone: "+91 98222 11223",
    policy_name: "Go Digit Fleet Protect",
    category: "Motor Insurance",
    sub_type: "Commercial Fleet",
    partner: "Go Digit",
    premium_amount: 18400,
    status: "Review Required",
    issue_date: "2026-03-12",
    expiry_date: "2027-03-11",
    payment_status: "PENDING",
    payment_mode: "Card",
    created_at: "2026-03-12T09:30:00Z",
  },
  {
    policy_id: "POL-2026-009",
    customer_id: "CUST-107",
    customer_name: "Aditi Rao",
    customer_phone: "+91 98450 67890",
    policy_name: "ICICI Lombard Cargo Safe",
    category: "Marine Insurance",
    sub_type: "Cargo Transit",
    partner: "ICICI Lombard",
    premium_amount: 45000,
    status: "Active",
    issue_date: "2026-03-10",
    expiry_date: "2027-03-09",
    payment_status: "PAID",
    payment_mode: "NetBanking",
    created_at: "2026-03-10T11:20:00Z",
  },
  {
    policy_id: "POL-2026-010",
    customer_id: "CUST-108",
    customer_name: "Rajesh Kulkarni",
    customer_phone: "+91 97300 12345",
    policy_name: "New India Workmen Comp",
    category: "Workmen Compensation",
    sub_type: "Liability",
    partner: "New India Assurance",
    premium_amount: 28500,
    status: "Active",
    issue_date: "2026-03-08",
    expiry_date: "2027-03-07",
    payment_status: "PAID",
    payment_mode: "Cheque",
    created_at: "2026-03-08T15:00:00Z",
  },
  // Upcoming Renewals mock items
  {
    policy_id: "POL-2025-110",
    customer_id: "CUST-109",
    customer_name: "Rohit Deshmukh",
    customer_phone: "+91 98900 99887",
    policy_name: "Star Health Premier",
    category: "Health Insurance",
    sub_type: "Individual",
    partner: "Star Health",
    premium_amount: 24000,
    status: "Active",
    issue_date: "2025-03-29",
    expiry_date: "2026-03-29", // Due this week!
    payment_status: "PAID",
    payment_mode: "UPI",
    created_at: "2025-03-29T10:00:00Z",
  },
  {
    policy_id: "POL-2025-112",
    customer_id: "CUST-110",
    customer_name: "Deepak Choudhary",
    customer_phone: "+91 98200 44556",
    policy_name: "Tata AIG Private Car",
    category: "Motor Insurance",
    sub_type: "Car",
    partner: "Tata AIG",
    premium_amount: 11500,
    status: "Active",
    issue_date: "2025-04-02",
    expiry_date: "2026-04-02", // Due in ~27 days
    payment_status: "PAID",
    payment_mode: "Card",
    created_at: "2025-04-02T14:00:00Z",
  },
];

// Master Claims Mock Data
export const MASTER_CLAIMS_REPORT_DATA = [
  {
    claim_id: "CLM-901",
    policy_id: "POL-2026-001",
    customer_name: "Priya Mehta",
    partner: "Star Health",
    category: "Health Insurance",
    claimed_amount: 65000,
    settled_amount: 62000,
    status: "Settled",
    filing_date: "2026-02-10",
    tat_days: 4,
  },
  {
    claim_id: "CLM-902",
    policy_id: "POL-2026-002",
    customer_name: "Priya Mehta",
    partner: "HDFC ERGO",
    category: "Motor Insurance",
    claimed_amount: 18000,
    settled_amount: 18000,
    status: "Settled",
    filing_date: "2026-02-28",
    tat_days: 3,
  },
  {
    claim_id: "CLM-903",
    policy_id: "POL-2026-004",
    customer_name: "Rahul Sharma",
    partner: "Care Health",
    category: "Health Insurance",
    claimed_amount: 42000,
    settled_amount: 42000,
    status: "Approved",
    filing_date: "2026-03-12",
    tat_days: 5,
  },
  {
    claim_id: "CLM-904",
    policy_id: "POL-2026-006",
    customer_name: "Vikram Mehta",
    partner: "Bajaj Allianz",
    category: "Property Insurance",
    claimed_amount: 120000,
    settled_amount: 0,
    status: "Under Review",
    filing_date: "2026-03-18",
    tat_days: 6,
  },
  {
    claim_id: "CLM-905",
    policy_id: "POL-2026-008",
    customer_name: "Karan Johar",
    partner: "Go Digit",
    category: "Motor Insurance",
    claimed_amount: 35000,
    settled_amount: 0,
    status: "Rejected",
    filing_date: "2026-02-05",
    tat_days: 7,
  },
];

// Helper: Calculate Metrics & Filter Dataset Cleanly
export const calculateExecutiveReportsData = (
  policies = MASTER_POLICIES_REPORT_DATA,
  claims = MASTER_CLAIMS_REPORT_DATA,
  filters = {}
) => {
  let filtered = [...policies];

  if (filters.category && filters.category !== "ALL") {
    filtered = filtered.filter((p) => p.category === filters.category);
  }
  if (filters.partner && filters.partner !== "ALL") {
    filtered = filtered.filter((p) => p.partner === filters.partner);
  }
  const effectiveStatus = filters.policyStatus || filters.status;
  if (effectiveStatus && effectiveStatus !== "ALL") {
    filtered = filtered.filter((p) => p.status === effectiveStatus);
  }
  if (filters.paymentStatus && filters.paymentStatus !== "ALL") {
    filtered = filtered.filter((p) => p.payment_status === filters.paymentStatus);
  }

  // Financial calculations
  const grossWritten = filtered.reduce((acc, p) => acc + (p.premium_amount || 0), 0);
  const collected = filtered
    .filter((p) => p.payment_status === "PAID")
    .reduce((acc, p) => acc + (p.premium_amount || 0), 0);
  const outstanding = filtered
    .filter((p) => p.payment_status === "PENDING")
    .reduce((acc, p) => acc + (p.premium_amount || 0), 0);

  // Filter Claims
  let filteredClaims = [...claims];
  if (filters.category && filters.category !== "ALL") {
    filteredClaims = filteredClaims.filter((c) => c.category === filters.category);
  }
  if (filters.partner && filters.partner !== "ALL") {
    filteredClaims = filteredClaims.filter((c) => c.partner === filters.partner);
  }
  if (filters.claimStatus && filters.claimStatus !== "ALL") {
    filteredClaims = filteredClaims.filter((c) => c.status === filters.claimStatus);
  }

  const claimsPaid = filteredClaims
    .filter((c) => c.status === "Settled")
    .reduce((acc, c) => acc + (c.settled_amount || 0), 0);
  const netRetained = Math.max(0, collected - claimsPaid);

  // Policy counters
  const totalPolicies = filtered.length;
  const activePolicies = filtered.filter((p) => p.status === "Active").length;
  const reviewPolicies = filtered.filter((p) => p.status === "Review Required").length;
  const expiredPolicies = filtered.filter((p) => p.status === "Expired").length;

  // Category distribution for charts
  const categoryMap = {};
  filtered.forEach((p) => {
    const cat = p.category || "General";
    categoryMap[cat] = (categoryMap[cat] || 0) + (p.premium_amount || 0);
  });
  const categoryDistribution = Object.entries(categoryMap).map(([name, val]) => ({
    name,
    value: val,
  }));

  // Renewals logic (policies expiring within 30 days)
  const now = new Date("2026-03-24").getTime(); // Relative anchor
  const upcomingRenewals = filtered.filter((p) => {
    if (!p.expiry_date) return false;
    const exp = new Date(p.expiry_date).getTime();
    const diffDays = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 45;
  });

  // Partner summary
  const partnerMap = {};
  filtered.forEach((p) => {
    const part = p.partner || "Direct Agency";
    if (!partnerMap[part]) {
      partnerMap[part] = { name: part, policiesCount: 0, premium: 0 };
    }
    partnerMap[part].policiesCount += 1;
    partnerMap[part].premium += p.premium_amount || 0;
  });
  const partnerPerformance = Object.values(partnerMap);

  return {
    filteredPolicies: filtered,
    filteredClaims,
    financials: {
      totalCollected: collected,
      grossWritten,
      outstanding,
      claimsPaid,
      netRetained,
    },
    policyCounters: {
      total: totalPolicies,
      active: activePolicies,
      review: reviewPolicies,
      expired: expiredPolicies,
    },
    categoryDistribution,
    upcomingRenewals,
    partnerPerformance,
  };
};

// Export to CSV helper with UTF-8 BOM for 100% Excel and Google Sheets compatibility
export const exportPoliciesToCSV = (
  policies = [],
  filename = "TrustEdge_Policies_Report.csv",
  filters = {},
  financials = {}
) => {
  if (!policies || policies.length === 0) return;

  const headers = [
    "Policy ID",
    "Customer Name",
    "Customer ID",
    "Contact Phone",
    "Policy Name",
    "Insurance Category",
    "Sub Type",
    "Underwriter Partner",
    "Premium Amount (INR)",
    "Policy Status",
    "Issue Date",
    "Expiry Date",
    "Payment Status",
    "Payment Mode",
  ];

  const escapeCSV = (val) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = policies.map((p) => [
    escapeCSV(p.policy_id),
    escapeCSV(p.customer_name),
    escapeCSV(p.customer_id),
    escapeCSV(p.customer_phone || "-"),
    escapeCSV(p.policy_name),
    escapeCSV(p.category),
    escapeCSV(p.sub_type || "-"),
    escapeCSV(p.partner),
    Number(p.premium_amount || 0),
    escapeCSV(p.status),
    escapeCSV(p.issue_date),
    escapeCSV(p.expiry_date),
    escapeCSV(p.payment_status),
    escapeCSV(p.payment_mode || "Online"),
  ]);

  const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\r\n");

  // \uFEFF is the UTF-8 Byte Order Mark (BOM).
  // This ensures Microsoft Excel on Windows opens the CSV properly formatted with columns and symbols.
  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

export const exportReportToCSV = exportPoliciesToCSV;

// Executive PDF Report Generator (Opens dedicated corporate printable statement)
export const generateExecutivePDFReport = ({
  policies = [],
  filters = {},
  financials = {},
  title = "TrustEdge Insurance Portfolio & Financial Audit Statement",
}) => {
  const nowStr = new Date().toLocaleString("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
  });
  const grossWritten = policies.reduce((acc, p) => acc + (p.premium_amount || 0), 0);
  const collected = policies
    .filter((p) => p.payment_status === "PAID")
    .reduce((acc, p) => acc + (p.premium_amount || 0), 0);
  const pending = grossWritten - collected;
  const activeCount = policies.filter((p) => p.status === "Active").length;

  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to view and print the Executive PDF Report.");
    return;
  }

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    @page {
      size: A4 landscape;
      margin: 10mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #0F172A;
      margin: 0;
      padding: 16px;
      font-size: 11px;
      background: #FFFFFF;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0B2545;
      padding-bottom: 12px;
      margin-bottom: 14px;
    }
    .brand-title {
      font-size: 20px;
      font-weight: 800;
      color: #0B2545;
      letter-spacing: -0.5px;
      margin: 0;
    }
    .brand-sub {
      font-size: 10px;
      color: #64748B;
      margin-top: 2px;
    }
    .meta-box {
      text-align: right;
      font-size: 10px;
      color: #475569;
    }
    .meta-badge {
      display: inline-block;
      background: #0B2545;
      color: #FFFFFF;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9px;
      margin-bottom: 4px;
    }
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-bottom: 14px;
    }
    .kpi-card {
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 10px;
      background: #F8FAFC;
    }
    .kpi-title {
      font-size: 9px;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .kpi-val {
      font-size: 15px;
      font-weight: 800;
      color: #0B2545;
      margin-top: 3px;
    }
    .scope-bar {
      background: #EEF2F6;
      border-left: 3px solid #0B2545;
      padding: 6px 10px;
      font-size: 10px;
      margin-bottom: 12px;
      border-radius: 0 4px 4px 0;
      display: flex;
      justify-content: space-between;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 10px;
    }
    th {
      background: #0B2545;
      color: #FFFFFF;
      text-align: left;
      padding: 7px 8px;
      font-weight: 700;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    td {
      padding: 6px 8px;
      border-bottom: 1px solid #E2E8F0;
      color: #1E293B;
    }
    tr:nth-child(even) td {
      background: #F8FAFC;
    }
    .status-badge {
      display: inline-block;
      padding: 2px 6px;
      border-radius: 999px;
      font-size: 8px;
      font-weight: 700;
      text-transform: uppercase;
    }
    .status-active { background: #DCFCE7; color: #166534; }
    .status-review { background: #FEF3C7; color: #92400E; }
    .status-expired { background: #FEE2E2; color: #991B1B; }
    .footer {
      border-top: 1px solid #E2E8F0;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      color: #94A3B8;
      font-size: 9px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="brand-title">TRUSTEDGE INSURANCE</h1>
      <div class="brand-sub">TrustEdge Risk Solutions Pvt. Ltd. | CIN: U66010MH2020PTC123456 | IRDAI Reg: TE-CORP-7829</div>
    </div>
    <div class="meta-box">
      <div class="meta-badge">OFFICIAL AUDIT STATEMENT</div>
      <div><strong>Date:</strong> ${nowStr}</div>
      <div><strong>Ref ID:</strong> TE-REP-${Date.now().toString().slice(-6)}</div>
    </div>
  </div>

  <div class="scope-bar">
    <div><strong>Filter Scope:</strong> Category: ${filters.category || "All"} | Underwriter: ${filters.partner || "All"} | Status: ${filters.policyStatus || filters.status || "All"}</div>
    <div><strong>Matching Policies:</strong> ${policies.length} Records</div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card">
      <div class="kpi-title">Gross Written Premium</div>
      <div class="kpi-val">₹${formatINR(grossWritten)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Realized Inflow (Paid)</div>
      <div class="kpi-val" style="color: #2F6F3E;">₹${formatINR(collected)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Pending / In-Review</div>
      <div class="kpi-val" style="color: #C9A227;">₹${formatINR(pending)}</div>
    </div>
    <div class="kpi-card">
      <div class="kpi-title">Active In-Force Policies</div>
      <div class="kpi-val">${activeCount} of ${policies.length}</div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Policy ID</th>
        <th>Customer Name</th>
        <th>Product Line</th>
        <th>Underwriter</th>
        <th style="text-align: right;">Premium (INR)</th>
        <th style="text-align: center;">Status</th>
        <th>Issue Date</th>
        <th>Expiry Date</th>
        <th style="text-align: center;">Payment</th>
      </tr>
    </thead>
    <tbody>
      ${policies
        .map(
          (p) => `
        <tr>
          <td style="font-family: monospace; font-weight: 700; color: #0B2545;">${p.policy_id}</td>
          <td><strong>${p.customer_name}</strong><br><span style="color:#64748B; font-size:8px;">${p.customer_id}</span></td>
          <td>${p.policy_name}<br><span style="color:#64748B; font-size:8px;">${p.category}</span></td>
          <td>${p.partner}</td>
          <td style="text-align: right; font-weight: 700;">₹${formatINR(p.premium_amount)}</td>
          <td style="text-align: center;">
            <span class="status-badge ${
              p.status === "Active"
                ? "status-active"
                : p.status === "Review Required"
                ? "status-review"
                : "status-expired"
            }">
              ${p.status}
            </span>
          </td>
          <td>${p.issue_date}</td>
          <td>${p.expiry_date}</td>
          <td style="text-align: center; font-weight: 700; color: ${p.payment_status === "PAID" ? "#166534" : "#92400E"}">
            ${p.payment_status}
          </td>
        </tr>
      `
        )
        .join("")}
    </tbody>
  </table>

  <div class="footer">
    <div>TrustEdge Enterprise Insurance Core Platform &bull; Strictly Confidential &bull; For Internal Financial & Regulatory Review</div>
    <div>Generated by Admin Executive &bull; Page 1 of 1</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
};


