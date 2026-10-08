import React from "react";
import ReactECharts from "echarts-for-react";
import { Shield, ShieldAlert, ShieldCheck, Sparkles, RefreshCw } from "lucide-react";
import { MASTER_CATEGORY_DISTRIBUTION } from "../constant";

export default function PolicyPerformanceSection({ policyStats, loading }) {
  const chartColors = ["#0B2545", "#2F6F3E", "#C9A227", "#0E2F52", "#5FA968", "#E4C765"];

  const donutOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#0B2545",
      borderColor: "#0B2545",
      textStyle: { color: "#ffffff", fontSize: 12 },
      formatter: "{b}: {c}% ({d}%)",
    },
    legend: {
      orient: "vertical",
      right: 10,
      top: "center",
      textStyle: { color: "#475569", fontSize: 11, fontWeight: 500 },
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 12,
      formatter: (name) => {
        const item = MASTER_CATEGORY_DISTRIBUTION.find((c) => c.name === name);
        return `${name} (${item ? item.value : 0}%)`;
      },
    },
    series: [
      {
        name: "Policy Category",
        type: "pie",
        radius: ["50%", "72%"],
        center: ["34%", "50%"],
        avoidLabelOverlap: false,
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 13,
            fontWeight: "bold",
            color: "#0B2545",
            formatter: "{b}\n{d}%",
          },
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0,0,0,0.15)",
          },
        },
        labelLine: { show: false },
        data: MASTER_CATEGORY_DISTRIBUTION.map((item, idx) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: chartColors[idx % chartColors.length] },
        })),
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#0B2545]" />
            Policy Performance & Category Distribution
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Active portfolio health and underwritten risk distribution across lines of business.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side: Policy KPI Counters */}
        <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
          {/* Total Policies */}
          <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#E5E9E7]">
            <div className="flex items-center justify-between text-[#667085] text-xs font-semibold mb-1">
              <span>Total Policies</span>
              <Shield className="w-3.5 h-3.5 text-[#0B2545]" />
            </div>
            <p className="text-xl font-bold text-[#0B2545]">
              {policyStats.total.toLocaleString("en-IN")}
            </p>
            <span className="text-[10px] text-gray-400">Total written</span>
          </div>

          {/* Active Policies */}
          <div className="p-3.5 rounded-xl bg-[#EAF4EC] border border-[#CDE5D2]">
            <div className="flex items-center justify-between text-[#2F6F3E] text-xs font-semibold mb-1">
              <span>Active Policies</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F6F3E]" />
            </div>
            <p className="text-xl font-bold text-[#2F6F3E]">
              {policyStats.active.toLocaleString("en-IN")}
            </p>
            <span className="text-[10px] text-[#2F6F3E]/80">83.1% in force</span>
          </div>

          {/* Expired Policies */}
          <div className="p-3.5 rounded-xl bg-[#FDECEC] border border-[#FCD2D2]">
            <div className="flex items-center justify-between text-[#B42318] text-xs font-semibold mb-1">
              <span>Expired Policies</span>
              <ShieldAlert className="w-3.5 h-3.5 text-[#B42318]" />
            </div>
            <p className="text-xl font-bold text-[#B42318]">
              {policyStats.expired.toLocaleString("en-IN")}
            </p>
            <span className="text-[10px] text-[#B42318]/80">Lapsed / Non-renewed</span>
          </div>

          {/* New Policies */}
          <div className="p-3.5 rounded-xl bg-[#EAF0F6] border border-[#D5E2EE]">
            <div className="flex items-center justify-between text-[#0B2545] text-xs font-semibold mb-1">
              <span>New Policies</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <p className="text-xl font-bold text-[#0B2545]">
              +{policyStats.newPolicies}
            </p>
            <span className="text-[10px] text-[#667085]">Added this month</span>
          </div>

          {/* Renewed Policies */}
          <div className="p-3.5 rounded-xl bg-[#FBF5DF] border border-[#F4E3A9] col-span-2 sm:col-span-1 lg:col-span-2">
            <div className="flex items-center justify-between text-[#C9A227] text-xs font-semibold mb-1">
              <span>Renewed Policies</span>
              <RefreshCw className="w-3.5 h-3.5 text-[#C9A227]" />
            </div>
            <p className="text-xl font-bold text-[#946C00]">
              {policyStats.renewed}
            </p>
            <span className="text-[10px] text-[#946C00]/80">Retained renewals</span>
          </div>
        </div>

        {/* Right Side: ECharts Donut Breakdown */}
        <div className="lg:col-span-7 bg-[#FAFCFB] rounded-xl border border-[#E5E9E7] p-2">
          <ReactECharts
            option={donutOption}
            style={{ height: "260px" }}
            showLoading={loading}
          />
        </div>
      </div>
    </div>
  );
}
