import React, { useState, useEffect, useMemo } from "react";
import KPICard from "../../../component/core_components/KpiCardComponent/KPICard";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import CustomerDocumentsModal from "./helperComponent/CustomerDocumentsModal";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import {
  INITIAL_CUSTOMER_DOCUMENTS_DATA,
  documentCustomerTableHeaders,
  normalizeDatabaseCustomer,
  normalizeDatabasePolicy,
  buildDocumentFormData,
  DB_TABLES,
  DB_COLUMNS,
} from "./constant";
import {
  FileText,
  FileCheck,
  FileClock,
  Eye,
  Download,
  UploadCloud,
  Search,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Users,
  ChevronRight,
  FileEdit,
  X,
  Filter,
} from "lucide-react";

export default function DocumentDashboardPage() {
  const [customersData, setCustomersData] = useState(INITIAL_CUSTOMER_DOCUMENTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("ALL"); // "ALL", "ATTACHED", "PENDING"
  const [selectedCustomerForDocs, setSelectedCustomerForDocs] = useState(null);

  // ─── API Integrations for GET /api/customers/ and /api/policies/ ──────────
  const [apiUsers, setApiUsers] = useState([]);
  const [apiPolicies, setApiPolicies] = useState([]);

  const { callApi: fetchUsers } = useAPI(API_ENDPOINTS?.ADMIN?.USERS_LIST, {
    method: "GET",
    onSuccess: (res) => {
      const list = Array.isArray(res) ? res : res?.results;
      if (Array.isArray(list) && list.length > 0) {
        setApiUsers(list);
      }
    },
    onFailure: () => {
      // Retains mock database records when API is offline
    },
  });

  const { callApi: fetchPolicies } = useAPI(
    API_ENDPOINTS?.ADMIN?.POLICIES_LIST || "/api/policies/",
    {
      method: "GET",
      onSuccess: (res) => {
        const list = Array.isArray(res) ? res : res?.results;
        if (Array.isArray(list) && list.length > 0) {
          setApiPolicies(list);
        }
      },
      onFailure: () => {
        // Retains mock database records when API is offline
      },
    }
  );

  useEffect(() => {
    fetchUsers();
    fetchPolicies();
  }, []);

  // When live backend data is received, assemble with exact DB normalizers
  useEffect(() => {
    if (apiUsers.length > 0) {
      const assembled = apiUsers.map((user) => {
        const user_customer_id = user.customer_id || user.id;
        const matchingPolicies = apiPolicies.filter(
          (p) => String(p.customer_id) === String(user_customer_id)
        );
        return normalizeDatabaseCustomer(user, matchingPolicies);
      });
      setCustomersData(assembled);
    }
  }, [apiUsers, apiPolicies]);

  // Compute document summaries for each customer using exact DB column names
  const processedCustomers = useMemo(() => {
    return customersData.map((customer) => {
      const kycDocs = customer.customerDocuments || [];
      const policies = customer.policies || [];
      const customer_id = customer.customer_id || customer.customerId;
      const customer_name = customer.name || customer.customerName;
      const customer_phone = customer.phone || customer.customerPhone;

      // Check how many activation PDFs are pending across all customer's policies
      const policiesWithMissingPdf = policies.filter((p) => !(p.policy_pdf_url || p.hasPolicyDoc));
      const totalPendingDocs = policiesWithMissingPdf.length;
      const allActivationPdfAttached = policiesWithMissingPdf.length === 0;

      // Count total files
      const totalAttachedDocs =
        kycDocs.filter((d) => d.status === "ATTACHED").length +
        policies.reduce((acc, p) => {
          const attachedCount = (p.policyAttachedDocs || []).filter(
            (d) => d.status === "ATTACHED"
          ).length;
          return acc + attachedCount + (p.policy_pdf_url || p.hasPolicyDoc ? 1 : 0);
        }, 0);

      return {
        ...customer,
        customer_id,
        customerId: customer_id,
        customer_name,
        customerName: customer_name,
        customer_phone,
        customerPhone: customer_phone,
        totalPolicies: policies.length,
        totalAttachedDocs,
        remainingDocsCount: totalPendingDocs,
        allActivationPdfAttached,
        policiesWithMissingPdf,
      };
    });
  }, [customersData]);

  // Filtering Logic
  const filteredCustomers = useMemo(() => {
    return processedCustomers.filter((customer) => {
      // Status filter
      if (selectedFilter === "ATTACHED" && !customer.allActivationPdfAttached) {
        return false;
      }
      if (selectedFilter === "PENDING" && customer.allActivationPdfAttached) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const customer_name = (customer.name || customer.customerName || "").toLowerCase();
        const customer_id = (customer.customer_id || customer.customerId || "").toLowerCase();
        const customer_phone = (customer.phone || customer.customerPhone || "").toLowerCase();

        const matchesName = customer_name.includes(query);
        const matchesId = customer_id.includes(query);
        const matchesPhone = customer_phone.includes(query);
        const matchesPolicy = (customer.policies || []).some((p) => {
          const policy_id = (p.policy_id || p.policyId || "").toLowerCase();
          const policy_name = (p.policy_name || p.policyName || "").toLowerCase();
          return policy_id.includes(query) || policy_name.includes(query);
        });
        return matchesName || matchesId || matchesPhone || matchesPolicy;
      }

      return true;
    });
  }, [processedCustomers, selectedFilter, searchQuery]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = processedCustomers.length;
    const fullyAttached = processedCustomers.filter((c) => c.allActivationPdfAttached).length;
    const pendingPdf = processedCustomers.filter((c) => !c.allActivationPdfAttached).length;
    const totalFiles = processedCustomers.reduce((acc, c) => acc + c.totalAttachedDocs, 0);
    return { total, fullyAttached, pendingPdf, totalFiles };
  }, [processedCustomers]);

  // Handle updating any document (Customer KYC or Policy Doc) with exact DB schema
  const handleUpdateDocument = (customerId, targetDoc, newFileData, formData) => {
    const target_customer_id = customerId || targetDoc.customer_id || targetDoc.customerId;
    const target_policy_id = targetDoc.policy_id || targetDoc.policyId;
    const db_field = targetDoc.db_field;
    const isPolicySchedule = targetDoc.isOfficialSchedule || db_field === DB_COLUMNS.POLICIES.POLICY_PDF_URL;
    const isCustomerDoc = targetDoc.isKyc || targetDoc.db_table === DB_TABLES.CUSTOMERS_CUSTOMER;

    setCustomersData((prev) =>
      prev.map((cust) => {
        const matchesCustomer =
          String(cust.customer_id || cust.customerId) === String(target_customer_id);
        if (!matchesCustomer) return cust;

        // 1. If it's a customer KYC doc (pan_no, aadhar_no, gst_no)
        if (isCustomerDoc) {
          const updatedKyc = (cust.customerDocuments || []).map((d) =>
            d.id === targetDoc.id || d.db_field === targetDoc.db_field || d.label === targetDoc.label
              ? {
                  ...d,
                  name: newFileData.name,
                  size: newFileData.size,
                  uploaded_at: newFileData.uploaded_at,
                  uploadedAt: newFileData.uploaded_at,
                  type: newFileData.type,
                  previewUrl: newFileData.previewUrl,
                  status: "ATTACHED",
                }
              : d
          );
          return {
            ...cust,
            [db_field]: newFileData.name || cust[db_field],
            customerDocuments: updatedKyc,
          };
        }

        // 2. If it's a policy official schedule or attached doc
        const updatedPolicies = (cust.policies || []).map((pol) => {
          const matchesPolicy =
            String(pol.policy_id || pol.policyId) === String(target_policy_id);
          if (!matchesPolicy) return pol;

          // Official Schedule PDF (policies_policy.policy_pdf_url)
          if (isPolicySchedule) {
            return {
              ...pol,
              hasPolicyDoc: true,
              policy_pdf_url: newFileData.previewUrl,
              policyDocPreviewUrl: newFileData.previewUrl,
              policyDocName: newFileData.name,
              policyDocSize: newFileData.size,
              policyDocUploadedAt: newFileData.uploaded_at,
            };
          }

          // Supporting Policy Attached Doc (rc_file_url, dl_file_url, etc. in policy_description)
          const updatedAttachedDocs = (pol.policyAttachedDocs || []).map((d) =>
            d.id === targetDoc.id || d.db_field === targetDoc.db_field || d.label === targetDoc.label
              ? {
                  ...d,
                  name: newFileData.name,
                  size: newFileData.size,
                  uploaded_at: newFileData.uploaded_at,
                  uploadedAt: newFileData.uploaded_at,
                  type: newFileData.type,
                  previewUrl: newFileData.previewUrl,
                  status: "ATTACHED",
                }
              : d
          );

          const updatedPolicyDescription = {
            ...(pol.policy_description || {}),
            [db_field]: newFileData.previewUrl,
          };

          return {
            ...pol,
            policy_description: updatedPolicyDescription,
            policyAttachedDocs: updatedAttachedDocs,
          };
        });

        return { ...cust, policies: updatedPolicies };
      })
    );

    // Also update selectedCustomerForDocs if it's currently open
    setSelectedCustomerForDocs((current) => {
      if (!current) return current;
      const curId = current.customer_id || current.customerId;
      if (String(curId) !== String(target_customer_id)) return current;
      const refreshed = processedCustomers.find(
        (c) => String(c.customer_id || c.customerId) === String(target_customer_id)
      );
      return refreshed || current;
    });
  };

  // Table Column Formatter
  const formattedHeaders = documentCustomerTableHeaders.map((col) => {
    // 1. Customer Name (Clickable to open all documents)
    if (col.accessor === "customerName") {
      return {
        ...col,
        specialCellRowFunction: (row) => {
          const custName = row.name || row.customerName || "Customer";
          const custPhone = row.phone || row.customerPhone || "-";
          return (
            <button
              type="button"
              onClick={() => setSelectedCustomerForDocs(row)}
              className="flex items-center gap-3 text-left group cursor-pointer"
              title="Click to view and update all associated documents"
            >
              <div className="w-8 h-8 rounded-full bg-[#0B2545] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                {custName[0]?.toUpperCase() || "C"}
              </div>
              <div>
                <p className="text-xs font-bold text-[#0B2545] group-hover:text-blue-600 transition-colors underline decoration-dotted underline-offset-2">
                  {custName}
                </p>
                <p className="text-[11px] text-[#667085]">
                  {custPhone} • {row.totalPolicies || 0} {row.totalPolicies === 1 ? "Policy" : "Policies"}
                </p>
              </div>
            </button>
          );
        },
      };
    }

    // 2. Customer ID
    if (col.accessor === "customerId") {
      return {
        ...col,
        specialCellRowFunction: (row) => (
          <span className="font-mono font-bold text-[#0B2545] text-xs bg-[#F4F7F6] px-2 py-1 rounded-md border border-[#E5E9E7]">
            {row.customer_id || row.customerId}
          </span>
        ),
      };
    }

    // 3. Remaining Documents
    if (col.accessor === "remainingDocs") {
      return {
        ...col,
        specialCellRowFunction: (row) => {
          if (row.remainingDocsCount === 0) {
            return (
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF4EC] text-[#2F6F3E] border border-[#CDE5D2]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  0 Remaining (Complete)
                </span>
              </div>
            );
          }

          return (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEF6EE] text-[#B54708] border border-[#F9DBAF]">
                <AlertCircle className="w-3.5 h-3.5" />
                {row.remainingDocsCount} {row.remainingDocsCount === 1 ? "Document Remaining" : "Documents Remaining"}
              </span>
            </div>
          );
        },
      };
    }

    // 4. Activation PDF Check Only
    if (col.accessor === "activationPdfCheck") {
      return {
        ...col,
        specialCellRowFunction: (row) => {
          if (row.allActivationPdfAttached) {
            return (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF4EC] text-[#2F6F3E] border border-[#CDE5D2]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Activation PDF Attached
              </span>
            );
          }

          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FBF5DF] text-[#C9A227] border border-[#F4E3A9]">
              <AlertCircle className="w-3.5 h-3.5" />
              Activation PDF Pending
            </span>
          );
        },
      };
    }

    // 5. Actions
    if (col.accessor === "actions") {
      return {
        ...col,
        specialCellRowFunction: (row) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedCustomerForDocs(row)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0B2545] hover:bg-[#0E2F52] shadow-2xs transition-all cursor-pointer active:scale-98"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View All Docs</span>
            </button>
          </div>
        ),
      };
    }

    return col;
  });

  // Collapsible Sub-Table for Customer Policies (Directly patterned after PolicyDashboardPage)
  const renderExpandedCustomerPolicies = (customerRow) => {
    const customerPolicies = customerRow?.policies || [];

    return (
      <div className="bg-white rounded-xl border border-[#E5E9E7] p-4.5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E9E7]">
          <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0B2545]" />
            Registered Policies for {customerRow.name || customerRow.customerName} ({customerPolicies.length})
            <span className="text-[11px] font-normal text-[#667085]">
              (Customer ID: {customerRow.customer_id || customerRow.customerId})
            </span>
          </h4>

          <button
            type="button"
            onClick={() => setSelectedCustomerForDocs(customerRow)}
            className="text-xs font-bold text-[#0B2545] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Manage All Customer Documents</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAF9] text-[#667085] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E9E7]">
                <th className="py-2.5 px-3">Policy ID</th>
                <th className="py-2.5 px-3">Policy Name</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Period</th>
                <th className="py-2.5 px-3">Attached Assets</th>
                <th className="py-2.5 px-3">Activation PDF Status</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E9E7]">
              {customerPolicies.map((pol) => {
                const policy_id = pol.policy_id || pol.policyId;
                const policy_name = pol.policy_name || pol.policyName;
                const issue_date = pol.issue_date || pol.issueDate || "-";
                const expiry_date = pol.expiry_date || pol.expiryDate || "-";
                const has_pdf = Boolean(pol.policy_pdf_url || pol.hasPolicyDoc);
                const attachedCount = (pol.policyAttachedDocs || []).length;

                return (
                  <tr
                    key={policy_id}
                    className="hover:bg-[#F0F4F8] transition-colors"
                  >
                    <td className="py-3 px-3 font-mono font-bold text-[#0B2545] text-nowrap">
                      {policy_id}
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#0B2545]">
                      {policy_name}
                    </td>
                    <td className="py-3 px-3 text-[#475569]">
                      <span className="px-2 py-0.5 rounded bg-gray-100 text-[#0B2545] font-medium text-[11px]">
                        {pol.category || "General"}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[#475569] text-nowrap text-[11px]">
                      {issue_date} → {expiry_date}
                    </td>
                    <td className="py-3 px-3 text-[#475569]">
                      <div className="flex items-center gap-1 flex-wrap">
                        {(pol.policyAttachedDocs || []).map((d) => (
                          <span
                            key={d.id || d.label}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-[#EAF0F6] text-[#0B2545] font-medium"
                          >
                            {d.label?.includes("RC") ? "RC" : d.label?.includes("DL") ? "DL" : d.label?.includes("GST") ? "GST" : d.label?.slice(0, 8)}
                          </span>
                        ))}
                        {attachedCount === 0 && (
                          <span className="text-[11px] text-gray-400 italic">No asset docs</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {has_pdf ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#2F6F3E] bg-[#EAF4EC] px-2 py-0.5 rounded-full border border-[#CDE5D2]">
                          <CheckCircle2 className="w-3 h-3" />
                          Attached
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B54708] bg-[#FEF6EE] px-2 py-0.5 rounded-full border border-[#F9DBAF]">
                          <AlertCircle className="w-3 h-3" />
                          Pending PDF
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedCustomerForDocs(customerRow)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold text-[#0B2545] hover:bg-white border border-[#CBD5E1] transition cursor-pointer"
                      >
                        <FileEdit className="w-3 h-3" />
                        <span>View / Update</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-[#E5E9E7]">
        <div>
          <h1 className="text-[26px] font-bold text-[#0B2545] tracking-tight font-sans">
            Document Dashboard
          </h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Customer-centric view listing policy holders, remaining documents, and policy activation PDF status.
          </p>
        </div>
      </div>

      {/* ── Metric Summary Cards ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Customers"
          value={stats.total}
          subtitle="Registered policy holders"
          color="blue"
          icon={<Users className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Activation PDF Active"
          value={stats.fullyAttached}
          subtitle="All policy schedules attached"
          color="green"
          icon={<FileCheck className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Pending Activation PDF"
          value={stats.pendingPdf}
          subtitle="Policy schedule upload required"
          color="yellow"
          icon={<FileClock className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Total Attached Files"
          value={stats.totalFiles}
          subtitle="Verified files in repository"
          color="purple"
          icon={<ShieldCheck className="w-[18px] h-[18px]" />}
        />
      </div>

      {/* ── Search & Filter Toolbar ─────────────────────────── */}
      <div className="bg-white rounded-2xl border border-[#E5E9E7] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-88">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C98A4]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Customer Name, Customer ID, or Policy..."
            className="w-full pl-10 pr-9 py-2 text-xs rounded-xl border border-[#CBD5E1] bg-white text-[#0B2545] placeholder-[#8C98A4] focus:outline-none focus:ring-2 focus:ring-[#0B2545]/20 focus:border-[#0B2545]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C98A4] hover:text-[#0B2545]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
          <span className="text-xs text-[#667085] font-semibold mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#0B2545]" />
            Filter:
          </span>
          {[
            { label: "All Customers", value: "ALL" },
            { label: "Activation PDF Attached", value: "ATTACHED" },
            { label: "Pending Activation PDF", value: "PENDING" },
          ].map((item) => {
            const isActive = selectedFilter === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setSelectedFilter(item.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? "bg-[#0B2545] text-white shadow-xs"
                    : "bg-[#F4F7F6] text-[#52627A] hover:bg-[#EAF0F6] hover:text-[#0B2545]"
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {(searchQuery || selectedFilter !== "ALL") && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedFilter("ALL");
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Main Customer Table with Collapsible Policy Sub-Rows ─ */}
      <div className="min-h-[400px] w-full">
        <TableComponent
          theme="light"
          defaultHeaders={formattedHeaders}
          dataSource={filteredCustomers}
          isSelection={false}
          collapsible={true}
          renderExpandedRow={renderExpandedCustomerPolicies}
          pagination={true}
          pageSize={10}
          pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
          emptyTitle="No Document Records Found"
          emptyDescription="There are no customer document records matching your search or filters."
          onClearFilters={() => {
            setSearchQuery("");
            setSelectedFilter("ALL");
          }}
        />
      </div>

      {/* ── All Associated Uploaded Documents & Update Modal ─── */}
      <CustomerDocumentsModal
        isOpen={!!selectedCustomerForDocs}
        onClose={() => setSelectedCustomerForDocs(null)}
        customer={selectedCustomerForDocs}
        onUpdateDocument={handleUpdateDocument}
      />
    </div>
  );
}
