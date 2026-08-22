
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
      accessor: "customer_id",
      type: "string",
    },
    {
      title: "Full Name",
      accessor: "name",
      type: "string",
      is_filter: true,
    },
    {
      title: "Date of Birth",
      accessor: "date_of_birth",
      type: "date",
    },
    {
      title: "Gender",
      accessor: "gender",
      type: "string",
    },
    {
      title: "Mobile Number",
      accessor: "phone",
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
    {
      title: "Action",
      accessor: "action",
      type: "special",
      is_filter: false,
      width: 100,
      specialCellRowFunction: (row) => null,
    },
  ];

  export const genderOptions = [
  {
    value: "MALE",
    label: "MALE",
  },
  {
    value: "FEMALE",
    label: "FEMALE",
  },
  {
    value: "OTHER",
    label: "OTHER",
  },
];

export const subTypes = {
  health: ['Individual', 'Family Floater', 'Group Health'],
  personal: ['Term Life', 'Whole Life', 'Personal Accident', 'Travel'],
  motor: ['Two Wheeler', 'Four Wheeler', 'Commercial Vehicle', 'Miscellaneous Vehicle'],
  property: ['Home', 'Shop', 'Office', 'Industrial'],
  marine: ['Cargo', 'Hull', 'Freight'],
  workmen: ['Standard', 'Enhanced'],
};

export const relations = [
  { value: 'Self', label: 'Self' },
  { value: 'Spouse', label: 'Spouse' },
  { value: 'Father', label: 'Father' },
  { value: 'Mother', label: 'Mother' },
  { value: 'Son', label: 'Son' },
  { value: 'Daughter', label: 'Daughter' },
  { value: 'Sibling', label: 'Sibling' },
  { value: 'Other', label: 'Other' },
];

export const categoryOptions = [
  { value: "health", label: "Health Insurance" },
  { value: "personal", label: "Personal Insurance" },
  { value: "motor", label: "Motor Insurance" },
  { value: "property", label: "Property Insurance" },
  { value: "marine", label: "Marine Insurance" },
  { value: "workmen", label: "Workmen Compensation" },
];

export const transactionModeOptions = [
  { value: "upi", label: "UPI" },
  { value: "card", label: "Card" },
  { value: "cheque", label: "Cheque" },
  { value: "cash", label: "Cash" },
];

export const vehicleOwnerOptions = [
  { value: "personal", label: "Personal" },
  { value: "business", label: "Business" },
];

export const paymentStatusOptions = [
  { value: "done", label: "Done" },
  { value: "pending", label: "Pending" },
];
