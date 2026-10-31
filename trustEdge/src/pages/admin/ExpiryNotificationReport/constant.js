import { getStatusPill } from "../UserDashboardPage/constant";

export const Header = [
  {
    title: "Policy ID",
    accessor: "policy_id",
    type: "string",
    isCopy: true,
    width: 140,
  },
  {
    title: "Policy Name",
    accessor: "policy_name",
    type: "string",
    is_filter: true,
    width: 220,
    text_wrap: true,
  },
  {
    title: "Customer Name",
    accessor: "customer_name",
    type: "string",
    is_filter: true,
    width: 180,
  },
  {
    title: "Category",
    accessor: "category",
    type: "string",
    is_filter: true,
    width: 150,
  },
  {
    title: "Premium Amount",
    accessor: "premium_amount",
    type: "string",
    width: 150,
  },
  {
    title: "Expiry Date",
    accessor: "expiry_date",
    type: "date",
    width: 160,
  },
  {
    title: "Contact No.",
    accessor: "customer_phone",
    type: "string",
    width: 160,
    isCopy:true
  },
  {
    title: "Remaining Days",
    accessor: "remaining_days",
    type: "number",
    width: 150,
    text_align:'center'
  },
  {
    title: "Status",
    accessor: "status",
    type: "special",
    width: 145,
    specialCellRowFunction: (row) => getStatusPill(row?.status),
  },
  /*
  {
    title: "Created By",
    accessor: "created_by",
    type: "string",
    width: 200,
  },
 */
];