// ==============================================================================
// Database Schema Compliant Constants for Document Management
// Exact schema match for tables:
//   - policies_policy (id, policy_id, policy_name, customer_id, category, sub_type,
//                      issue_date, expiry_date, premium_amount, status, policy_pdf_url,
//                      policy_description, payment_details, commission_details, created_at, updated_at)
//   - customers_customer (id, customer_id, user_id, date_of_birth, gender, address,
//                        city, state, pincode, aadhar_no, pan_no, gst_no, created_at, updated_at)
//   - users_user (id, name, phone, email, role, is_active, is_staff, created_at, updated_at)
// ==============================================================================

export const DB_TABLES = {
  POLICIES_POLICY: "policies_policy",
  CUSTOMERS_CUSTOMER: "customers_customer",
  USERS_USER: "users_user",
};

export const DB_COLUMNS = {
  POLICIES: {
    ID: "id",
    POLICY_ID: "policy_id",
    CUSTOMER_ID: "customer_id",
    POLICY_NAME: "policy_name",
    CATEGORY: "category",
    SUB_TYPE: "sub_type",
    ISSUE_DATE: "issue_date",
    EXPIRY_DATE: "expiry_date",
    PREMIUM_AMOUNT: "premium_amount",
    STATUS: "status",
    POLICY_PDF_URL: "policy_pdf_url",
    POLICY_DESCRIPTION: "policy_description",
    PAYMENT_DETAILS: "payment_details",
    COMMISSION_DETAILS: "commission_details",
    CREATED_BY_ID: "created_by_id",
    UPDATED_BY_ID: "updated_by_id",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
  },
  CUSTOMERS: {
    ID: "id",
    CUSTOMER_ID: "customer_id",
    USER_ID: "user_id",
    DATE_OF_BIRTH: "date_of_birth",
    GENDER: "gender",
    ADDRESS: "address",
    CITY: "city",
    STATE: "state",
    PINCODE: "pincode",
    AADHAR_NO: "aadhar_no",
    PAN_NO: "pan_no",
    GST_NO: "gst_no",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
  },
  USERS: {
    ID: "id",
    NAME: "name",
    EMAIL: "email",
    PHONE: "phone",
    ROLE: "role",
    IS_ACTIVE: "is_active",
    IS_STAFF: "is_staff",
    CREATED_AT: "created_at",
    UPDATED_AT: "updated_at",
  },
};

// Helper to normalize any policy record from Database / API (GET responses)
export const normalizeDatabasePolicy = (p) => {
  const policy_id = p.policy_id || p.policyId || String(p.id || "");
  const customer_id = p.customer_id || p.customerId || "";
  const policy_name = p.policy_name || p.policyName || "";
  const premium_amount = p.premium_amount || p.price || "0";
  const issue_date = p.issue_date || p.issueDate || "";
  const expiry_date = p.expiry_date || p.expiryDate || "";
  const status = p.status || "Active";
  const category = p.category || "General";
  const sub_type = p.sub_type || p.subType || "";
  const policy_pdf_url = p.policy_pdf_url || p.policyDocPreviewUrl || p.policyDoc || null;
  const policy_description = p.policy_description || {};
  const payment_details = p.payment_details || {};
  const commission_details = p.commission_details || {};

  // Build policyAttachedDocs from policy_description if available and empty
  let policyAttachedDocs = p.policyAttachedDocs || [];
  if ((!policyAttachedDocs || policyAttachedDocs.length === 0) && policy_description) {
    policyAttachedDocs = [];
    if (policy_description.rc_file_url || policy_description.rc_file) {
      policyAttachedDocs.push({
        id: "rc_file",
        db_table: DB_TABLES.POLICIES_POLICY,
        db_field: "rc_file_url",
        json_container: "policy_description",
        label: "Registration Certificate (RC)",
        name: policy_description.vehicle_number ? `${policy_description.vehicle_number}_RC.pdf` : "Vehicle_RC.pdf",
        type: "image",
        size: "1.8 MB",
        uploaded_at: issue_date,
        previewUrl: policy_description.rc_file_url || policy_description.rc_file,
        status: "ATTACHED",
        policy_id,
        customer_id,
      });
    }
    if (policy_description.dl_file_url || policy_description.dl_file) {
      policyAttachedDocs.push({
        id: "dl_file",
        db_table: DB_TABLES.POLICIES_POLICY,
        db_field: "dl_file_url",
        json_container: "policy_description",
        label: "Driving License (DL)",
        name: "Driving_License.jpg",
        type: "image",
        size: "890 KB",
        uploaded_at: issue_date,
        previewUrl: policy_description.dl_file_url || policy_description.dl_file,
        status: "ATTACHED",
        policy_id,
        customer_id,
      });
    }
    if (policy_description.gst_certificate_url || policy_description.gst_certificate) {
      policyAttachedDocs.push({
        id: "gst_certificate",
        db_table: DB_TABLES.POLICIES_POLICY,
        db_field: "gst_certificate_url",
        json_container: "policy_description",
        label: "GST Certificate",
        name: policy_description.gst_number ? `GSTIN_${policy_description.gst_number}.pdf` : "GST_Certificate.pdf",
        type: "image",
        size: "1.4 MB",
        uploaded_at: issue_date,
        previewUrl: policy_description.gst_certificate_url || policy_description.gst_certificate,
        status: "ATTACHED",
        policy_id,
        customer_id,
      });
    }
    if (policy_description.medical_report_url || policy_description.medical_report) {
      policyAttachedDocs.push({
        id: "medical_report",
        db_table: DB_TABLES.POLICIES_POLICY,
        db_field: "medical_report_url",
        json_container: "policy_description",
        label: "Medical Health Report",
        name: "Medical_Report.pdf",
        type: "image",
        size: "1.5 MB",
        uploaded_at: issue_date,
        previewUrl: policy_description.medical_report_url || policy_description.medical_report,
        status: "ATTACHED",
        policy_id,
        customer_id,
      });
    }
  }

  return {
    id: p.id || policy_id,
    // Exact Database Columns (policies_policy)
    policy_id,
    customer_id,
    policy_name,
    category,
    sub_type,
    issue_date,
    expiry_date,
    premium_amount,
    status,
    policy_pdf_url,
    policy_description,
    payment_details,
    commission_details,
    created_at: p.created_at || "",
    updated_at: p.updated_at || "",
    created_by_id: p.created_by_id || null,
    updated_by_id: p.updated_by_id || null,

    // Aliases for UI components compatibility
    policyId: policy_id,
    customerId: customer_id,
    policyName: policy_name,
    subType: sub_type,
    issueDate: issue_date,
    expiryDate: expiry_date,
    price: premium_amount,
    policyDocPreviewUrl: policy_pdf_url,
    hasPolicyDoc: Boolean(policy_pdf_url),
    policyAttachedDocs,
  };
};

// Helper to normalize any customer record from Database / API (GET responses)
export const normalizeDatabaseCustomer = (c, associatedPolicies = []) => {
  const customer_id = c.customer_id || c.customerId || String(c.id || "");
  const name = c.name || c.customer_name || c.customerName || c.policyHolderName || "";
  const phone = c.phone || c.customer_phone || c.customerPhone || c.mobileNumber || "";
  const email = c.email || c.customer_email || c.customerEmail || "";
  const pan_no = c.pan_no || c.panNumber || "";
  const aadhar_no = c.aadhar_no || c.aadhaarNumber || "";
  const gst_no = c.gst_no || "";
  const date_of_birth = c.date_of_birth || c.dob || "";
  const gender = c.gender || "";
  const address = c.address || "";
  const city = c.city || "";
  const state = c.state || "";
  const pincode = c.pincode || c.pinCode || "";
  const user_id = c.user_id || null;
  const created_at = c.created_at || "";
  const updated_at = c.updated_at || "";

  // Auto-generate customerDocuments from DB columns if not explicitly provided
  let customerDocuments = c.customerDocuments || [];
  if (!customerDocuments || customerDocuments.length === 0) {
    customerDocuments = [
      {
        id: "pan_no",
        db_table: DB_TABLES.CUSTOMERS_CUSTOMER,
        db_field: "pan_no",
        file_field: "pan_card",
        label: "PAN Card",
        name: pan_no ? `PAN_${pan_no}.jpg` : "PAN_Card.jpg",
        type: "image",
        size: "1.2 MB",
        uploaded_at: created_at || new Date().toISOString(),
        previewUrl: c.pan_card_url || c.pan_card || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80",
        status: pan_no ? "ATTACHED" : "PENDING",
        customer_id,
      },
      {
        id: "aadhar_no",
        db_table: DB_TABLES.CUSTOMERS_CUSTOMER,
        db_field: "aadhar_no",
        file_field: "aadhar_card",
        label: "Aadhaar Card",
        name: aadhar_no ? `Aadhaar_${aadhar_no}.pdf` : "Aadhaar_Card.pdf",
        type: "image",
        size: "2.1 MB",
        uploaded_at: created_at || new Date().toISOString(),
        previewUrl: c.aadhar_card_url || c.aadhar_card || "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80",
        status: aadhar_no ? "ATTACHED" : "PENDING",
        customer_id,
      },
    ];
    if (gst_no) {
      customerDocuments.push({
        id: "gst_no",
        db_table: DB_TABLES.CUSTOMERS_CUSTOMER,
        db_field: "gst_no",
        file_field: "gst_certificate",
        label: "GST Certificate",
        name: `GSTIN_${gst_no}.pdf`,
        type: "image",
        size: "1.4 MB",
        uploaded_at: created_at || new Date().toISOString(),
        previewUrl: c.gst_certificate_url || c.gst_certificate || "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
        customer_id,
      });
    }
  }

  const rawPolicies = (c.policies && c.policies.length > 0) ? c.policies : associatedPolicies;
  const policies = rawPolicies.map(normalizeDatabasePolicy);

  return {
    id: c.id || customer_id,
    // Exact Database Columns (customers_customer & users_user)
    customer_id,
    user_id,
    name,
    phone,
    email,
    date_of_birth,
    gender,
    address,
    city,
    state,
    pincode,
    aadhar_no,
    pan_no,
    gst_no,
    created_at,
    updated_at,

    // Aliases for UI components compatibility
    customerId: customer_id,
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    customerDocuments,
    policies,
  };
};

// Helper to build FormData for POST / PUT matching exact database schema column names
// Used in Document Uploads, Updates, and Policy / Customer attachments
export const buildDocumentFormData = ({
  customer_id,
  policy_id,
  db_table,
  db_field,
  file,
  additional_data = {},
}) => {
  const formData = new FormData();

  // 1. Primary Database Foreign Keys
  if (customer_id) {
    formData.append("customer_id", customer_id);
    formData.append("customerId", customer_id);
  }
  if (policy_id) {
    formData.append("policy_id", policy_id);
    formData.append("policyId", policy_id);
  }

  // 2. Exact Database Table and Column Tracking
  if (db_table) formData.append("db_table", db_table);
  if (db_field) formData.append("db_field", db_field);

  // 3. Exact Database Column Field Mapping for the File
  if (db_field === "policy_pdf_url") {
    // Database column in policies_policy
    formData.append("policy_pdf_url", file);
    formData.append("policy_pdf", file); // Common DRF file serializer alias
    formData.append("policyDoc", file);
  } else if (db_field === "aadhar_no") {
    // Database column in customers_customer
    formData.append("aadhar_no", file?.name || "");
    formData.append("aadhar_card", file);
    formData.append("aadhar_file", file);
  } else if (db_field === "pan_no") {
    // Database column in customers_customer
    formData.append("pan_no", file?.name || "");
    formData.append("pan_card", file);
    formData.append("pan_file", file);
  } else if (db_field === "gst_no") {
    // Database column in customers_customer / policies_policy
    formData.append("gst_no", file?.name || "");
    formData.append("gst_certificate", file);
    formData.append("gst_file", file);
  } else if (db_field) {
    formData.append(db_field, file);
    const baseField = db_field.replace(/_url$/, "");
    if (baseField !== db_field) {
      formData.append(baseField, file);
    }
  } else {
    formData.append("document_file", file);
  }

  // 4. Any additional metadata (like description, user_id, etc.)
  Object.entries(additional_data).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      if (typeof val === "object" && !(val instanceof File) && !(val instanceof Blob)) {
        formData.append(key, JSON.stringify(val));
      } else {
        formData.append(key, val);
      }
    }
  });

  return formData;
};

// Initial Data with 100% Database Schema keys
export const INITIAL_CUSTOMER_DOCUMENTS_DATA = [
  {
    id: 1,
    customer_id: "CUST-101",
    customerId: "CUST-101",
    name: "Priya Mehta",
    customerName: "Priya Mehta",
    phone: "+91 98765 43210",
    customerPhone: "+91 98765 43210",
    email: "priya.mehta@example.com",
    customerEmail: "priya.mehta@example.com",
    pan_no: "ABCDE1234F",
    aadhar_no: "XXXX-XXXX-4821",
    gst_no: "",
    date_of_birth: "1988-08-14",
    gender: "Female",
    address: "Flat 402, Lotus Enclave",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    created_at: "2026-01-10T10:30:00Z",
    updated_at: "2026-01-10T10:30:00Z",
    customerDocuments: [
      {
        id: "pan_no",
        db_field: "pan_no",
        file_field: "pan_card",
        label: "PAN Card",
        name: "PAN_Card_Priya_Mehta.jpg",
        type: "image",
        size: "1.2 MB",
        uploaded_at: "2026-01-10T10:30:00Z",
        previewUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
      {
        id: "aadhar_no",
        db_field: "aadhar_no",
        file_field: "aadhar_card",
        label: "Aadhaar Card",
        name: "Aadhaar_Card_Priya_Mehta.pdf",
        type: "image",
        size: "2.1 MB",
        uploaded_at: "2026-01-10T10:32:00Z",
        previewUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
    ],
    policies: [
      {
        id: 101,
        policy_id: "POL-2026-001",
        policyId: "POL-2026-001",
        customer_id: "CUST-101",
        customerId: "CUST-101",
        policy_name: "Star Health Comprehensive",
        policyName: "Star Health Comprehensive",
        category: "Health Insurance",
        sub_type: "Family Floater",
        subType: "Family Floater",
        issue_date: "2026-01-15",
        issueDate: "2026-01-15",
        expiry_date: "2027-01-14",
        expiryDate: "2027-01-14",
        premium_amount: "25000.00",
        price: "25,000",
        status: "Active",
        policy_pdf_url: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=80",
        policyDocPreviewUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=80",
        hasPolicyDoc: true,
        created_at: "2026-01-15T11:00:00Z",
        updated_at: "2026-01-15T11:00:00Z",
        policy_description: {
          insurer: "Star Health",
          coverage: "Family Floater",
          medical_report_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80",
        },
        policyAttachedDocs: [
          {
            id: "medical_report",
            db_field: "policy_description.medical_report_url",
            label: "Medical Health Report",
            name: "Medical_Proposal_POL001.pdf",
            type: "image",
            size: "1.5 MB",
            uploaded_at: "2026-01-15T09:45:00Z",
            previewUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
        ],
      },
      {
        id: 102,
        policy_id: "POL-2026-002",
        policyId: "POL-2026-002",
        customer_id: "CUST-101",
        customerId: "CUST-101",
        policy_name: "HDFC ERGO Private Car",
        policyName: "HDFC ERGO Private Car",
        category: "Motor Insurance",
        sub_type: "Car",
        subType: "Car",
        issue_date: "2026-02-01",
        issueDate: "2026-02-01",
        expiry_date: "2027-01-31",
        expiryDate: "2027-01-31",
        premium_amount: "12200.00",
        price: "12,200",
        status: "Active",
        policy_pdf_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80",
        policyDocPreviewUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80",
        hasPolicyDoc: true,
        created_at: "2026-02-01T14:30:00Z",
        updated_at: "2026-02-01T14:30:00Z",
        policy_description: {
          insurer: "HDFC ERGO",
          vehicle_number: "MH02AB1234",
          vehicle_name: "Hyundai Creta",
          rc_file_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80",
          dl_file_url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80",
        },
        policyAttachedDocs: [
          {
            id: "rc_file",
            db_field: "policy_description.rc_file_url",
            label: "Registration Certificate (RC)",
            name: "MH02AB1234_RC_Book.pdf",
            type: "image",
            size: "1.8 MB",
            uploaded_at: "2026-02-01T12:15:00Z",
            previewUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
          {
            id: "dl_file",
            db_field: "policy_description.dl_file_url",
            label: "Driving License (DL)",
            name: "Driving_License_Priya.jpg",
            type: "image",
            size: "890 KB",
            uploaded_at: "2026-02-01T12:18:00Z",
            previewUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
        ],
      },
      {
        id: 103,
        policy_id: "POL-2024-003",
        policyId: "POL-2024-003",
        customer_id: "CUST-101",
        customerId: "CUST-101",
        policy_name: "ICICI Prudential iProtect",
        policyName: "ICICI Prudential iProtect",
        category: "Personal Insurance",
        sub_type: "Term Life",
        subType: "Term Life",
        issue_date: "2024-01-05",
        issueDate: "2024-01-05",
        expiry_date: "2026-01-04",
        expiryDate: "2026-01-04",
        premium_amount: "18000.00",
        price: "18,000",
        status: "Active",
        policy_pdf_url: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80",
        policyDocPreviewUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80",
        hasPolicyDoc: true,
        created_at: "2024-01-05T12:00:00Z",
        updated_at: "2024-01-05T12:00:00Z",
        policy_description: {
          insurer: "ICICI Prudential",
          coverage: "Term Life",
        },
        policyAttachedDocs: [
          {
            id: "nominee_form",
            db_field: "policy_description.nominee_form_url",
            label: "Nominee Form",
            name: "Nominee_Declaration.pdf",
            type: "image",
            size: "1.1 MB",
            uploaded_at: "2024-01-05T11:20:00Z",
            previewUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    customer_id: "CUST-102",
    customerId: "CUST-102",
    name: "Rahul Sharma",
    customerName: "Rahul Sharma",
    phone: "+91 91234 56789",
    customerPhone: "+91 91234 56789",
    email: "rahul.sharma@example.com",
    customerEmail: "rahul.sharma@example.com",
    pan_no: "BGHYP5678K",
    aadhar_no: "XXXX-XXXX-9123",
    gst_no: "",
    date_of_birth: "1992-04-12",
    gender: "Male",
    address: "B-12, Green Park",
    city: "Delhi",
    state: "Delhi",
    pincode: "110016",
    created_at: "2026-02-28T15:10:00Z",
    updated_at: "2026-02-28T15:10:00Z",
    customerDocuments: [
      {
        id: "pan_no",
        db_field: "pan_no",
        file_field: "pan_card",
        label: "PAN Card",
        name: "Rahul_Sharma_PAN.jpg",
        type: "image",
        size: "950 KB",
        uploaded_at: "2026-02-28T15:10:00Z",
        previewUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
      {
        id: "aadhar_no",
        db_field: "aadhar_no",
        file_field: "aadhar_card",
        label: "Aadhaar Card",
        name: "Rahul_Sharma_Aadhaar.pdf",
        type: "image",
        size: "1.9 MB",
        uploaded_at: "2026-02-28T15:15:00Z",
        previewUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
    ],
    policies: [
      {
        id: 104,
        policy_id: "POL-2026-004",
        policyId: "POL-2026-004",
        customer_id: "CUST-102",
        customerId: "CUST-102",
        policy_name: "Care Supreme Health",
        policyName: "Care Supreme Health",
        category: "Health Insurance",
        sub_type: "Individual",
        subType: "Individual",
        issue_date: "2026-03-01",
        issueDate: "2026-03-01",
        expiry_date: "2027-02-28",
        expiryDate: "2027-02-28",
        premium_amount: "14500.00",
        price: "14,500",
        status: "Review Required",
        policy_pdf_url: null, // PENDING ACTIVATION PDF in DB
        policyDocPreviewUrl: null,
        hasPolicyDoc: false,
        created_at: "2026-03-01T10:00:00Z",
        updated_at: "2026-03-01T10:00:00Z",
        policy_description: {
          insurer: "Care Health Insurance",
          coverage: "Individual Health",
        },
        policyAttachedDocs: [
          {
            id: "medical_disclosure",
            db_field: "policy_description.medical_disclosure_url",
            label: "Medical Health Questionnaire",
            name: "Medical_Disclosure_Care.pdf",
            type: "image",
            size: "1.3 MB",
            uploaded_at: "2026-03-01T10:00:00Z",
            previewUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    customer_id: "CUST-103",
    customerId: "CUST-103",
    name: "Ananya Verma",
    customerName: "Ananya Verma",
    phone: "+91 98111 22334",
    customerPhone: "+91 98111 22334",
    email: "ananya.v@example.com",
    customerEmail: "ananya.v@example.com",
    pan_no: "ANVPR8901L",
    aadhar_no: "XXXX-XXXX-3344",
    gst_no: "",
    date_of_birth: "1995-11-20",
    gender: "Female",
    address: "704, Skyline Towers",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",
    created_at: "2026-03-08T11:00:00Z",
    updated_at: "2026-03-08T11:00:00Z",
    customerDocuments: [
      {
        id: "pan_no",
        db_field: "pan_no",
        file_field: "pan_card",
        label: "PAN Card",
        name: "Ananya_Verma_PAN.jpg",
        type: "image",
        size: "1.4 MB",
        uploaded_at: "2026-03-08T11:00:00Z",
        previewUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
      {
        id: "aadhar_no",
        db_field: "aadhar_no",
        file_field: "aadhar_card",
        label: "Aadhaar Card",
        name: "Ananya_Verma_Aadhaar.pdf",
        type: "image",
        size: "2.3 MB",
        uploaded_at: "2026-03-08T11:05:00Z",
        previewUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
    ],
    policies: [
      {
        id: 105,
        policy_id: "POL-2026-005",
        policyId: "POL-2026-005",
        customer_id: "CUST-103",
        customerId: "CUST-103",
        policy_name: "Tata AIG Auto Secure",
        policyName: "Tata AIG Auto Secure",
        category: "Motor Insurance",
        sub_type: "Two Wheeler",
        subType: "Two Wheeler",
        issue_date: "2026-03-10",
        issueDate: "2026-03-10",
        expiry_date: "2027-03-09",
        expiryDate: "2027-03-09",
        premium_amount: "3800.00",
        price: "3,800",
        status: "Review Required",
        policy_pdf_url: null, // PENDING ACTIVATION PDF in DB
        policyDocPreviewUrl: null,
        hasPolicyDoc: false,
        created_at: "2026-03-10T10:15:00Z",
        updated_at: "2026-03-10T10:15:00Z",
        policy_description: {
          insurer: "Tata AIG",
          vehicle_number: "MH12AB9988",
          vehicle_name: "Honda Activa 6G",
        },
        policyAttachedDocs: [
          {
            id: "rc_file",
            db_field: "policy_description.rc_file_url",
            label: "Registration Certificate (RC)",
            name: "MH12_Bike_RC.pdf",
            type: "image",
            size: "1.2 MB",
            uploaded_at: "2026-03-10T10:15:00Z",
            previewUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
          {
            id: "dl_file",
            db_field: "policy_description.dl_file_url",
            label: "Driving License (DL)",
            name: "Ananya_Driving_License.jpg",
            type: "image",
            size: "720 KB",
            uploaded_at: "2026-03-10T10:20:00Z",
            previewUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    customer_id: "CUST-104",
    customerId: "CUST-104",
    name: "Vikram Mehta",
    customerName: "Vikram Mehta",
    phone: "+91 97654 32109",
    customerPhone: "+91 97654 32109",
    email: "vikram.m@business.com",
    customerEmail: "vikram.m@business.com",
    pan_no: "VKMPR3421M",
    aadhar_no: "XXXX-XXXX-7654",
    gst_no: "27AAACB1234F1Z5",
    date_of_birth: "1980-06-25",
    gender: "Male",
    address: "Plot 88, MIDC Industrial Area",
    city: "Thane",
    state: "Maharashtra",
    pincode: "400604",
    created_at: "2026-03-14T09:00:00Z",
    updated_at: "2026-03-14T09:00:00Z",
    customerDocuments: [
      {
        id: "pan_no",
        db_field: "pan_no",
        file_field: "pan_card",
        label: "PAN Card",
        name: "Vikram_Mehta_PAN.jpg",
        type: "image",
        size: "1.3 MB",
        uploaded_at: "2026-03-14T09:00:00Z",
        previewUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
      {
        id: "aadhar_no",
        db_field: "aadhar_no",
        file_field: "aadhar_card",
        label: "Aadhaar Card",
        name: "Vikram_Mehta_Aadhaar.pdf",
        type: "image",
        size: "2.0 MB",
        uploaded_at: "2026-03-14T09:05:00Z",
        previewUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
    ],
    policies: [
      {
        id: 106,
        policy_id: "POL-2026-006",
        policyId: "POL-2026-006",
        customer_id: "CUST-104",
        customerId: "CUST-104",
        policy_name: "Bajaj Allianz Commercial",
        policyName: "Bajaj Allianz Commercial",
        category: "Commercial",
        sub_type: "Commercial Vehicle",
        subType: "Commercial Vehicle",
        issue_date: "2026-03-15",
        issueDate: "2026-03-15",
        expiry_date: "2027-03-14",
        expiryDate: "2027-03-14",
        premium_amount: "32000.00",
        price: "32,000",
        status: "Active",
        policy_pdf_url: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80",
        policyDocPreviewUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&auto=format&fit=crop&q=80",
        hasPolicyDoc: true,
        created_at: "2026-03-15T16:45:00Z",
        updated_at: "2026-03-15T16:45:00Z",
        policy_description: {
          insurer: "Bajaj Allianz",
          gst_number: "27AAACB1234F1Z5",
          vehicle_number: "MH04CZ5544",
        },
        policyAttachedDocs: [
          {
            id: "gst_certificate",
            db_field: "policy_description.gst_certificate_url",
            label: "GST Certificate",
            name: "GSTIN_27AAACB1234F1Z5.pdf",
            type: "image",
            size: "1.4 MB",
            uploaded_at: "2026-03-15T11:00:00Z",
            previewUrl: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
          {
            id: "commercial_rc",
            db_field: "policy_description.rc_file_url",
            label: "Commercial Vehicle RC",
            name: "MH04_Truck_RC.pdf",
            type: "image",
            size: "1.9 MB",
            uploaded_at: "2026-03-15T11:15:00Z",
            previewUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    customer_id: "CUST-105",
    customerId: "CUST-105",
    name: "Sneha Gupta",
    customerName: "Sneha Gupta",
    phone: "+91 96333 44556",
    customerPhone: "+91 96333 44556",
    email: "sneha.gupta@example.com",
    customerEmail: "sneha.gupta@example.com",
    pan_no: "SNHPG1290P",
    aadhar_no: "XXXX-XXXX-4455",
    gst_no: "",
    date_of_birth: "1990-09-17",
    gender: "Female",
    address: "C-301, Palm Meadows",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560066",
    created_at: "2026-03-18T14:00:00Z",
    updated_at: "2026-03-18T14:00:00Z",
    customerDocuments: [
      {
        id: "pan_no",
        db_field: "pan_no",
        file_field: "pan_card",
        label: "PAN Card",
        name: "Sneha_Gupta_PAN.jpg",
        type: "image",
        size: "1.1 MB",
        uploaded_at: "2026-03-18T14:00:00Z",
        previewUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
      {
        id: "aadhar_no",
        db_field: "aadhar_no",
        file_field: "aadhar_card",
        label: "Aadhaar Card",
        name: "Sneha_Gupta_Aadhaar.pdf",
        type: "image",
        size: "2.4 MB",
        uploaded_at: "2026-03-18T14:05:00Z",
        previewUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=900&auto=format&fit=crop&q=80",
        status: "ATTACHED",
      },
    ],
    policies: [
      {
        id: 107,
        policy_id: "POL-2026-007",
        policyId: "POL-2026-007",
        customer_id: "CUST-105",
        customerId: "CUST-105",
        policy_name: "Niva Bupa ReAssure 2.0",
        policyName: "Niva Bupa ReAssure 2.0",
        category: "Health Insurance",
        sub_type: "Family Floater",
        subType: "Family Floater",
        issue_date: "2026-03-20",
        issueDate: "2026-03-20",
        expiry_date: "2027-03-19",
        expiryDate: "2027-03-19",
        premium_amount: "21500.00",
        price: "21,500",
        status: "Review Required",
        policy_pdf_url: null, // PENDING ACTIVATION PDF in DB
        policyDocPreviewUrl: null,
        hasPolicyDoc: false,
        created_at: "2026-03-20T10:00:00Z",
        updated_at: "2026-03-20T10:00:00Z",
        policy_description: {
          insurer: "Niva Bupa",
          coverage: "Family Floater",
        },
        policyAttachedDocs: [
          {
            id: "medical_report",
            db_field: "policy_description.medical_report_url",
            label: "Medical Health Report",
            name: "Medical_Report.pdf",
            type: "image",
            size: "2.6 MB",
            uploaded_at: "2026-03-20T10:00:00Z",
            previewUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80",
            status: "ATTACHED",
          },
        ],
      },
    ],
  },
];

// Main Customer-Centric Document Table Headers with 'title' for TableComponent
export const documentCustomerTableHeaders = [
  {
    title: "Customer Name",
    accessor: "customerName",
    type: "special",
  },
  {
    title: "Customer ID",
    accessor: "customerId",
    type: "special",
  },
  {
    title: "Remaining Documents",
    accessor: "remainingDocs",
    type: "special",
  },
  {
    title: "Activation PDF Check",
    accessor: "activationPdfCheck",
    type: "special",
  },
  {
    title: "Actions",
    accessor: "actions",
    type: "special",
  },
];
