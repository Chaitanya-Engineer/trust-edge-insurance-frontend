// Raw Policy Data
export const rawPoliciesData = [
  {
    id: "POL-2026-001",
    policyId: "POL-2026-001",
    policyHolderName: "Priya Mehta",
    mobileNumber: "+91 98765 43210",
    status: "Active",
    category: "Health Insurance",
    subType: "Family Floater",
    issueDate: "2026-01-15",
    expiryDate: "2027-01-14",
    price: "25,000",
    txMode: "UPI",
    payStatus: "Paid",
    txDate: "2026-01-15",
    txTime: "10:30 AM",
    issuedBy: "Mr. chaudhari",
  },
  {
    id: "POL-2026-002",
    policyId: "POL-2026-002",
    policyHolderName: "Priya Mehta",
    mobileNumber: "+91 98765 43210",
    status: "Active",
    category: "Motor Insurance",
    subType: "Car",
    issueDate: "2026-02-01",
    expiryDate: "2027-01-31",
    price: "12,200",
    txMode: "Card",
    payStatus: "Paid",
    txDate: "2026-02-01",
    txTime: "02:15 PM",
    issuedBy: "Mr.chaudhari",
  },
  {
    id: "POL-2024-003",
    policyId: "POL-2024-003",
    policyHolderName: "Priya Mehta",
    mobileNumber: "+91 98765 43210",
    status: "Active",
    category: "Personal Insurance",
    subType: "Term Life",
    issueDate: "2024-01-05",
    expiryDate: "2026-01-04", // Expired relative to today
    price: "18,000",
    txMode: "Cheque",
    payStatus: "Paid",
    txDate: "2024-01-05",
    txTime: "11:45 AM",
    issuedBy: "Mr.chaudhari",
  },
  {
    id: "POL-2026-004",
    policyId: "POL-2026-004",
    policyHolderName: "Rahul Sharma",
    mobileNumber: "+91 91234 56789",
    status: "Active",
    category: "Health Insurance",
    subType: "Individual",
    issueDate: "2026-03-01",
    expiryDate: "2027-02-28",
    price: "14,500",
    txMode: "UPI",
    payStatus: "Paid",
    txDate: "2026-03-01",
    txTime: "04:20 PM",
    issuedBy: "Mr.chaudhari",
  },
  {
    id: "POL-2026-005",
    policyId: "POL-2026-005",
    policyHolderName: "Ananya Verma",
    mobileNumber: "+91 98111 22334",
    status: "Review Required",
    category: "Property Insurance",
    subType: "Home",
    issueDate: "2026-04-10",
    expiryDate: "2027-04-09",
    price: "22,000",
    txMode: "Pending",
    payStatus: "Pending",
    txDate: "2026-04-10",
    txTime: "11:15 AM",
    issuedBy: "Mr.chaudhari",
  },
  {
    id: "POL-2023-006",
    policyId: "POL-2023-006",
    policyHolderName: "Vikram Patel",
    mobileNumber: "+91 97222 33445",
    status: "Active",
    category: "Motor Insurance",
    subType: "Two Wheeler",
    issueDate: "2023-05-10",
    expiryDate: "2024-05-09", // Expired relative to today
    price: "3,400",
    txMode: "Cash",
    payStatus: "Paid",
    txDate: "2023-05-10",
    txTime: "01:00 PM",
    issuedBy: "Mr.chaudhari",
  },
];

// Helper: Calculate dynamic policy status based on expiry date vs current date
export const getDynamicPolicyStatus = (policy) => {
  const raw = (policy.status || "").toLowerCase().trim();
  if (raw.includes("review") || raw === "pending") {
    return "Review Required";
  }
  const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  if (!policy.expiryDate) return "Active";
  return policy.expiryDate >= todayStr ? "Active" : "Expired";
};

// Helper: Calculate customer-level status priority
export const getSummarizedCustomerStatus = (policiesList) => {
  const calculatedStatuses = policiesList.map((p) => getDynamicPolicyStatus(p));
  if (calculatedStatuses.includes("Review Required")) {
    return "Review Required";
  }
  if (calculatedStatuses.includes("Active")) {
    return "Active";
  }
  return "Expired";
};

// Transform raw policies list into customer-centric main table rows
export const getCustomerCentricData = (policiesList) => {
  const customerMap = {};

  policiesList.forEach((policy) => {
    const key = policy.mobileNumber || policy.policyHolderName;
    if (!customerMap[key]) {
      customerMap[key] = {
        id: key,
        policyHolderName: policy.policyHolderName,
        mobileNumber: policy.mobileNumber,
        policies: [],
      };
    }
    const computedStatus = getDynamicPolicyStatus(policy);
    customerMap[key].policies.push({
      ...policy,
      computedStatus,
    });
  });

  return Object.values(customerMap).map((cust) => {
    const count = cust.policies.length;
    return {
      id: cust.id,
      policyHolderName: cust.policyHolderName,
      mobileNumber: cust.mobileNumber,
      policiesCount: count === 1 ? "1 Policy" : `${count} Policies`,
      policies: cust.policies,
      status: getSummarizedCustomerStatus(cust.policies),
    };
  });
};

export const customerPolicyHeaders = [
  {
    title: "Policy Holder",
    accessor: "policyHolderName",
    type: "string",
    is_filter: true,
  },
  {
    title: "Mobile Number",
    accessor: "mobileNumber",
    type: "string",
    isCopy: true,
  },
  {
    title: "Policies",
    accessor: "policiesCount",
    type: "string",
  },
  {
    title: "Status",
    accessor: "status",
    type: "special",
  },
];
