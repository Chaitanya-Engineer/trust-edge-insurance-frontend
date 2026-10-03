import React, { useEffect } from "react";
import CustomizeBtn from "../../../component/core_components/CustomizeBtn/CustomizeBtn";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import { headers, users } from "./constant";
import { useState } from "react";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import UserRegistrationForm from "./helperComponent/UserRegistrationForm";
import PolicyRegistrationForm from "./helperComponent/PolicyRegistrationForm";
import { Edit } from "lucide-react";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import { showToast } from "../../../component/core_components/CustomToast/CustomToast";

const UserDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);
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
          error?.response?.data?.message || error?.message || "Please check details and try again."
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

  const getStatusPill = (statusVal) => {
    if (!statusVal) return null;
    const lower = statusVal.toLowerCase().trim();

    // 🟡 Pending (Yellow/Amber)
    if (lower.includes("review") || lower === "pending" || lower === "new") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FBF5DF] text-[#C9A227]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]"></span>
          Pending
        </span>
      );
    }

    // 🟢 Verified (Green)
    if (lower === "verified") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF4EC] text-[#2F6F3E]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2F6F3E]"></span>
          Verified
        </span>
      );
    }

    // 🔵 Active (Blue)
    if (lower === "active") {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#EAF0F6] text-[#0B2545]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0B2545]"></span>
          Active
        </span>
      );
    }

    // 🟠 Expired (Orange)
    if (
      lower === "expired" ||
      lower === "error" ||
      lower === "rejected" ||
      lower === "failed" ||
      lower === "inactive"
    ) {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFF4ED] text-[#B44C18]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F76B15]"></span>
          Expired
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F2F4F7] text-[#344054]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#667085]"></span>
        {statusVal}
      </span>
    );
  };

  // Dynamically attach the action cell row function to access local state handlers
  const tableHeaders = headers.map((header) => {
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
    if (header.accessor === "status") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => getStatusPill(row?.status),
      };
    }
    return header;
  });

  // useEffect(() => {
  //   // users();
  // }, []);
  useEffect(() => {
    AllUsersList();
  }, []);

  return (
    <div className="h-full w-full bg-transparent">
      {isOpenForm ? (
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-1">
            <h1 className="text-[26px] font-bold text-[#0B2545] font-sans tracking-tight">
              Register Member Directory
            </h1>

            <div className="flex items-center gap-3">
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
                className="rounded-[9px] bg-white border border-[#0B2545] text-[#0B2545] hover:bg-[#EAF0F6] px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                Add New Policy
              </button>
              <button
                type="button"
                disabled={false}
                onClick={onNewRegisrationFormClick}
                className="rounded-[9px] bg-[#0B2545] text-white hover:bg-[#0E2F52] px-4 py-2.5 text-[13px] font-semibold transition-colors cursor-pointer"
              >
                New Registration
              </button>
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
                dataSource={userList}
                pagination={false}
                pageSize={5}
                pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
