import { getStatusPill } from "../UserDashboardPage/constant";

export const Header = [
     {
    title: "Policy ID",
    accessor: "policy_id",
    type: "string",
    isCopy: true,
    width: 130,
  },
   {
    title: "Policy Name",
    accessor: "policy_name",
    type: "string",
    is_filter: true,
    width: 250,
    text_wrap: true,
  },
  {
    title: "Customer ID",
    accessor: "customer_id",
    type: "string",
    isCopy: true,
    width: 180,
  },
  {
    title: "Customer Name",
    accessor: "customer_name",
    type: "string",
    is_filter: true,
    width: 170,
  },
  {
    title: "Category",
    accessor: "category",
    type: "string",
    is_filter: true,
    width: 160,
  },
  {
    title: "Sub Type",
    accessor: "sub_type",
    type: "string",
    is_filter: true,
    width: 160,
  },
  {
    title: "Premium Amount",
    accessor: "premium_amount",
    type: "string",
    width: 180,
  },
  {
    title: "Expiry Date",
    accessor: "expiry_date",
    type: "date",
    width: 200,
  },
  {
    title: "Status",
    accessor: "status",
    type: "special",
    width: 145,
    specialCellRowFunction: (row) => getStatusPill(row?.status),
  },
  {
    title: "Remaining Days",
    accessor: "remaining_days",
    type: "string",
    width: 200,
  },
  {
    title: "Created By",
    accessor: "created_by",
    type: "string",
    width: 200,
  },
];