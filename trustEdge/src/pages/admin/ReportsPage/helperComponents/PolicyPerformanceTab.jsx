import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { Shield, ShieldCheck, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import NoDataFound from "../../../../component/core_components/NoDataFound/NoDataFound";

export default function PolicyPerformanceTab({
  policies,
  policyCounters,
  categoryDistribution,
  onResetFilters,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const totalPages = Math.ceil(policies.length / pageSize) || 1;
  const paginatedPolicies = policies.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");
  const chartColors = ["#0B2545", "#2F6F3E", "#C9A227", "#0E2F52", "#5FA968", "#E4C765"];

  const donutOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#0B2545",
      borderColor: "#0B2545",
      textStyle: { color: "#ffffff", fontSize: 12 },
      formatter: (p) => `${p.name}: ₹${Number(p.value).toLocaleString("en-IN")} (${p.percent}%)`,
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
      textStyle: { color: "#475569", fontSize: 11, fontWeight: 500 },
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 10,
    },
    series: [
      {
        name: "Policy Category",
        type: "pie",
        radius: ["50%", "72%"],
        center: ["32%", "50%"],
        avoidLabelOverlap: false,
        label: { show: false },
        data: categoryDistribution.map((item, idx) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: chartColors[idx % chartColors.length] },
        })),
      },
    ],
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Policy Counters & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Side: Summary Badges */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white border border-[#E5E9E7] shadow-sm">
            <span className="text-[11px] font-bold text-[#667085] uppercase block mb-1">
              Total Policies
            </span>
            <p className="text-2xl font-bold text-[#0B2545]">{policyCounters.total}</p>
            <span className="text-[10px] text-gray-400">Underwritten entries</span>
          </div>

          <div className="p-4 rounded-xl bg-[#EAF4EC] border border-[#CDE5D2] shadow-sm">
            <span className="text-[11px] font-bold text-[#2F6F3E] uppercase block mb-1">
              Active Policies
            </span>
            <p className="text-2xl font-bold text-[#2F6F3E]">{policyCounters.active}</p>
            <span className="text-[10px] text-[#2F6F3E]/80">Valid in force</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF6EE] border border-[#F9DBAF] shadow-sm">
            <span className="text-[11px] font-bold text-[#B54708] uppercase block mb-1">
              Review Required
            </span>
            <p className="text-2xl font-bold text-[#B54708]">{policyCounters.review}</p>
            <span className="text-[10px] text-[#B54708]/80">Pending verification</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FDECEC] border border-[#FCD2D2] shadow-sm">
            <span className="text-[11px] font-bold text-[#B42318] uppercase block mb-1">
              Expired
            </span>
            <p className="text-2xl font-bold text-[#B42318]">{policyCounters.expired}</p>
            <span className="text-[10px] text-[#B42318]/80">Lapsed coverage</span>
          </div>
        </div>

        {/* Right Side: Category Donut */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E9E7] p-4 shadow-sm">
          <h4 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider pb-2 border-b border-[#E5E9E7]">
            Category Volume Share
          </h4>
          <ReactECharts option={donutOption} style={{ height: "200px" }} />
        </div>
      </div>

      {/* Underwritten Policies Table */}
      <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E9E7]">
          <div>
            <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
              Underwritten Policy Portfolio
            </h3>
            <p className="text-[11px] text-[#667085]">
              Real-time portfolio registry showing customer details, line of business, and premium.
            </p>
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-gray-100 text-[#0B2545]">
            {policies.length} Policies
          </span>
        </div>

        {policies.length === 0 ? (
          <NoDataFound
            title="No policies match the selected filter"
            description="Try changing the category or partner filter to view matching policy records."
            onClearFilters={onResetFilters}
            compact={true}
          />
        ) : (
          <>
            <div className="overflow-x-auto rounded-xl border border-[#E5E9E7]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAF9] text-[#667085] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E9E7]">
                    <th className="py-3 px-3.5">Policy ID</th>
                    <th className="py-3 px-3.5">Policy Holder</th>
                    <th className="py-3 px-3.5">Policy Name</th>
                    <th className="py-3 px-3.5">Category</th>
                    <th className="py-3 px-3.5">Partner</th>
                    <th className="py-3 px-3.5 text-right">Premium (₹)</th>
                    <th className="py-3 px-3.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E9E7]">
                  {paginatedPolicies.map((p) => (
                    <tr key={p.policy_id} className="hover:bg-[#F0F4F8] transition-colors">
                      <td className="py-3 px-3.5 font-mono font-bold text-[#0B2545]">
                        {p.policy_id}
                      </td>
                      <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                        {p.customer_name}
                        <div className="text-[10px] font-normal text-gray-400 font-mono">
                          {p.customer_id}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 font-semibold text-[#0B2545]">
                        {p.policy_name}
                      </td>
                      <td className="py-3 px-3.5">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-[#0B2545] font-medium text-[11px]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#475569] font-medium">{p.partner}</td>
                      <td className="py-3 px-3.5 text-right font-bold text-[#0B2545] font-mono">
                        ₹{formatINR(p.premium_amount)}
                      </td>
                      <td className="py-3 px-3.5 text-center">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                            p.status === "Active"
                              ? "bg-[#EAF4EC] text-[#2F6F3E] border-[#CDE5D2]"
                              : p.status === "Expired"
                              ? "bg-[#FDECEC] text-[#B42318] border-[#FCD2D2]"
                              : "bg-[#FEF6EE] text-[#B54708] border-[#F9DBAF]"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between text-xs text-[#667085] pt-2">
                <span>
                  Showing {(currentPage - 1) * pageSize + 1} to{" "}
                  {Math.min(currentPage * pageSize, policies.length)} of {policies.length} policies
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="px-2.5 py-1 rounded-md border border-[#E5E9E7] hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
                  >
                    Previous
                  </button>
                  <span className="px-2 font-semibold text-[#0B2545]">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="px-2.5 py-1 rounded-md border border-[#E5E9E7] hover:bg-gray-100 disabled:opacity-50 transition cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
