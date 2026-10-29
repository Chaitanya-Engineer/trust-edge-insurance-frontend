// ─── Customer Dashboard Mock Data ─────────────────────────────────────
// Uses exact database field names matching UserRegistrationForm & PolicyRegistrationForm
// plus convenient camelCase aliases for seamless frontend compatibility.

// ── Customer Profile (Database Fields + Aliases) ──────────────────────
export const mockCustomerProfile = {
  // Database fields (UserRegistrationForm / DB schema)
  name: "Priya Mehta",
  date_of_birth: "1994-08-12",
  gender: "Female",
  phone: "+91 98765 43210",
  email: "priya.mehta@example.com",
  pan_no: "ABCDE1234F",
  aadhar_no: "5544 3322 1100",
  address: "Flat 402, Sunshine Heights, MG Road",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400001",

  // Aliases from registration form
  fullName: "Priya Mehta",
  dob: "1994-08-12",
  mobileNumber: "+91 98765 43210",
  emailAddress: "priya.mehta@example.com",
  panNumber: "ABCDE1234F",
  aadhaarNumber: "5544 3322 1100",
  pinCode: "400001",

  // Portal metadata
  customer_id: "CUST-1001",
  customerId: "CUST-1001",
  status: "Verified",
  kyc_status: "VERIFIED",
  created_at: "2024-01-10",
  blood_group: "O+",
  emergency_contact: "+91 98765 00001",
  assigned_advisor: {
    name: "Mr. Chaudhari",
    designation: "Senior Insurance Advisor",
    phone: "+91 97735 48537",
    email: "trustedgeimf@gmail.com",
  },
};

// ── Customer Purchased Policies ───────────────────────────────────────
// Follows exact PolicyRegistrationForm payload schema & TrustEdge constants
export const mockCustomerPolicies = [
  {
    id: 1,
    policy_id: "P1002",
    policyId: "P1002",
    customer_id: "CUST-1001",
    customerId: "CUST-1001",
    customer_name: "Priya Mehta",
    customerName: "Priya Mehta",
    policyHolderName: "Priya Mehta",
    phone: "+91 98765 43210",
    mobile_number: "+91 98765 43210",
    mobileNumber: "+91 98765 43210",
    status: "Active",

    // Policy registration fields
    policy_name: "HDFC ERGO Health Suraksha",
    policyName: "HDFC ERGO Health Suraksha",
    category: "Health Insurance",
    sub_type: "Family Floater",
    subType: "Family Floater",
    issue_date: "2026-01-15",
    issueDate: "2026-01-15",
    expiry_date: "2027-01-14",
    expiryDate: "2027-01-14",
    premium_amount: "25000",
    price: "25,000",
    policy_pdf_url: "https://example.com/policies/P1002.pdf",
    policyPdfUrl: "https://example.com/policies/P1002.pdf",
    issued_by: "Mr. chaudhari",
    issuedBy: "Mr. chaudhari",

    // Tx fields
    txMode: "UPI",
    payStatus: "Paid",
    txDate: "2026-01-15",
    txTime: "10:30 AM",

    // Nested payload matching backend schema
    policy_description: {
      insurer: "HDFC ERGO General Insurance Co.",
      coverage: "₹10,00,000 Floater Sum Insured",
      policy_tenure: "1 Year",
      room_rent_limit: "Single Private Room (No Capping)",
      copay: "0% Copayment",
      members: [
        { id: 1, name: "Priya Mehta", age: 31, relation: "Self" },
        { id: 2, name: "Amit Mehta", age: 34, relation: "Spouse" },
        { id: 3, name: "Aarav Mehta", age: 6, relation: "Child" },
      ],
    },
    payment_details: {
      payment_mode: "UPI",
      payment_status: "PAID",
      transaction_id: "UPI-98234710293",
      transaction_date: "2026-01-15",
      transaction_time: "10:30 AM",
      transaction_note: "Annual health premium paid via UPI",
    },
  },
  {
    id: 2,
    policy_id: "POL-2026-002",
    policyId: "POL-2026-002",
    customer_id: "CUST-1001",
    customerId: "CUST-1001",
    customer_name: "Priya Mehta",
    customerName: "Priya Mehta",
    policyHolderName: "Priya Mehta",
    phone: "+91 98765 43210",
    mobile_number: "+91 98765 43210",
    mobileNumber: "+91 98765 43210",
    status: "Active",

    // Policy registration fields
    policy_name: "Tata AIG Auto Secure",
    policyName: "Tata AIG Auto Secure",
    category: "Motor Insurance",
    sub_type: "Comprehensive Private Car",
    subType: "Car",
    issue_date: "2026-02-01",
    issueDate: "2026-02-01",
    expiry_date: "2027-01-31",
    expiryDate: "2027-01-31",
    premium_amount: "12200",
    price: "12,200",
    policy_pdf_url: "https://example.com/policies/POL-2026-002.pdf",
    policyPdfUrl: "https://example.com/policies/POL-2026-002.pdf",
    issued_by: "Mr. chaudhari",
    issuedBy: "Mr. chaudhari",

    // Tx fields
    txMode: "Net Banking",
    payStatus: "Paid",
    txDate: "2026-02-01",
    txTime: "02:15 PM",

    policy_description: {
      insurer: "Tata AIG General Insurance",
      coverage: "Comprehensive + Zero Depreciation Add-on",
      vehicle_name: "Hyundai Creta SX (O) Turbo",
      vehicle_number: "MH-01-CZ-4521",
      vehicle_owner: "Priya Mehta",
      idv: "₹14,50,000",
      engine_no: "G4LD-102934",
      chassis_no: "MALC381CL1092834",
    },
    payment_details: {
      payment_mode: "NET_BANKING",
      payment_status: "PAID",
      transaction_id: "HDFC-NET-9912048",
      transaction_date: "2026-02-01",
      transaction_time: "02:15 PM",
      transaction_note: "Car insurance comprehensive policy renewal",
    },
  },
  {
    id: 3,
    policy_id: "POL-2025-003",
    policyId: "POL-2025-003",
    customer_id: "CUST-1001",
    customerId: "CUST-1001",
    customer_name: "Priya Mehta",
    customerName: "Priya Mehta",
    policyHolderName: "Priya Mehta",
    phone: "+91 98765 43210",
    mobile_number: "+91 98765 43210",
    mobileNumber: "+91 98765 43210",
    status: "Renewal Due",
    isRenewalUpcoming: true,

    // Policy registration fields
    policy_name: "ICICI Prudential iProtect Smart",
    policyName: "ICICI Prudential iProtect Smart",
    category: "Personal Insurance",
    sub_type: "Term Life Insurance",
    subType: "Term Life",
    issue_date: "2025-11-10",
    issueDate: "2025-11-10",
    expiry_date: "2026-11-09",
    expiryDate: "2026-11-09",
    premium_amount: "18000",
    price: "18,000",
    policy_pdf_url: "https://example.com/policies/POL-2025-003.pdf",
    policyPdfUrl: "https://example.com/policies/POL-2025-003.pdf",
    issued_by: "Mr. chaudhari",
    issuedBy: "Mr. chaudhari",

    // Tx fields
    txMode: "Credit Card",
    payStatus: "Paid",
    txDate: "2025-11-10",
    txTime: "11:45 AM",

    policy_description: {
      insurer: "ICICI Prudential Life Insurance",
      coverage: "₹1,00,00,000 Pure Term Life Cover",
      policy_tenure: "30 Years",
      nominee: "Amit Mehta (Spouse) - 100% share",
      critical_illness_rider: "Active (₹15,00,000 Accidental & Illness)",
    },
    payment_details: {
      payment_mode: "CREDIT_CARD",
      payment_status: "PAID",
      transaction_id: "CC-AUTH-8841029",
      transaction_date: "2025-11-10",
      transaction_time: "11:45 AM",
      transaction_note: "Annual Term Plan premium",
    },
  },
];

// ── Support Information & FAQs ────────────────────────────────────────
export const mockSupportInfo = {
  phone1: "+91 97735 48537",
  phone2: "+91 99225 54066",
  email: "trustedgeimf@gmail.com",
  whatsapp_number: "+91 97735 48537",
  whatsapp_url: "https://wa.me/919773548537",
  office_hours: "Monday - Saturday, 9:00 AM - 7:00 PM IST",
  office_address:
    "TrustEdge Insurance Advisory, Nariman Point, Express Towers 8th Floor, Mumbai, Maharashtra 400021",
  advisor: {
    name: "Mr. Chaudhari",
    designation: "Dedicated Senior Insurance Advisor",
    phone: "+91 97735 48537",
    email: "trustedgeimf@gmail.com",
    available_hours: "9:30 AM - 6:30 PM",
  },
  faqs: [
    {
      question: "Where can I find my official Policy ID / Policy Number?",
      answer:
        "For your official Policy ID, please download the activation policy PDF certificate directly from the 'My Policy' page.",
    },
    {
      question: "How do I download my policy document / schedule?",
      answer:
        "You can view and download your policy schedule anytime under 'My Policy'. Click 'Download PDF' or 'View Details' on the respective policy card to view the official document.",
    },
    {
      question: "What is the procedure for a cashless hospital claim?",
      answer:
        "Present your Health Insurance policy document and a photo ID at the network hospital's TPA insurance desk. The hospital will initiate pre-authorization directly with the insurer.",
    },
    {
      question: "How do I renew my upcoming policy?",
      answer:
        "Your advisor Mr. Chaudhari will connect with you 30 days prior to expiry. You can also initiate renewal through the upcoming renewals banner on your dashboard or contact our helpline numbers at +91 97735 48537 / +91 99225 54066.",
    },
    {
      question: "How do I update my registered mobile number or address?",
      answer:
        "Because customer records are KYC-verified, please email trustedgeimf@gmail.com or contact your assigned advisor with updated address proof to request modification.",
    },
  ],
};
