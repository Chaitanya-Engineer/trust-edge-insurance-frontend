import React from "react";
import CustomizeBtn from "../../../component/core_components/CustomizeBtn/CustomizeBtn";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import { headers, users } from "./constant";
import { useState } from "react";
import UserRegistrationForm from "./helperComponent/UserRegistationForm";
import PolicyRegistrationForm from "./helperComponent/PolicyRegistrationForm";
import { Edit } from "lucide-react";

const UserDashboardPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobileNumber: "",
    emailAddress: "",
    panNumber: "",
    aadhaarNumber: "",
    passportPhoto: null,
    panCard: null,
    signature: null,
    aadhaarCard: null,
  });

  // Policy Form States
  const [isOpenPolicyForm, setIsOpenPolicyForm] = useState(false);
  const [selectedUserForPolicy, setSelectedUserForPolicy] = useState(null);
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

  // Dynamically attach the action cell row function to access local state handlers
  const tableHeaders = headers.map((header) => {
    if (header.accessor === "action") {
      return {
        ...header,
        specialCellRowFunction: (row) => (
          <button
            type="button"
            className="flex items-center justify-center rounded bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
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
    return header;
  });

  return (
    <div className="h-full w-full bg-slate-50">
      {isOpenForm ? (
        // Registration Form
        <UserRegistrationForm
          onClickBack={handleClickBack}
          formData={formData}
          onChange={setFormData}
          onCancel={handleCancelRegistration}
          onSubmit={(data) => {
            console.log("Registration Data:", data);
          }}
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
                members: [{ id: 1, name: cust.fullName, age: "", relation: "Self" }],
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
        <div className="flex h-full w-full flex-col gap-2">
          <div className="flex flex-row items-center justify-between p-3">
            <h2 className="text-lg font-semibold">Register Member Directory</h2>

            <div className="flex items-center gap-3">
              <CustomizeBtn
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
                title="Add New Policy"
              />
              <CustomizeBtn
                disabled={false}
                onClick={onNewRegisrationFormClick}
                title="New Registration"
              />
            </div>
          </div>

          <div className="min-h-[30vh] h-full w-full">
            <TableComponent
              theme="light"
              defaultHeaders={tableHeaders}
              dataSource={users}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;

