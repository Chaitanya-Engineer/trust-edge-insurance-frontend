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
    status: "Pending",
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
    status: "Verified",
  },
  {
    id: 3,
    fullName: "Ananya Verma",
    dob: "1995-04-15",
    gender: "Female",
    mobileNumber: "+91 98111 22334",
    emailAddress: "ananya.verma@example.com",
    panNumber: "MNOPQ9012R",
    aadhaarNumber: "1122 3344 5566",
    status: "Active",
  },
  {
    id: 4,
    fullName: "Vikram Patel",
    dob: "1990-09-30",
    gender: "Male",
    mobileNumber: "+91 97222 33445",
    emailAddress: "vikram.patel@example.com",
    panNumber: "STUVW3456S",
    aadhaarNumber: "2233 4455 6677",
    status: "Expired",
  },
  {
    id: 5,
    fullName: "Sneha Gupta",
    dob: "1992-01-18",
    gender: "Female",
    mobileNumber: "+91 96333 44556",
    emailAddress: "sneha.gupta@example.com",
    panNumber: "GHIJK7890T",
    aadhaarNumber: "3344 5566 7788",
    status: "Pending",
  },
  {
    id: 6,
    fullName: "Amit Singh",
    dob: "1985-06-25",
    gender: "Male",
    mobileNumber: "+91 95444 55667",
    emailAddress: "amit.singh@example.com",
    panNumber: "LMNOP1234U",
    aadhaarNumber: "4455 6677 8899",
    customerType: "Universal",
    verificationStatus: "Verified",
    status: "Verified",
  },
  {
    id: 7,
    fullName: "Kavita Reddy",
    dob: "1996-12-05",
    gender: "Female",
    mobileNumber: "+91 94555 66778",
    emailAddress: "kavita.reddy@example.com",
    panNumber: "QRSTU5678V",
    aadhaarNumber: "5566 7788 9900",
    customerType: "Universal",
    verificationStatus: "Verified",
    status: "Active",
  },
  {
    id: 8,
    fullName: "Rajesh Kumar",
    dob: "1982-03-14",
    gender: "Male",
    mobileNumber: "+91 93666 77889",
    emailAddress: "rajesh.kumar@example.com",
    panNumber: "VWXYZ9012W",
    aadhaarNumber: "6677 8899 0011",
    customerType: "Universal",
    verificationStatus: "Pending",
    status: "Expired",
  },
  {
    id: 9,
    fullName: "Divya Joshi",
    dob: "1993-07-22",
    gender: "Female",
    mobileNumber: "+91 92777 88990",
    emailAddress: "divya.joshi@example.com",
    panNumber: "ABCDE3456X",
    aadhaarNumber: "7788 9900 1122",
    customerType: "Universal",
    verificationStatus: "Verified",
    status: "Verified",
  },
  {
    id: 10,
    fullName: "Rohan Nair",
    dob: "1991-10-10",
    gender: "Male",
    mobileNumber: "+91 91888 99001",
    emailAddress: "rohan.nair@example.com",
    panNumber: "FGHIJ7890Y",
    aadhaarNumber: "8899 0011 2233",
    customerType: "Universal",
    verificationStatus: "Verified",
    status: "Active",
  }
];

// export const headers = [
//   {
//     title: "ID",
//     accessor: "id",
//     type: "string",
//   },
//   {
//     title: "Full Name",
//     accessor: "fullName",
//     type: "string",
//     is_filter: true,
//   },
//   {
//     title: "Date of Birth",
//     accessor: "dob",
//     type: "date",
//   },
//   {
//     title: "Gender",
//     accessor: "gender",
//     type: "string",
//   },
//   {
//     title: "Mobile Number",
//     accessor: "mobileNumber",
//     type: "string",
//     isCopy: true,
//   },
//   {
//     title: "Email Address",
//     accessor: "emailAddress",
//     type: "string",
//     isCopy: true,
//   },
//   {
//     title: "PAN Number",
//     accessor: "panNumber",
//     type: "string",
//   },
//   {
//     title: "Aadhaar Number",
//     accessor: "aadhaarNumber",
//     type: "string",
//   },
//   {
//     title: "Status",
//     accessor: "status",
//     type: "special",
//   },
//   {
//     title: "Action",
//     accessor: "action",
//     type: "special",
//     is_filter: false,
//     width: 100,
//     specialCellRowFunction: (row) => null,
//   },
// ];

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
      accessor: "email",
      type: "string",
      isCopy: true,
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
  { value: "private", label: "Private" },
  { value: "commercial", label: "Commercial" },
];

export const paymentStatusOptions = [
  { value: "done", label: "Done" },
  { value: "pending", label: "Pending" },
];

export const CommissionStatusOptions = [
  { value: "pending", label: "Pending" },
  { value: "received", label: "Received" },
];

export const insuranceCompanyOptions = [
  { label: "Bajaj General Insurance", value: "Bajaj General Insurance Limited" },
  { label: "Magma General Insurance", value: "Magma General Insurance Limited" },
  { label: "Tata AIG", value: "Tata AIG General Insurance Company Limited" },
  { label: "Go Digit", value: "Go Digit General Insurance Limited" },
  { label: "Shriram General Insurance", value: "Shriram General Insurance Company Limited" },
  { label: "Royal Sundaram", value: "Royal Sundaram General Insurance Company Limited" },
  { label: "Universal Sompo", value: "Universal Sompo General Insurance Company Limited" },
  { label: "Cholamandalam MS", value: "Cholamandalam MS General Insurance Company Limited" },
  { label: "IFFCO-Tokio", value: "IFFCO-Tokio General Insurance Company Limited" },
  { label: "New India Assurance", value: "The New India Assurance Company Limited" },
];


