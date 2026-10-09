import React, { useEffect, useState, useMemo } from "react";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import { getStatusPill, headers, users } from "./constant";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import UserRegistrationForm from "./helperComponent/UserRegistrationForm";
import PolicyRegistrationForm from "./helperComponent/PolicyRegistrationForm";
import CustomDateRangePicker from "../../../component/core_components/DatePicker/CustomDateRangePicker";
import CustomerPolicyDetailsView from "../../../component/shared/CustomerPolicyDetailsView/CustomerPolicyDetailsView";
import { ArrowUpRight, Edit } from "lucide-react";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import { showToast } from "../../../component/core_components/CustomToast/CustomToast";

const UserDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [selectedCustomerForView, setSelectedCustomerForView] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    fullName: "",
    date_of_birth: "",
    dob: "",
    gender: "",
    phone: "",
    mobileNumber: "",
    email: "",
    emailAddress: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pinCode: "",
    pan_no: "",
    panNumber: "",
    aadhar_no: "",
    aadhaarNumber: "",
    panCard: null,
    aadhaarCard: null,
  });

  // Policy Form States
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
  const [selectedUserForPolicy, setSelectedUserForPolicy] = useState(null);
  const [userList, setUserList] = useState([]);
  const [policyFormData, setPolicyFormData] = useState({
    policyName: "",
    category: "",
    subType: "",
    issueDate: "",
    expiryDate: "",
    vehicleOwner: "",
    vehicleName: "",
    vehicleNumber: "",
    gvw: "",
    rcFile: null,
    dlFile: null,
    gstFile: null,
    gumastaFile: null,
    udyamFile: null,
    previousPolicyFile: null,
    members: [{ id: 1, name: "", age: "", relation: "" }],
    price: "",
    txMode: "",
    payStatus: "pending",
    chequeNum: "",
    chequeStatus: "pending_clearance",
    txDate: "",
    txTime: "",
    txNote: "",
    showCommission: false,
    CommissionAmount: "",
    CommissionMode: "",
    CommissionStatus: "pending",
    CommissionDate: "",
    CommissionNote: "",
    policyDoc: null,
  });

  //-----------------API INTEGRATIONS------------------------

  const { callApi: userRegistration } = useAPI(
    API_ENDPOINTS?.ADMIN?.USER_REGISTRATION,
    {
      method: "POST",
      onSuccess: (response) => {
        showToast.success(
          "Customer Registered Successfully!",
          "New member account details have been saved."
        );
        setIsOpenForm(false);
        AllUsersList();
      },
      onFailure: (error) => {
        console.log("Registration Error:", error);
        showToast.error(
          "Registration Failed",
          error?.response?.data?.message ||
            error?.message ||
            "Please check details and try again."
        );
      },
    }
  );

  const { callApi: AllUsersList } = useAPI(API_ENDPOINTS?.ADMIN?.USERS_LIST, {
    method: "GET",
    onSuccess: (response) => {
      console.log("resonse.result", response);
      if (response && response.length > 0) {
        setUserList(response);
      } else {
        setUserList([]);
      }
    },
    onFailure: (error) => {
      console.log("error", error);
      setUserList([]);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const onNewRegisrationFormClick = () => {
    console.log("Click");
    setIsOpenForm(true);
  };

  const handleCancelRegistration = () => {
    setIsOpenForm(false);
  };

  const handleClickBack = () => {
    setIsOpenForm(false);
  };

  const handleSubitRegistration = (data) => {
    console.log("data", data);
    userRegistration(data);
  };

  const handleEditButtonClick = (row) => {
    setSelectedUserForPolicy(row);
    setPolicyFormData((prev) => ({
      ...prev,
      members: [{ id: 1, name: row.fullName, age: "", relation: "Self" }],
    }));
    setIsOpenPolicyForm(true);
  };

  const handleCancelPolicyRegistration = () => {
    setIsOpenPolicyForm(false);
    setSelectedUserForPolicy(null);
  };
  // Dynamically attach interactive cell row functions to access local state handlers
  const tableHeaders = headers.map((header) => {
    if (header.accessor === "customer_id") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCustomerForView({
                customerId: row.customer_id,
                initialTab: "personal",
              });
            }}
            className="font-bold text-[#0B2545] hover:text-[#2F6F3E] hover:underline underline-offset-2 transition-colors cursor-pointer border-none bg-transparent p-0 text-xs text-left"
            title="View Customer Profile & Policies"
          >
            {row.customer_id}
          </button>
        ),
      };
    }
    if (header.accessor === "action") {
      return {
        ...header,
        specialCellRowFunction: (row) => (
          <button
            type="button"
            className="flex items-center justify-center bg-[#EAF0F6] border border-[#D0DCEB] text-[#0B2545] hover:bg-[#0B2545] hover:text-white hover:border-[#0B2545] text-xs font-semibold rounded-[8px] px-3 py-1.5 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleEditButtonClick(row);
            }}
          >
            Add Policy
          </button>
        ),
      };
    }
    if (header.accessor === "policy_count") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => {
          return (
            <div className="flex flex-row gap-2 items-center justify-center">
              <span className="font-semibold text-[#17212B]">
                {row?.policy_count || 0}
              </span>

              {Number(row?.policy_count) > 0 && (
                <button
                  type="button"
                  className="p-1 hover:bg-[#EAF0F6] rounded text-[#0B2545] hover:text-[#2F6F3E] transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCustomerForView({
                      customerId: row.customer_id,
                      initialTab: "policies",
                    });
                  }}
                  title="View Policies for Customer"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        },
      };
    }
    return header;
  });

  const filteredUserList = useMemo(() => {
    if (!dateRange.startDate && !dateRange.endDate) {
      return userList;
    }
    return userList.filter((user) => {
      const userDate = user?.created_at || user?.date_of_birth;
      if (!userDate) return true;
      const d = String(userDate).split("T")[0];
      if (dateRange.startDate && d < dateRange.startDate) return false;
      if (dateRange.endDate && d > dateRange.endDate) return false;
      return true;
    });
  }, [userList, dateRange]);

  useEffect(() => {
    AllUsersList();
  }, []);

  return (
    <div className="h-full w-full bg-transparent">
      {selectedCustomerForView ? (
        // Shared Customer & Policy Details View
        <CustomerPolicyDetailsView
          customerId={selectedCustomerForView.customerId}
          initialTab={selectedCustomerForView.initialTab || "personal"}
          onBack={() => setSelectedCustomerForView(null)}
          originatingDirectory="users"
        />
      ) : isOpenForm ? (
        // Registration Form
        <UserRegistrationForm
          onClickBack={handleClickBack}
          formData={formData}
          onChange={setFormData}
          onCancel={handleCancelRegistration}
          onSubmit={handleSubitRegistration}
        />
      ) : isOpenPolicyForm ? (
        // Policy Registration Form
        <PolicyRegistrationForm
          selectedCustomer={selectedUserForPolicy}
          formData={policyFormData}
          onChange={setPolicyFormData}
          onClickBack={handleCancelPolicyRegistration}
          onCancel={handleCancelPolicyRegistration}
          onSubmit={(data) => {
            console.log("Policy Registration Data:", data);
            handleCancelPolicyRegistration();
          }}
          onSelectCustomer={(cust) => {
            setSelectedUserForPolicy(cust);
            if (cust) {
              setPolicyFormData((prev) => ({
                ...prev,
                members: [
                  { id: 1, name: cust.fullName, age: "", relation: "Self" },
                ],
              }));
            } else {
              setPolicyFormData((prev) => ({
                ...prev,
                members: [{ id: 1, name: "", age: "", relation: "" }],
              }));
            }
          }}
        />
      ) : (
        // Dashboard / Table
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 p-1">
            <h1 className="text-[26px] font-bold text-[#0B2545] font-sans tracking-tight">
              Register Member Directory
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                disabled={false}
                onClick={() => {
                  setPolicyFormData({
                    policyName: "",
                    category: "",
                    subType: "",
                    issueDate: "",
                    expiryDate: "",
                    vehicleOwner: "",
                    vehicleName: "",
                    vehicleNumber: "",
                    gvw: "",
                    rcFile: null,
                    dlFile: null,
                    gstFile: null,
                    gumastaFile: null,
                    udyamFile: null,
                    previousPolicyFile: null,
                    members: [{ id: 1, name: "", age: "", relation: "" }],
                    price: "",
                    txMode: "",
                    payStatus: "pending",
                    chequeNum: "",
                    chequeStatus: "pending_clearance",
                    txDate: "",
                    txTime: "",
                    txNote: "",
                    showCommission: false,
                    CommissionAmount: "",
                    CommissionMode: "",
                    CommissionStatus: "pending",
                    CommissionDate: "",
                    CommissionNote: "",
                    policyDoc: null,
                  });
                  setSelectedUserForPolicy(null);
                  setIsOpenPolicyForm(true);
                }}
                className="h-[38px] flex items-center justify-center rounded-[8px] bg-white border border-[#0B2545] text-[#0B2545] hover:bg-[#EAF0F6] px-4 text-[13px] font-semibold transition-colors cursor-pointer shrink-0"
              >
                Add New Policy
              </button>
              <button
                type="button"
                disabled={false}
                onClick={onNewRegisrationFormClick}
                className="h-[38px] flex items-center justify-center rounded-[8px] bg-[#0B2545] text-white hover:bg-[#0E2F52] px-4 text-[13px] font-semibold transition-colors cursor-pointer shrink-0"
              >
                New Registration
              </button>

              <div className="w-48 sm:w-56 shrink-0">
                <CustomDateRangePicker
                  startDate={dateRange.startDate}
                  endDate={dateRange.endDate}
                  onChange={({ startDate, endDate }) => {
                    setDateRange({ startDate, endDate });
                  }}
                  onApply={({ startDate, endDate }) => {
                    setDateRange({ startDate, endDate });
                  }}
                />
              </div>
            </div>
          </div>

          <div className="min-h-[30vh] h-full w-full">
            {isLoading ? (
              <div className="flex h-full min-h-[30vh] items-center justify-center bg-white rounded-xl border border-slate-100 shadow-sm">
                <LogoSpinner type="spin" size="md" />
              </div>
            ) : (
              <TableComponent
                theme="light"
                defaultHeaders={tableHeaders}
                dataSource={filteredUserList}
                pagination={false}
                pageSize={5}
                pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
                emptyTitle="No Registered Members Found"
                emptyDescription="There are currently no registered customers in the system."
                onRetry={AllUsersList}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
