import React, { useEffect, useState } from "react";

import TableComponent from "../../../component/core_components/TableComponent/TableComponent";
import { Header } from "./constant";
import { useAPI } from "../../../lib/hooks/useAPI";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";

const ExpiryNotificationReport = () => {
  const [tableData, setTableData] = useState([]);

  const { callApi: ExpiredPolicyList, isLoading: isTableLoading } = useAPI(
    API_ENDPOINTS?.ADMIN?.EXPIRED_POLICIES,
    {
      method: "GET",
      onSuccess: (response) => {
        console.log("resonse.result", response);
        if (response && response.length > 0) {
          setTableData(response);
        } else {
          setTableData([]);
        }
      },
      onFailure: (error) => {
        console.log("error", error);
        setTableData([]);
      },
    }
  );

  useEffect(() => {
    ExpiredPolicyList();
  }, []);
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-1">
        <h1 className="text-[26px] font-bold text-[#0B2545] font-sans tracking-tight">
          Expiry Notification Report
        </h1>
      </div>
      <div>
        <TableComponent
          fixed
          isSelection={false}
          isCheckbox={false}
          defaultHeaders={Header}
          dataSource={tableData}
          pagination={false}
          pageSize={5}
          loading={false}
          pageSizeOptions={[5, 10, 25, { value: -1, label: "All" }]}
        />
      </div>
    </div>
  );
};

export default ExpiryNotificationReport;
