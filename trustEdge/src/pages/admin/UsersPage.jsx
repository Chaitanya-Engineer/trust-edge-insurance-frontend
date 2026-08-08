import React, { useState, useEffect, useRef } from "react";
import {
  User,
  UserPlus,
  Calendar,
  Phone,
  Mail,
  CreditCard,
  Shield,
  Upload,
  Image as ImageIcon,
  PenTool,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Users,
  Search,
  Check,
  Loader2,
  Lock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  QrCode,
  Eye,
  Pencil
} from "lucide-react";

export default function UsersPage() {
  // ─── STATE MANAGEMENT ─────────────────────────────────────────
  const [view, setView] = useState("list"); // 'register' or 'list'
  const [editingId, setEditingId] = useState(null); // customer.id if editing, otherwise null
  const [viewingCustomer, setViewingCustomer] = useState(null); // customer object to display full profile detail
  const [filterVerification, setFilterVerification] = useState("All"); // 'All', 'Verified', 'Pending'
  const [drawerTab, setDrawerTab] = useState("overview"); // 'overview' or 'documents'
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, px: 0, py: 0, active: false });

  const handleZoomMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const x = (px / rect.width) * 100;
    const y = (py / rect.height) * 100;
    setZoomPos({ x, y, px, py, active: true });
  };

  // Track all generated object URLs to safely clean them up ONLY on component unmount
  const createdUrls = useRef([]);

  // Form fields state
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    countryCode: "+91",
    mobileNumber: "",
    emailAddress: "",
    panNumber: "",
    aadhaarNumber: "",
  });

  // Uploaded files metadata and preview state
  const [files, setFiles] = useState({
    photo: null,      // { name, size, preview, progress, status: 'empty'|'uploading'|'done' }
    signature: null,
    panCard: null,
    aadhaarCard: null,
  });

  // Validation / Error state
  const [errors, setErrors] = useState({});
  // Toast notifications
  const [toast, setToast] = useState(null);

  // Fullscreen save loader simulation states
  const [isSaving, setIsSaving] = useState(false);
  const [saveStep, setSaveStep] = useState(1); // 1: Encrypting, 2: Registering, 3: Success Done

  // Document Preview Modal State
  const [previewDoc, setPreviewDoc] = useState(null); // { customerName, docType, file, customerDetails }

  // Mock initial list of saved customers
  const [savedCustomers, setSavedCustomers] = useState([
    {
      id: 1,
      fullName: "Priya Mehta",
      dob: "1994-08-12",
      gender: "Female",
      mobileNumber: "+91 98765 43210",
      emailAddress: "priya.mehta@example.com",
      panNumber: "ABCDE1234F",
      aadhaarNumber: "5544 3322 1100",
      customerType: "Universal",
      verificationStatus: "Pending",
      status: "New",
      photo: { name: "priya_photo.jpg", preview: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80", status: "done" },
      signature: { name: "signature.png", preview: null, status: "done" },
      panCard: { name: "pan_card.pdf", preview: null, status: "done" },
      aadhaarCard: null
    },
    {
      id: 2,
      fullName: "Rahul Sharma",
      dob: "1988-11-23",
      gender: "Male",
      mobileNumber: "+91 91234 56789",
      emailAddress: "rahul.sharma@example.com",
      panNumber: "XYZAB5678Q",
      aadhaarNumber: "9988 7766 5544",
      customerType: "Universal",
      verificationStatus: "Verified",
      status: "Active",
      photo: { name: "rahul_photo.jpg", preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80", status: "done" },
      signature: { name: "rahul_sig.png", preview: null, status: "done" },
      panCard: { name: "rahul_pan.pdf", preview: null, status: "done" },
      aadhaarCard: { name: "rahul_aadhaar.pdf", preview: null, status: "done" }
    }
  ]);

  // Search filter for list view
  const [searchTerm, setSearchTerm] = useState("");



  // Clean up Object URLs to prevent memory leaks on unmount
  useEffect(() => {
    return () => {
      // Clean up all preview URLs recorded in createdUrls ref array
      createdUrls.current.forEach(url => {
        try {
          URL.revokeObjectURL(url);
        } catch (e) {
          console.error("Failed to revoke object URL:", e);
        }
      });
    };
  }, []);

  // Show temporary toast message
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ─── FILE UPLOAD LOADER SIMULATION ─────────────────────────────
  const handleFileUpload = (field, e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast(`${file.name} is too large. Max size is 5 MB.`, "error");
      return;
    }

    // Set initial uploading state
    let previewUrl = null;
    if (file.type.startsWith("image/") || file.name.match(/\.(png|jpe?g)$/i)) {
      previewUrl = URL.createObjectURL(file);
      createdUrls.current.push(previewUrl);
    } else if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      previewUrl = URL.createObjectURL(file);
      createdUrls.current.push(previewUrl);
    }

    setFiles(prev => ({
      ...prev,
      [field]: {
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        preview: previewUrl,
        isPdf: file.type === "application/pdf" || file.name.endsWith(".pdf"),
        progress: 0,
        status: "uploading"
      }
    }));

    // Simulate progress increments
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setFiles(prev => {
        if (!prev[field] || prev[field].status !== "uploading") {
          clearInterval(interval);
          return prev;
        }
        if (currentProgress >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            [field]: { ...prev[field], progress: 100, status: "done" }
          };
        }
        return {
          ...prev,
          [field]: { ...prev[field], progress: currentProgress }
        };
      });
    }, 150);
  };

  const handleRemoveFile = (field) => {
    if (files[field] && files[field].preview) {
      URL.revokeObjectURL(files[field].preview);
    }
    setFiles(prev => ({ ...prev, [field]: null }));
  };

  // ─── FORM VALIDATION HELPER ────────────────────────────────────
  const validateField = (name, value) => {
    let error = null;
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Full Name is required";
        }
        break;
      case "dob":
        if (!value) {
          error = "Date of Birth is required";
        }
        break;
      case "gender":
        if (!value) {
          error = "Gender is required";
        }
        break;
      case "mobileNumber":
        const cleanMobile = value.trim();
        if (!cleanMobile) {
          error = "Mobile Number is required";
        } else if (!/^\d{10}$/.test(cleanMobile)) {
          error = "Must be a valid 10-digit number";
        }
        break;
      case "emailAddress":
        const cleanEmail = value.trim();
        if (!cleanEmail) {
          error = "Email Address is required";
        } else if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
          error = "Must be a valid email address (e.g. priya@example.com)";
        }
        break;
      case "panNumber":
        const cleanPan = value.toUpperCase().trim();
        if (!cleanPan) {
          error = "PAN Number is required";
        } else if (cleanPan.length !== 10) {
          error = "PAN Number must be exactly 10 characters";
        } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(cleanPan)) {
          error = "Must be a valid PAN Card format (e.g. ABCDE1234F)";
        }
        break;
      case "aadhaarNumber":
        const cleanAadhaar = value.trim().replace(/\s/g, "");
        if (cleanAadhaar && !/^\d{12}$/.test(cleanAadhaar)) {
          error = "Aadhaar must be a 12-digit number";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // ─── FORM VALIDATION ───────────────────────────────────────────
  const validateForm = () => {
    const newErrors = {};

    // Validate fields using validation helper
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    // Mandatory document check
    if (!files.photo || files.photo.status !== "done") {
      newErrors.photo = "Passport photo upload is mandatory";
    }
    if (!files.signature || files.signature.status !== "done") {
      newErrors.signature = "Signature upload is mandatory";
    }
    if (!files.panCard || files.panCard.status !== "done") {
      newErrors.panCard = "PAN Card upload is mandatory";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── FORM HANDLERS ─────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let val = value;

    // Apply active input format filters
    if (name === "mobileNumber") {
      // Restrict input to digits only, limit to 10 characters
      val = value.replace(/\D/g, "").slice(0, 10);
    } else if (name === "panNumber") {
      // Convert to uppercase, restrict to alphanumeric, limit to 10 characters
      val = value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 10);
    } else if (name === "aadhaarNumber") {
      // Restrict input to digits only, limit to 12 characters
      val = value.replace(/\D/g, "").slice(0, 12);
    }

    setForm(prev => ({ ...prev, [name]: val }));
    
    // Clear errors live if the user corrects their input
    if (errors[name]) {
      const error = validateField(name, val);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSaveCustomer = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast("Please fill all mandatory fields and upload documents.", "error");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (editingId) {
      // Edit Mode: Update existing customer
      setSavedCustomers(prev =>
        prev.map(cust =>
          cust.id === editingId
            ? {
                ...cust,
                fullName: form.fullName,
                dob: form.dob,
                gender: form.gender,
                mobileNumber: `${form.countryCode} ${form.mobileNumber}`,
                emailAddress: form.emailAddress,
                panNumber: form.panNumber,
                aadhaarNumber: form.aadhaarNumber || "N/A",
                photo: files.photo ? { name: files.photo.name, preview: files.photo.preview, isPdf: files.photo.isPdf } : null,
                signature: files.signature ? { name: files.signature.name, preview: files.signature.preview, isPdf: files.signature.isPdf } : null,
                panCard: files.panCard ? { name: files.panCard.name, preview: files.panCard.preview, isPdf: files.panCard.isPdf } : null,
                aadhaarCard: files.aadhaarCard ? { name: files.aadhaarCard.name, preview: files.aadhaarCard.preview, isPdf: files.aadhaarCard.isPdf } : null,
              }
            : cust
        )
      );
      showToast("Customer updated successfully!");
    } else {
      // Create Mode: Register new customer
      const newCustomer = {
        id: Date.now(),
        fullName: form.fullName,
        dob: form.dob,
        gender: form.gender,
        mobileNumber: `${form.countryCode} ${form.mobileNumber}`,
        emailAddress: form.emailAddress,
        panNumber: form.panNumber,
        aadhaarNumber: form.aadhaarNumber || "N/A",
        customerType: "Universal",
        verificationStatus: "Pending",
        status: "New",
        photo: files.photo ? { name: files.photo.name, preview: files.photo.preview, isPdf: files.photo.isPdf } : null,
        signature: files.signature ? { name: files.signature.name, preview: files.signature.preview, isPdf: files.signature.isPdf } : null,
        panCard: files.panCard ? { name: files.panCard.name, preview: files.panCard.preview, isPdf: files.panCard.isPdf } : null,
        aadhaarCard: files.aadhaarCard ? { name: files.aadhaarCard.name, preview: files.aadhaarCard.preview, isPdf: files.aadhaarCard.isPdf } : null,
      };
      setSavedCustomers(prev => [newCustomer, ...prev]);
      showToast("New customer registered in database!");
    }

    setEditingId(null);

    // Reset states
    setForm({
      fullName: "",
      dob: "",
      gender: "",
      countryCode: "+91",
      mobileNumber: "",
      emailAddress: "",
      panNumber: "",
      aadhaarNumber: "",
    });
    setFiles({
      photo: null,
      signature: null,
      panCard: null,
      aadhaarCard: null,
    });
    setErrors({});

    // Redirect back to list
    setView("list");
  };

  const handleCancel = () => {
    setForm({
      fullName: "",
      dob: "",
      gender: "",
      countryCode: "+91",
      mobileNumber: "",
      emailAddress: "",
      panNumber: "",
      aadhaarNumber: "",
    });
    setFiles({
      photo: null,
      signature: null,
      panCard: null,
      aadhaarCard: null,
    });
    setErrors({});
    setEditingId(null);
    setView("list");
  };

  const handleEditClick = (customer) => {
    const mobileParts = customer.mobileNumber.split(" ");
    const code = mobileParts[0] || "+91";
    const num = mobileParts[1] || "";
    
    setForm({
      fullName: customer.fullName,
      dob: customer.dob,
      gender: customer.gender,
      countryCode: code,
      mobileNumber: num,
      emailAddress: customer.emailAddress,
      panNumber: customer.panNumber,
      aadhaarNumber: customer.aadhaarNumber === "N/A" ? "" : customer.aadhaarNumber,
    });

    setFiles({
      photo: customer.photo ? { ...customer.photo, status: "done" } : null,
      signature: customer.signature ? { ...customer.signature, status: "done" } : null,
      panCard: customer.panCard ? { ...customer.panCard, status: "done" } : null,
      aadhaarCard: customer.aadhaarCard ? { ...customer.aadhaarCard, status: "done" } : null,
    });

    setEditingId(customer.id);
    setView("register");
  };

  const handleDeleteClick = (customerId) => {
    if (window.confirm("Are you sure you want to delete this customer record?")) {
      setSavedCustomers(prev => prev.filter(c => c.id !== customerId));
      showToast("Customer record deleted from ledger.", "error");
    }
  };

  // Filtered customer list search and verification dropdown
  const filteredCustomers = savedCustomers.filter(cust => {
    const matchesSearch =
      cust.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.emailAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.mobileNumber.includes(searchTerm);
      
    const matchesVerification =
      filterVerification === "All" ||
      cust.verificationStatus === filterVerification;
      
    return matchesSearch && matchesVerification;
  });

  return (
    <div className="max-w-7xl mx-auto pb-24 relative animate-fadeInUp">

      {/* ── Toast Alert Notification ────────────────────────────── */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-xl border transition-all duration-300 transform animate-slideInFromRight ${toast.type === "error"
            ? "bg-red-50 border-red-200 text-red-700"
            : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
          {toast.type === "error" ? (
            <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 animate-scaleInSpring" />
          )}
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* ── Simulated Database Saving Modal Overlay ────────────── */}
      {isSaving && (
        <div className="fixed inset-0 bg-navy/95 backdrop-blur-lg z-50 flex flex-col items-center justify-center text-white transition-opacity duration-300">
          <div className="w-full max-w-sm p-8 text-center flex flex-col items-center gap-6 animate-scaleIn">

            {/* Spinning Icons */}
            <div className="relative flex items-center justify-center">
              {saveStep < 3 ? (
                <>
                  <div className="w-16 h-16 border-4 border-t-white border-white/20 rounded-full animate-spin" />
                  <Lock className="w-6 h-6 absolute text-white animate-pulse" />
                </>
              ) : (
                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-emerald-500/50">
                  <Check className="w-8 h-8 text-white stroke-[3px]" />
                </div>
              )}
            </div>

            {/* Stepped Text Notifications */}
            <div key={saveStep} className="space-y-2 animate-slideUpStep">
              <h3 className="text-lg font-bold tracking-tight">
                {saveStep === 1 && "Encrypting Personal Information"}
                {saveStep === 2 && "Registering Security Credentials"}
                {saveStep === 3 && "Registration Successful!"}
              </h3>
              <p className="text-xs text-slate-300 font-semibold max-w-xs leading-relaxed">
                {saveStep === 1 && "Applying SHA-256 block encryption to Aadhaar, PAN, and phone records."}
                {saveStep === 2 && "Publishing metadata tokens into TrustEdge ledger storage."}
                {saveStep === 3 && "Customer successfully saved. Returning to database directory."}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* ── Page Header & Toggle View button ───────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy leading-none tracking-tight">
            {view === "register" ? (
              <>
                New Customer <span className="text-gold">Registration</span>
              </>
            ) : (
              <>
                Registered <span className="text-gold">Members Directory</span>
              </>
            )}
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-2 max-w-xl font-medium">
            {view === "register"
              ? "Setup a new member. Fill in authenticated details and compile mandatory credentials."
              : "Search, audit, and preview secure records of your customer profiles."
            }
          </p>
        </div>

        <button
          onClick={() => setView(view === "register" ? "list" : "register")}
          className={`flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider px-5 py-3.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 self-start sm:self-auto ${
            view === "register"
              ? "border-2 border-navy text-navy hover:bg-navy hover:text-white"
              : "bg-gold hover:bg-gold-light text-navy shadow-gold/15"
          }`}
        >
          {view === "register" ? (
            <>
              <Users className="w-4 h-4" />
              View Customers Directory
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-gold-light fill-navy" />
              Register New Member
            </>
          )}
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════
          VIEW 1: REGISTER NEW MEMBER FORM (FULL WIDTH)
      ══════════════════════════════════════════════════════════ */}
      {view === "register" && (
        <div className="max-w-4xl mx-auto space-y-6 pb-32">

            {/* CARD 1: Personal Details Inputs */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy leading-none">Personal Details</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1.5 inline-block">
                    Provide verified customer identities
                  </span>
                </div>
              </div>

              {/* Input grid */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="e.g. Priya Mehta"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/20 text-sm font-medium text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${errors.fullName
                          ? "border-red-400 focus:ring-red-200/50"
                          : "border-slate-200/80 focus:ring-gold/20 focus:border-gold"
                        }`}
                    />
                  </div>
                  {errors.fullName && <p className="text-xs text-red-500 font-semibold">{errors.fullName}</p>}
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/20 text-sm font-medium text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${errors.dob
                          ? "border-red-400 focus:ring-red-200/50"
                          : "border-slate-200/80 focus:ring-gold/20 focus:border-gold"
                        }`}
                    />
                  </div>
                  {errors.dob && <p className="text-xs text-red-500 font-semibold">{errors.dob}</p>}
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border bg-slate-50/20 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 appearance-none ${errors.gender
                          ? "border-red-400 focus:ring-red-200/50"
                          : "border-slate-200/80 focus:ring-gold/20 focus:border-gold"
                        }`}
                    >
                      <option value="" disabled hidden>Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  {errors.gender && <p className="text-xs text-red-500 font-semibold">{errors.gender}</p>}
                </div>

                {/* Mobile Number */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="relative w-[100px] flex-shrink-0">
                      <select
                        name="countryCode"
                        value={form.countryCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 rounded-xl border border-slate-200/80 bg-slate-50/20 text-sm font-medium text-navy focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold focus:bg-white transition-all duration-200 appearance-none"
                      >
                        <option value="+91">IN +91</option>
                        <option value="+1">US +1</option>
                        <option value="+44">UK +44</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>

                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={form.mobileNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="98765 43210"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/20 text-sm font-medium text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${errors.mobileNumber
                            ? "border-red-400 focus:ring-red-200/50"
                            : "border-slate-200/80 focus:ring-gold/20 focus:border-gold"
                          }`}
                      />
                    </div>
                  </div>
                  {errors.mobileNumber && <p className="text-xs text-red-500 font-semibold">{errors.mobileNumber}</p>}
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      name="emailAddress"
                      value={form.emailAddress}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="priya@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/20 text-sm font-medium text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${errors.emailAddress
                          ? "border-red-400 focus:ring-red-200/50"
                          : "border-slate-200/80 focus:ring-gold/20 focus:border-gold"
                        }`}
                    />
                  </div>
                  {errors.emailAddress && <p className="text-xs text-red-500 font-semibold">{errors.emailAddress}</p>}
                </div>

                {/* PAN Number */}
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="panNumber"
                      value={form.panNumber}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="ABCDE1234F"
                      maxLength="10"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/20 text-sm font-medium text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${errors.panNumber
                          ? "border-red-400 focus:ring-red-200/50"
                          : "border-slate-200/80 focus:ring-gold/20 focus:border-gold"
                        }`}
                    />
                  </div>
                  {errors.panNumber && <p className="text-xs text-red-500 font-semibold">{errors.panNumber}</p>}
                </div>

                {/* Aadhaar Number */}
                <div className="col-span-1 md:col-span-2 space-y-2">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                    Aadhaar Number (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Shield className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      name="aadhaarNumber"
                      value={form.aadhaarNumber}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="XXXX XXXX XXXX (Optional)"
                      maxLength="12"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50/20 text-sm font-medium text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:bg-white transition-all duration-200 ${errors.aadhaarNumber
                          ? "border-red-400 focus:ring-red-200/50"
                          : "border-slate-200/80 focus:ring-gold/20 focus:border-gold"
                        }`}
                    />
                  </div>
                  {errors.aadhaarNumber && <p className="text-xs text-red-500 font-semibold">{errors.aadhaarNumber}</p>}
                </div>

              </div>
            </div>

            {/* CARD 2: Upload Documents Slots */}
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_10px_35px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-5 border-b border-slate-100">
                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-navy leading-none">Upload Documents</h3>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1.5 inline-block">
                    Max size per document: 5 MB
                  </span>
                </div>
              </div>

              {/* Uploads grid */}
              <div className="p-6 md:p-8 grid grid-cols-1 gap-6">

                {/* 1. Passport Photo */}
                <div className="flex flex-col border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden border-t-4 border-t-navy transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between p-4 bg-slate-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-navy/5 text-navy rounded-lg flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy leading-none">Passport Photo <span className="text-red-500">*</span></h4>
                        <span className="text-[9px] text-gray-400 font-bold mt-1 inline-block uppercase">JPG, PNG</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-center min-h-[140px]">
                    {!files.photo ? (
                      <label className={`group border-2 border-dashed border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50/50 hover:border-navy transition-all duration-300 text-center ${errors.photo ? "border-red-200 bg-red-50/10" : ""}`}>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload("photo", e)}
                          className="hidden"
                        />
                        <Upload className="w-5 h-5 text-navy mb-1.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                        <span className="text-[10px] font-bold text-navy bg-navy/5 px-2.5 py-1.5 rounded-lg border border-navy/10 transition-all duration-300 group-hover:bg-navy group-hover:text-white">Browse Photo</span>
                      </label>
                    ) : files.photo.status === "uploading" ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="flex items-center justify-between text-xs font-bold text-navy">
                          <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 text-navy animate-spin" /> Uploading...</span>
                          <span>{files.photo.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-navy transition-all duration-150" style={{ width: `${files.photo.progress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center justify-between animate-scaleIn">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 animate-scaleInSpring" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-navy truncate leading-snug">{files.photo.name}</p>
                            <span className="text-[9px] font-semibold text-slate-400">{files.photo.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile("photo")}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {errors.photo && <p className="text-[10px] text-red-500 font-bold mt-2 text-center">{errors.photo}</p>}
                  </div>
                </div>

                {/* 2. PAN Card */}
                <div className="flex flex-col border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden border-t-4 border-t-navy transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between p-4 bg-slate-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-navy/5 text-navy rounded-lg flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy leading-none">PAN Card Copy <span className="text-red-500">*</span></h4>
                        <span className="text-[9px] text-gray-400 font-bold mt-1 inline-block uppercase">PDF, JPG, PNG</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-center min-h-[140px]">
                    {!files.panCard ? (
                      <label className={`group border-2 border-dashed border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50/50 hover:border-navy transition-all duration-300 text-center ${errors.panCard ? "border-red-200 bg-red-50/10" : ""}`}>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileUpload("panCard", e)}
                          className="hidden"
                        />
                        <Upload className="w-5 h-5 text-navy mb-1.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                        <span className="text-[10px] font-bold text-navy bg-navy/5 px-2.5 py-1.5 rounded-lg border border-navy/10 transition-all duration-300 group-hover:bg-navy group-hover:text-white">Browse File</span>
                      </label>
                    ) : files.panCard.status === "uploading" ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="flex items-center justify-between text-xs font-bold text-navy">
                          <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 text-navy animate-spin" /> Uploading...</span>
                          <span>{files.panCard.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-navy transition-all duration-150" style={{ width: `${files.panCard.progress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center justify-between animate-scaleIn">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 animate-scaleInSpring" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-navy truncate leading-snug">{files.panCard.name}</p>
                            <span className="text-[9px] font-semibold text-slate-400">{files.panCard.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile("panCard")}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {errors.panCard && <p className="text-[10px] text-red-500 font-bold mt-2 text-center">{errors.panCard}</p>}
                  </div>
                </div>

                {/* 3. Signature */}
                <div className="flex flex-col border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden border-t-4 border-t-gold transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between p-4 bg-slate-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gold/10 text-gold rounded-lg flex items-center justify-center flex-shrink-0">
                        <PenTool className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy leading-none">Signature Scan <span className="text-red-500">*</span></h4>
                        <span className="text-[9px] text-gray-400 font-bold mt-1 inline-block uppercase">JPG, PNG</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-center min-h-[140px]">
                    {!files.signature ? (
                      <label className={`group border-2 border-dashed border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50/50 hover:border-gold transition-all duration-300 text-center ${errors.signature ? "border-red-200 bg-red-50/10" : ""}`}>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload("signature", e)}
                          className="hidden"
                        />
                        <Upload className="w-5 h-5 text-gold mb-1.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                        <span className="text-[10px] font-bold text-gold bg-gold/10 px-2.5 py-1.5 rounded-lg border border-gold/20 transition-all duration-300 group-hover:bg-gold group-hover:text-navy">Browse Image</span>
                      </label>
                    ) : files.signature.status === "uploading" ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="flex items-center justify-between text-xs font-bold text-navy">
                          <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 text-gold animate-spin" /> Uploading...</span>
                          <span>{files.signature.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-gold transition-all duration-150" style={{ width: `${files.signature.progress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center justify-between animate-scaleIn">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 animate-scaleInSpring" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-navy truncate leading-snug">{files.signature.name}</p>
                            <span className="text-[9px] font-semibold text-slate-400">{files.signature.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile("signature")}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {errors.signature && <p className="text-[10px] text-red-500 font-bold mt-2 text-center">{errors.signature}</p>}
                  </div>
                </div>

                {/* 4. Aadhaar Card */}
                <div className="flex flex-col border border-slate-100 rounded-2xl bg-white shadow-sm overflow-hidden border-t-4 border-t-green-brand transition-all duration-300 hover:shadow-md">
                  <div className="flex items-center justify-between p-4 bg-slate-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-brand/10 text-green-brand rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy leading-none">Aadhaar Card Copy</h4>
                        <span className="text-[9px] text-gray-400 font-bold mt-1 inline-block uppercase">PDF, JPG, PNG</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-center min-h-[140px]">
                    {!files.aadhaarCard ? (
                      <label className="group border-2 border-dashed border-slate-200/60 rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50/50 hover:border-green-brand transition-all duration-300 text-center">
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileUpload("aadhaarCard", e)}
                          className="hidden"
                        />
                        <Upload className="w-5 h-5 text-green-brand mb-1.5 transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                        <span className="text-[10px] font-bold text-green-brand bg-green-brand/10 px-2.5 py-1.5 rounded-lg border border-green-brand/20 transition-all duration-300 group-hover:bg-green-brand group-hover:text-white">Browse File</span>
                      </label>
                    ) : files.aadhaarCard.status === "uploading" ? (
                      <div className="space-y-2 animate-pulse">
                        <div className="flex items-center justify-between text-xs font-bold text-navy">
                          <span className="flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 text-green-brand animate-spin" /> Uploading...</span>
                          <span>{files.aadhaarCard.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-green-brand transition-all duration-150" style={{ width: `${files.aadhaarCard.progress}%` }} />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-150 rounded-xl p-3 flex items-center justify-between animate-scaleIn">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 animate-scaleInSpring" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-navy truncate leading-snug">{files.aadhaarCard.name}</p>
                            <span className="text-[9px] font-semibold text-slate-400">{files.aadhaarCard.size}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveFile("aadhaarCard")}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* ── CUSTOMER SUMMARY ─────────────────────────────────── */}
            <div className="mt-8 text-left">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Customer Summary
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* 1. Customer Type Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Customer Type</span>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100 font-extrabold text-[10px] uppercase mt-1">
                      Universal
                    </span>
                  </div>
                </div>

                {/* 2. Identity Verification Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.7" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Identity Verification</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-md font-extrabold text-[10px] uppercase mt-1 ${
                      editingId 
                        ? (savedCustomers.find(c => c.id === editingId)?.verificationStatus === "Verified"
                            ? "bg-green-brand/10 text-green-brand border border-green-brand/20"
                            : "bg-amber-50 text-amber-500 border border-amber-100")
                        : "bg-amber-50 text-amber-500 border border-amber-100"
                    }`}>
                      {editingId 
                        ? (savedCustomers.find(c => c.id === editingId)?.verificationStatus || "Pending")
                        : "Pending"
                      }
                    </span>
                  </div>
                </div>

                {/* 3. Registration Status Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-500 font-bold text-xs uppercase tracking-wider">
                    New
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Registration Status</span>
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-500 border border-blue-100 font-extrabold text-[10px] uppercase mt-1">
                      {editingId ? "Active" : "New"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* STICKY BOTTOM ACTION BAR (Floating Card UI Match) */}
            <div className="fixed bottom-6 left-6 right-6 lg:left-[280px] bg-white border border-slate-200/80 px-6 py-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-md">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-[11px] font-medium text-slate-400">Data is encrypted and stored securely</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors text-center"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleSaveCustomer}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-4 h-4 text-white" />
                  Save Customer
                </button>
              </div>
            </div>

        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          VIEW 2: REGISTERED MEMBERS DIRECTORY
      ══════════════════════════════════════════════════════════ */}
      {view === "list" && (
        <div className="space-y-4">

          {/* Filtering bar */}
          <div className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col sm:flex-row gap-3 items-center justify-between shadow-[0_5px_20px_rgba(0,0,0,0.01)]">
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-stretch sm:items-center">
              
              {/* Search Input */}
              <div className="relative w-full sm:w-64">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search registered members..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/20 text-xs font-semibold text-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold focus:bg-white transition-all duration-200"
                />
              </div>

              {/* Verification Status Filter */}
              <div className="relative w-full sm:w-44">
                <select
                  value={filterVerification}
                  onChange={(e) => setFilterVerification(e.target.value)}
                  className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-slate-200 bg-slate-50/20 text-xs font-bold text-navy focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold focus:bg-white transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="All">All Verification</option>
                  <option value="Verified">Verified Only</option>
                  <option value="Pending">Pending Only</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-navy/40">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

            </div>
            
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              {filteredCustomers.length} Member records
            </span>
          </div>

          {/* Registered Customers Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.01)] overflow-hidden">
            {filteredCustomers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 font-bold text-sm">
                No matching members found in ledger database.
              </div>
            ) : (
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/75 border-b border-slate-200/80">
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Member</th>
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">DOB & Gender</th>
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Contact</th>
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">PAN ID</th>
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Verification</th>
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Status</th>
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Documents</th>
                      <th className="px-6 py-4 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredCustomers.map((customer) => (
                      <tr 
                        key={customer.id}
                        className="hover:bg-slate-50/40 transition-colors animate-fadeIn"
                      >
                        {/* Member */}
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <div 
                            onClick={() => { setViewingCustomer(customer); setDrawerTab("overview"); }}
                            className="cursor-pointer group/member inline-block"
                            title="Click to view customer profile"
                          >
                            <div className="text-sm font-extrabold text-navy group-hover/member:text-gold transition-colors">{customer.fullName}</div>
                            <div className="text-xs text-slate-400 font-semibold group-hover/member:text-navy/75 transition-colors">{customer.emailAddress}</div>
                          </div>
                        </td>

                        {/* DOB & Gender */}
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <div className="text-xs font-bold text-navy">{customer.dob}</div>
                          <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{customer.gender}</div>
                        </td>

                        {/* Contact */}
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <span className="text-xs font-bold text-navy">{customer.mobileNumber}</span>
                        </td>

                        {/* PAN ID */}
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <span className="text-xs font-mono font-bold text-navy uppercase bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg">
                            {customer.panNumber}
                          </span>
                        </td>

                        {/* Verification */}
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <span className={`px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider rounded-lg border ${
                            customer.verificationStatus === "Verified"
                              ? "bg-green-brand/10 text-green-brand border-green-brand/20"
                              : "bg-gold/10 text-gold border-gold/20"
                          }`}>
                            {customer.verificationStatus}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <div className="flex gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-600 border border-purple-100 font-bold text-[9px] uppercase tracking-wide">
                              {customer.customerType}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[9px] uppercase tracking-wide">
                              {customer.status}
                            </span>
                          </div>
                        </td>

                        {/* Documents */}
                        <td className="px-6 py-4 align-middle whitespace-nowrap">
                          <div className="flex gap-1.5 items-center">
                            {customer.photo && (
                              <button
                                onClick={() => setPreviewDoc({ customerName: customer.fullName, docType: "Passport Photo", file: customer.photo, customerDetails: customer })}
                                className="px-2.5 py-1 rounded-lg bg-navy/5 text-navy border border-navy/10 hover:bg-navy hover:text-white transition-colors text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-sm"
                              >
                                <ImageIcon className="w-3.5 h-3.5 text-navy" />
                                Photo
                              </button>
                            )}
                            {customer.signature && (
                              <button
                                onClick={() => setPreviewDoc({ customerName: customer.fullName, docType: "Signature", file: customer.signature, customerDetails: customer })}
                                className="px-2.5 py-1 rounded-lg bg-gold/10 text-gold border border-gold/20 hover:bg-gold hover:text-navy transition-colors text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-sm"
                              >
                                <PenTool className="w-3.5 h-3.5 text-gold" />
                                Sign
                              </button>
                            )}
                            {customer.panCard && (
                              <button
                                onClick={() => setPreviewDoc({ customerName: customer.fullName, docType: "PAN Card", file: customer.panCard, customerDetails: customer })}
                                className="px-2.5 py-1 rounded-lg bg-navy/5 text-navy border border-navy/10 hover:bg-navy hover:text-white transition-colors text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-sm"
                              >
                                <FileText className="w-3.5 h-3.5 text-navy" />
                                PAN
                              </button>
                            )}
                            {customer.aadhaarCard && (
                              <button
                                onClick={() => setPreviewDoc({ customerName: customer.fullName, docType: "Aadhaar Card", file: customer.aadhaarCard, customerDetails: customer })}
                                className="px-2.5 py-1 rounded-lg bg-green-brand/10 text-green-brand border border-green-brand/20 hover:bg-green-brand hover:text-white transition-colors text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-sm"
                              >
                                <ShieldCheck className="w-3.5 h-3.5 text-green-brand" />
                                Aadhaar
                              </button>
                            )}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 align-middle text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleEditClick(customer)}
                              className="p-2 bg-gold/10 text-gold border border-gold/25 rounded-xl hover:bg-gold hover:text-navy transition-all shadow-sm flex items-center justify-center"
                              title="Edit Profile"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(customer.id)}
                              className="p-2 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center justify-center"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Horizontal Scroll Helper Banner (Visible on Mobile/Tablet) */}
            <div className="lg:hidden mt-3 px-4 py-2.5 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between text-slate-500 shadow-sm animate-pulse">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-navy flex items-center gap-2">
                  <span className="text-navy">Swipe ↔</span> to view Actions & Documents
                </span>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Scroll Right</span>
            </div>

          </div>
        </div>
      )}

      {/* ── DOCUMENT PREVIEW MODAL OVERLAY ─────────────────────── */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-900/5 backdrop-blur-[3px] z-50 flex items-center justify-center p-4 transition-all duration-300">
          <div className="bg-white rounded-[24px] p-6 shadow-2xl max-w-md w-full border border-slate-100 animate-scaleInSpring relative text-center overflow-hidden">
            
            {/* Close Button */}
            <button
              onClick={() => setPreviewDoc(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="mb-6 text-left border-b border-slate-100 pb-3 pr-8 relative z-10 bg-white">
              <h3 className="text-sm font-bold text-navy leading-none">
                {previewDoc.customerName}
              </h3>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5 inline-block">
                Document Preview: {previewDoc.docType}
              </span>
            </div>

            {/* Modal Body: Rendering previews based on type */}
            <div className="min-h-[220px] flex items-center justify-center relative overflow-hidden rounded-xl border border-slate-100/80 bg-slate-50/20 p-2">
              
              {/* A. Image / PDF Render (Actual dynamic preview) */}
              {previewDoc.file.preview && (
                <div className="w-full">
                  {previewDoc.file.isPdf ? (
                    <iframe
                      src={previewDoc.file.preview}
                      title={previewDoc.file.name}
                      className="w-full h-[320px] rounded-xl border border-slate-200 shadow-inner"
                    />
                  ) : (
                    <div 
                      className="overflow-hidden rounded-xl bg-white shadow-sm max-h-[280px] max-w-full cursor-zoom-in relative mx-auto flex items-center justify-center border border-slate-100/50"
                      onMouseMove={handleZoomMouseMove}
                      onMouseLeave={() => setZoomPos(prev => ({ ...prev, active: false }))}
                    >
                      <img
                        src={previewDoc.file.preview}
                        alt={previewDoc.docType}
                        className="max-h-[280px] object-contain rounded-xl mx-auto"
                      />

                      {/* Circular Magnifying Glass Lens Overlay */}
                      {zoomPos.active && (
                        <div
                          className="w-36 h-36 rounded-full border-2 border-gold absolute pointer-events-none z-30 bg-white"
                          style={{
                            left: `${zoomPos.px - 72}px`,
                            top: `${zoomPos.py - 72}px`,
                            backgroundImage: `url(${previewDoc.file.preview})`,
                            backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                            backgroundSize: '300%', // 3x magnification inside circle
                            backgroundRepeat: 'no-repeat',
                            boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.15), 0 8px 30px rgba(0, 0, 0, 0.25)', // slight dim overlay outside lens
                          }}
                        />
                      )}
                    </div>
                  )}
                  <p className="text-[10px] text-slate-400 font-semibold mt-3 italic">{previewDoc.file.name}</p>
                </div>
              )}

              {/* B. Mock PAN Card (HTML Smartcard design) */}
              {previewDoc.docType === "PAN Card" && !previewDoc.file.preview && (
                <div 
                  className="w-full max-w-sm mx-auto bg-gradient-to-br from-navy via-[#0f2e54] to-slate-900 text-white rounded-2xl p-5 shadow-lg border border-white/10 relative overflow-hidden text-left transform transition-transform duration-100 ease-out cursor-zoom-in"
                  onMouseMove={handleZoomMouseMove}
                  onMouseLeave={() => setZoomPos(prev => ({ ...prev, active: false }))}
                  style={{
                    transformOrigin: zoomPos.active ? `${zoomPos.x}% ${zoomPos.y}%` : "center",
                    transform: zoomPos.active ? "scale(2.2)" : "scale(1)"
                  }}
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gold/15 rounded-full blur-[20px]" />
                  <div className="flex justify-between items-start border-b border-white/10 pb-2 mb-3">
                    <div>
                      <h4 className="text-[9px] font-extrabold text-amber-400 tracking-wider">INCOME TAX DEPARTMENT</h4>
                      <span className="text-[7px] text-slate-300 font-bold">GOVERNMENT OF INDIA</span>
                    </div>
                    <span className="text-[8px] font-extrabold uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">PAN</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[9px] pt-1">
                    <div>
                      <span className="block text-[7px] text-slate-500 font-bold uppercase">Name</span>
                      <span className="font-extrabold text-white uppercase">{previewDoc.customerName}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-slate-500 font-bold uppercase">PAN No.</span>
                      <span className="font-mono font-bold text-emerald-400 tracking-wider uppercase text-[10px]">{previewDoc.customerDetails?.panNumber}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-slate-500 font-bold uppercase">Date of Birth</span>
                      <span className="font-bold text-white">{previewDoc.customerDetails?.dob}</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-slate-500 font-bold uppercase">Secure Verify</span>
                      <span className="text-[8px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Ledger Active
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-3 mt-3">
                    <div className="h-4 w-16 bg-white/10 rounded flex items-center justify-center text-[6px] text-slate-400 font-bold uppercase tracking-wider">SECURE CHIP</div>
                    <span className="font-serif italic text-xs text-amber-300/80 pr-2 select-none">{previewDoc.customerName}</span>
                  </div>
                </div>
              )}

              {/* C. Mock Aadhaar Card */}
              {previewDoc.docType === "Aadhaar Card" && !previewDoc.file.preview && (
                <div 
                  className="w-full max-w-sm mx-auto bg-white text-slate-800 rounded-2xl p-5 shadow-lg border border-slate-200/80 relative text-left font-sans transform transition-transform duration-100 ease-out cursor-zoom-in"
                  onMouseMove={handleZoomMouseMove}
                  onMouseLeave={() => setZoomPos(prev => ({ ...prev, active: false }))}
                  style={{
                    transformOrigin: zoomPos.active ? `${zoomPos.x}% ${zoomPos.y}%` : "center",
                    transform: zoomPos.active ? "scale(2.2)" : "scale(1)"
                  }}
                >
                  <div className="flex justify-between items-center border-b border-slate-100 pb-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px] font-bold">A</div>
                      <div>
                        <h4 className="text-[9px] font-bold text-slate-900 leading-none">Government of India</h4>
                        <span className="text-[7px] text-slate-500 font-semibold">Unique Identification Authority of India</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-14 h-16 bg-slate-100 rounded border border-slate-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {previewDoc.customerDetails?.photo && previewDoc.customerDetails.photo.preview ? (
                        <img src={previewDoc.customerDetails.photo.preview} alt="Aadhaar Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div className="space-y-1.5 text-[9px] pt-0.5">
                      <div>
                        <span className="block text-[7px] text-slate-400 font-bold uppercase">Name</span>
                        <span className="font-bold text-navy uppercase">{previewDoc.customerName}</span>
                      </div>
                      <div>
                        <span className="block text-[7px] text-slate-400 font-bold uppercase">DOB / Gender</span>
                        <span className="font-semibold text-slate-700">{previewDoc.customerDetails?.dob} | {previewDoc.customerDetails?.gender}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-2.5 mt-3 text-center font-sans">
                    <p className="text-xs font-bold text-red-600 tracking-[3px] font-mono leading-none">
                      {previewDoc.customerDetails?.aadhaarNumber || "XXXX XXXX XXXX"}
                    </p>
                    <span className="text-[7px] text-slate-400 font-bold uppercase tracking-wider block mt-1">Mera Aadhaar, Meri Pehchaan</span>
                  </div>
                </div>
              )}

              {/* D. Signature Scan */}
              {previewDoc.docType === "Signature" && !previewDoc.file.preview && (
                <div 
                  className="w-full border border-dashed border-slate-200 rounded-xl bg-slate-50/50 p-6 flex flex-col items-center justify-center min-h-[140px] select-none transform transition-transform duration-100 ease-out cursor-zoom-in"
                  onMouseMove={handleZoomMouseMove}
                  onMouseLeave={() => setZoomPos(prev => ({ ...prev, active: false }))}
                  style={{
                    transformOrigin: zoomPos.active ? `${zoomPos.x}% ${zoomPos.y}%` : "center",
                    transform: zoomPos.active ? "scale(2.2)" : "scale(1)"
                  }}
                >
                  <span className="font-serif italic text-3xl text-slate-600/80 tracking-widest pl-2">
                    {previewDoc.customerName}
                  </span>
                  <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-4">Verified digital signature mark</span>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 text-right relative z-10 bg-white">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-5 py-2.5 bg-navy hover:bg-navy-light text-white text-xs font-bold rounded-xl transition-colors uppercase tracking-wider"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ── PREMIUM INTERACTIVE PROFILE POPUP MODAL (Backdrop Blur) ── */}
      {viewingCustomer && (
        <div className="fixed inset-0 bg-slate-900/5 backdrop-blur-[3px] z-50 flex items-center justify-center p-4 transition-all duration-300">
          
          {/* Modal Container */}
          <div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl max-w-lg w-full border border-slate-100/80 animate-scaleInSpring relative text-left overflow-hidden">
            
            {/* Background Gold Accent Ring */}
            <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full border-[10px] border-gold/10 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setViewingCustomer(null)}
              className="absolute top-5 right-5 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header: Profile Card with Navy gradient badge */}
            <div className="flex items-center gap-5 border-b border-slate-100 pb-5 mb-5 pr-8">
              <div className="w-18 h-18 rounded-2xl border-2 border-navy/10 overflow-hidden bg-slate-50 flex items-center justify-center shadow-inner relative flex-shrink-0 group">
                {viewingCustomer.photo && viewingCustomer.photo.preview ? (
                  <img
                    src={viewingCustomer.photo.preview}
                    alt={viewingCustomer.fullName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <User className="w-9 h-9 text-navy/30" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy leading-none tracking-tight">
                  {viewingCustomer.fullName}
                </h3>
                <span className="text-xs text-slate-400 font-semibold mt-2 inline-block">
                  {viewingCustomer.emailAddress}
                </span>
                <div className="flex gap-2 mt-3">
                  <span className={`px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider rounded-md border ${
                    viewingCustomer.verificationStatus === "Verified"
                      ? "bg-green-brand/10 text-green-brand border-green-brand/20"
                      : "bg-gold/10 text-gold border-gold/25"
                  }`}>
                    {viewingCustomer.verificationStatus}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-bold text-[9px] uppercase tracking-wide">
                    {viewingCustomer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Segmented Tabs Navigation inside popup */}
            <div className="flex border-b border-slate-100 bg-slate-50/50 p-1.5 rounded-xl mb-5 flex-shrink-0">
              <button
                onClick={() => setDrawerTab("overview")}
                className={`flex-1 py-2 px-3 text-center text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  drawerTab === "overview"
                    ? "bg-white text-navy shadow-sm border border-slate-200/50"
                    : "text-slate-400 hover:text-navy"
                }`}
              >
                Customer Info
              </button>
              <button
                onClick={() => setDrawerTab("documents")}
                className={`flex-1 py-2 px-3 text-center text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  drawerTab === "documents"
                    ? "bg-white text-navy shadow-sm border border-slate-200/50"
                    : "text-slate-400 hover:text-navy"
                }`}
              >
                Verified Credentials
              </button>
            </div>

            {/* Modal Body Contents */}
            <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1 no-scrollbar text-left">
              {drawerTab === "overview" && (
                <div className="space-y-4">
                  {/* PAN ID Copy block */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group overflow-hidden">
                    <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">PAN ID Number (Click to copy)</span>
                    <div
                      onClick={() => {
                        navigator.clipboard.writeText(viewingCustomer.panNumber);
                        showToast("PAN ID copied to clipboard!");
                      }}
                      className="font-mono font-bold text-navy text-sm mt-1.5 uppercase cursor-pointer hover:text-gold transition-colors flex items-center justify-between"
                    >
                      {viewingCustomer.panNumber}
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-gold font-sans font-bold uppercase tracking-wider">Copy</span>
                    </div>
                  </div>

                  {/* Personal Grid Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-100/80 bg-white">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Date of Birth</span>
                      <span className="font-bold text-navy text-xs mt-1 block">{viewingCustomer.dob}</span>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-100/80 bg-white">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Gender</span>
                      <span className="font-bold text-navy text-xs mt-1 block">{viewingCustomer.gender}</span>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-100/80 bg-white col-span-2">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Mobile Contact</span>
                      <span className="font-bold text-navy text-xs mt-1 block">{viewingCustomer.mobileNumber}</span>
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-100/80 bg-white col-span-2">
                      <span className="block text-[9px] text-slate-400 font-bold uppercase tracking-wider">Aadhaar Card Number</span>
                      <span className="font-bold text-navy text-xs mt-1 block">{viewingCustomer.aadhaarNumber || "N/A"}</span>
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "documents" && (
                <div className="space-y-3">
                  {[
                    { key: "photo", label: "Passport Photo", icon: ImageIcon, doc: viewingCustomer.photo },
                    { key: "panCard", label: "PAN Card Copy", icon: FileText, doc: viewingCustomer.panCard },
                    { key: "signature", label: "Signature Scan", icon: PenTool, doc: viewingCustomer.signature },
                    { key: "aadhaarCard", label: "Aadhaar Card Copy", icon: ShieldCheck, doc: viewingCustomer.aadhaarCard }
                  ].map(item => {
                    if (!item.doc) return null;
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-navy/5 text-navy flex items-center justify-center">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-navy leading-none">{item.label}</h5>
                            <p className="text-[9px] text-slate-400 font-semibold mt-1 max-w-[180px] truncate">{item.doc.name}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            setPreviewDoc({
                              customerName: viewingCustomer.fullName,
                              docType: item.label,
                              file: item.doc,
                              customerDetails: viewingCustomer
                            });
                            setViewingCustomer(null);
                          }}
                          className="px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider rounded-lg bg-gold hover:bg-gold-light text-navy transition-colors"
                        >
                          Inspect
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  handleEditClick(viewingCustomer);
                  setViewingCustomer(null);
                }}
                className="px-5 py-3 bg-gold hover:bg-gold-light text-navy text-xs font-extrabold uppercase tracking-wider rounded-xl transition-colors shadow-md hover:shadow-lg shadow-gold/15"
              >
                Edit Profile
              </button>
              <button
                onClick={() => setViewingCustomer(null)}
                className="px-5 py-3 bg-navy hover:bg-navy-light text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-colors shadow-md hover:shadow-lg"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
