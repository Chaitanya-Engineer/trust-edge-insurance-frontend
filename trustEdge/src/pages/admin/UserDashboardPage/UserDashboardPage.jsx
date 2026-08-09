import React from "react";
import CustomizeBtn from "../../../component/core_components/CustomizeBtn/CustomizeBtn";
import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import { headers, users } from "./constant";
import { useState } from "react";
import UserRegistrationForm from "./helperComponent/UserRegistationForm";

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
      ) : (
        // Dashboard / Table
        <div className="flex h-full w-full flex-col gap-2">
          <div className="flex flex-row items-center justify-between p-3">
            <h2 className="text-lg font-semibold">Register Member Directory</h2>

            <div>
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
              defaultHeaders={headers}
              dataSource={users}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
