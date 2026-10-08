import React, { useState } from "react";
import { X } from "lucide-react";
import TableComponent from "../TableComponent/TableComponent";
import { ModalHeader } from "../../../pages/admin/UserDashboardPage/constant";

const ModalComponent = ({
  title,
  header = [],
  countName,
  data = [],
  handleClose,
}) => {
  const [dataSourceSize, setDataSourceSize] = useState(0);
  console.log("data", data);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">
              {countName}: {dataSourceSize}
            </p>
          </div>

          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={20} />
          </button>
        </div>

        {/* Policy Table */}
        <div className="max-h-[65vh] overflow-auto p-6">
          <TableComponent
            fixed
            defaultHeaders={header}
            dataSource={data}
            dataSourceSize={setDataSourceSize}
            emptyTitle="No Policies Found"
            emptyDescription="No registered policies were found for this customer."
          />
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
