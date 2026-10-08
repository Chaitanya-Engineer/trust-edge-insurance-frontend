import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { IndianRupee, TrendingUp, AlertCircle, ShieldCheck, Wallet } from "lucide-react";

export default function FinancialOverviewTab({ financials }) {
  const [trendView, setTrendView] = useState("monthly");
  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  const trendData = [
    { period: "Oct 2025", total: 145000 },
    { period: "Nov 2025", total: 168000 },
    { period: "Dec 2025", total: 182000 },
    { period: "Jan 2026", total: 195000 },
    { period: "Feb 2026", total: 215000 },
    { period: "Mar 2026", total: financials.totalCollected || 238000 },
  ];

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#0B2545",
      borderColor: "#0B2545",
      textStyle: { color: "#ffffff", fontSize: 12 },
      formatter: "{b}: ₹{c}",
    },
    grid: { top: 25, left: "2%", right: "3%", bottom: "3%", containLabel: true },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: trendData.map((d) => d.period),
      axisLine: { lineStyle: { color: "#CBD5E1" } },
      axisLabel: { color: "#667085", fontSize: 11 },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#E5E9E7", type: "dashed" } },
      axisLabel: {
        color: "#667085",
        fontSize: 11,
        formatter: (val) => `₹${(val / 1000).toFixed(0)}k`,
      },
    },
    series: [
      {
        name: "Premium Inflow",
        type: "line",
        smooth: true,
        data: trendData.map((d) => d.total),
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { width: 3, color: "#0B2545" },
        itemStyle: { color: "#0B2545", borderColor: "#fff", borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: "rgba(11, 37, 69, 0.22)" },
              { offset: 1, color: "rgba(11, 37, 69, 0.0)" },
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Financial KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Premium Collected */}
        <div className="bg-[#0B2545] text-white rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
              Total Premium Collected
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <IndianRupee className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <div className="text-[26px] font-extrabold tracking-tight">
              ₹{formatINR(financials.totalCollected)}
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                <TrendingUp className="w-3 h-3" />
                +14.8%
              </span>
              <span className="text-[11px] text-gray-300">Direct realized revenue</span>
            </div>
          </div>
        </div>

        {/* Gross Written Premium */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Gross Written Premium
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF0F6] text-[#0B2545] flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold text-[#0B2545]">
              ₹{formatINR(financials.grossWritten)}
            </div>
            <p className="text-[11px] text-[#667085] mt-1">
              Total underwritten value of policies
            </p>
          </div>
        </div>

        {/* Outstanding Pending */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Outstanding Premium
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#FBF5DF] text-[#C9A227] flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold text-[#B54708]">
              ₹{formatINR(financials.outstanding)}
            </div>
            <p className="text-[11px] text-[#667085] mt-1">
              Pending collections in grace period
            </p>
          </div>
        </div>

        {/* Net Retained Position */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Net Retained Position
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#EAF4EC] text-[#2F6F3E] flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-[24px] font-extrabold text-[#2F6F3E]">
              ₹{formatINR(financials.netRetained)}
            </div>
            <p className="text-[11px] text-[#667085] mt-1">
              Collected minus settled claims
            </p>
          </div>
        </div>
      </div>

      {/* Financial Chart + Money Received vs Outstanding */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Trend Area Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E9E7] mb-3">
            <div>
              <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider">
                Premium Collection Trend
              </h3>
              <p className="text-[11px] text-[#667085]">
                Cash inflows over recent reporting intervals
              </p>
            </div>
          </div>
          <ReactECharts option={option} style={{ height: "260px" }} />
        </div>

        {/* Inflows vs Outstanding Breakdown */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-bold text-[#0B2545] uppercase tracking-wider pb-2 border-b border-[#E5E9E7]">
              Reconciliation Summary
            </h3>
            <div className="space-y-3 pt-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAFCFA] border border-[#CDE5D2]">
                <div>
                  <div className="font-bold text-[#2F6F3E]">Money Received (Cleared)</div>
                  <div className="text-[11px] text-[#667085]">UPI, Cards, Cheques cleared</div>
                </div>
                <div className="text-sm font-extrabold text-[#2F6F3E]">
                  ₹{formatINR(financials.totalCollected)}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FFFDF9] border border-[#F9DBAF]">
                <div>
                  <div className="font-bold text-[#B54708]">Money Outstanding (Pending)</div>
                  <div className="text-[11px] text-[#667085]">Uncollected grace premiums</div>
                </div>
                <div className="text-sm font-extrabold text-[#B54708]">
                  ₹{formatINR(financials.outstanding)}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FDECEC] border border-[#FCD2D2]">
                <div>
                  <div className="font-bold text-[#B42318]">Claims Settled Outflow</div>
                  <div className="text-[11px] text-[#667085]">Disbursed to policy holders</div>
                </div>
                <div className="text-sm font-extrabold text-[#B42318]">
                  ₹{formatINR(financials.claimsPaid)}
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E5E9E7] flex items-center justify-between text-xs font-bold">
            <span className="text-[#0B2545]">Net Underwriting Cashflow:</span>
            <span className="text-[#2F6F3E] font-mono text-sm">
              +₹{formatINR(financials.netRetained)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
