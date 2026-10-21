import React, { useEffect } from "react";
import CustomizeBtn from "../../../component/core_components/CustomizeBtn/CustomizeBtn";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import { getStatusPill, headers, ModalHeader, users } from "./constant";
import { useState } from "react";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import UserRegistrationForm from "./helperComponent/UserRegistrationForm";
import PolicyRegistrationForm from "./helperComponent/PolicyRegistrationForm";
import { ArrowUpRight, Edit, PencilIcon } from "lucide-react";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import { showToast } from "../../../component/core_components/CustomToast/CustomToast";
import ModalComponent from "../../../component/core_components/ModalComponent/ModalCommponent";

const UserDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const initialFormData = {
    name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    pan_no: "",
    aadhar_no: "",
    gst_no: "",
    panCard: null,
    aadhaarCard: null,
    documents: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  // Policy Form States
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
  const [selectedUserForPolicy, setSelectedUserForPolicy] = useState(null);
  const [userList, setUserList] = useState([]);
  const [openPolicyModal, setOpenPolicyModal] = useState(false);
  const [modalDataSource, setModalDataSource] = useState([]);
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
      setIsLoading(false);
    },
    onFailure: (error) => {
      console.log("error", error);
      setUserList([]);
    },
  });

  const { callApi: viewPolicies } = useAPI(
    API_ENDPOINTS?.ADMIN?.SHOW_POLICY_BY_CUSTOMER_ID,
    {
      method: "POST",
      onSuccess: (response) => {
        console.log("response.result", response);
        setModalDataSource(response);
      },
      onFailure: () => {
        setModalDataSource([]);
      },
    }
  );

  const { callApi: showCustomerDetails } = useAPI(
    API_ENDPOINTS?.ADMIN?.UPDATE_OR_VIEW_CUSTOMER_BY_ID,
    {
      method: "POST",
      onSuccess: (response) => {
        setFormData({
          name: response?.name ?? "",
          date_of_birth: response?.date_of_birth ?? "",
          gender: response?.gender ?? "",
          phone: response?.phone ?? "",
          email: response?.email ?? "",
          address: response?.address ?? "",
          city: response?.city ?? "",
          state: response?.state ?? "",
          pincode: response?.pincode ?? "",
          pan_no: response?.pan_no ?? "",
          aadhar_no: response?.aadhar_no ?? "",
          gst_no: response?.gst_no ?? "",
          panCard: null,
          aadhaarCard: null,
          documents: response?.documents ?? [],
        });
      },
      onFailure: (error) => {
        console.error(error);
      },
    }
  );

  const onNewRegisrationFormClick = () => {
    console.log("Click");
    setIsOpenForm(true);
  };

  const handleCancelRegistration = () => {
    setIsOpenForm(false);
  };

  const handleClickBack = () => {
    setIsOpenForm(false);
    AllUsersList();
  };

  const handleEditCustomer = (customer) => {
    console.log("customer", customer);
    setIsEditMode(true);
    setIsOpenForm(true);
    setSelectedCustomerId(customer?.customer_id);
    showCustomerDetails({
      customer_id: customer?.customer_id,
      action: "get",
    });
  };

  const handleSubmitRegistration = (data) => {
    console.log("Form data:", data);

    if (isEditMode) {
      const payload = {
        customer_id: data?.customer_id,
        action: "update",
        name: data?.name,
        phone: data?.phone,
        address: data?.address,
        city: data?.city,
        state: data?.state,
        pincode: data?.pincode,
        gst_no: data?.gst_no,
        gender: data?.gender,
        date_of_birth: data?.date_of_birth,
        pan_no: data?.pan_no,
        aadhar_no: data?.aadhar_no,
      };
      // setIsOpenForm(false);
      console.log("Final payload:", payload);

      showCustomerDetails(payload);
    } else {
      userRegistration(data);
    }
    // AllUsersList();
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

  const onPolicyCountClick = (row) => {
    console.log("row", row);
    setOpenPolicyModal(true);
    viewPolicies({ customer_id: row?.customer_id });
  };

  const handleCloseModal = () => {
    setOpenPolicyModal(false);
    console.log("call");
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
    } else if (header.accessor === "policy_count") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => {
          return (
            <div className="flex flex-row gap-2 items-center justify-center">
              <span>{row?.policy_count}</span>

              {row?.policy_count > 0 && (
                <span
                  className="cursor-pointer text-blue-600 hover:text-blue-800"
                  onClick={() => onPolicyCountClick(row)}
                >
                  <ArrowUpRight size={18} />
                </span>
              )}
            </div>
          );
        },
      };
    } else if (header?.accessor === "edit") {
      return {
        ...header,
        type: "special",
        specialCellRowFunction: (row) => {
          return (
            <div className="flex h-full flex-row gap-2 items-center justify-center">
              <div
                className="h-full p-2 bg-slate-200 rounded-md shadow-md cursor-pointer"
                onClick={() => handleEditCustomer(row)}
              >
                <PencilIcon size={18} />
              </div>
            </div>
          );
        },
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
          formData={formData}
          onChange={setFormData}
          onClickBack={handleClickBack}
          onCancel={handleCancelRegistration}
          onSubmit={handleSubmitRegistration}
          isEditMode={isEditMode}
          customerId={selectedCustomerId}
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
          {openPolicyModal && (
            <div>
              <ModalComponent
                title={"Policy Details"}
                header={ModalHeader}
                data={modalDataSource}
                countName={"Policy Count"}
                handleClose={handleCloseModal}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
