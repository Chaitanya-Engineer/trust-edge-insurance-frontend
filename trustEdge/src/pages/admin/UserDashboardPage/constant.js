
  export const users = [
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
    },
  ];

 export const headers = [
    {
      title: "ID",
      accessor: "id",
      type: "string",
    },
    {
      title: "Full Name",
      accessor: "fullName",
      type: "string",
      is_filter: true,
    },
    {
      title: "Date of Birth",
      accessor: "dob",
      type: "date",
    },
    {
      title: "Gender",
      accessor: "gender",
      type: "string",
    },
    {
      title: "Mobile Number",
      accessor: "mobileNumber",
      type: "string",
      isCopy: true,
    },
    {
      title: "Email Address",
      accessor: "emailAddress",
      type: "string",
      isCopy: true,
    },
    {
      title: "PAN Number",
      accessor: "panNumber",
      type: "string",
    },
    {
      title: "Aadhaar Number",
      accessor: "aadhaarNumber",
      type: "string",
    },
    {
      title: "Customer Type",
      accessor: "customerType",
      type: "string",
    },
    {
      title: "Verification Status",
      accessor: "verificationStatus",
      type: "string",
    },
    {
      title: "Status",
      accessor: "status",
      type: "string",
    },
  ];

  export const genderOptions = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];
