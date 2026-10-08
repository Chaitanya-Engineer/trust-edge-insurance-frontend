import React, { useState } from "react";
import ReactECharts from "echarts-for-react";
import { TrendingUp, Calendar, IndianRupee } from "lucide-react";
import {
  MONTHLY_PREMIUM_TREND,
  QUARTERLY_PREMIUM_TREND,
  YEARLY_PREMIUM_TREND,
} from "../constant";

export default function PremiumCollectionOverview() {
  const [viewInterval, setViewInterval] = useState("monthly"); // "monthly", "quarterly", "yearly"

  const activeData =
    viewInterval === "monthly"
      ? MONTHLY_PREMIUM_TREND
      : viewInterval === "quarterly"
      ? QUARTERLY_PREMIUM_TREND
      : YEARLY_PREMIUM_TREND;

  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#0B2545",
      borderColor: "#0B2545",
      textStyle: { color: "#ffffff", fontSize: 12 },
      formatter: (params) => {
        let title = `<div style="font-weight:bold;margin-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.2);padding-bottom:3px;">${params[0].axisValue}</div>`;
        params.forEach((p) => {
          title += `<div style="display:flex;justify-content:space-between;gap:16px;font-size:11px;">
            <span>${p.marker} ${p.seriesName}:</span>
            <span style="font-weight:bold;">₹${Number(p.value).toLocaleString("en-IN")}</span>
          </div>`;
        });
        return title;
      },
    },
    legend: {
      top: 0,
      right: 10,
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 14,
      textStyle: { color: "#667085", fontSize: 11, fontWeight: 500 },
    },
    grid: {
      top: 40,
      left: "2%",
      right: "3%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: activeData.map((d) => d.period),
      axisLine: { lineStyle: { color: "#CBD5E1" } },
      axisLabel: { color: "#667085", fontSize: 11, fontWeight: 500 },
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
        formatter: (val) => {
          if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
          if (val >= 100000) return `₹${(val / 100000).toFixed(0)} L`;
          return `₹${val}`;
        },
      },
    },
    series: [
      {
        name: "Total Collection",
        type: "line",
        smooth: true,
        data: activeData.map((d) => d.total),
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
      {
        name: "New Policy Premium",
        type: "line",
        smooth: true,
        data: activeData.map((d) => d.newPolicy),
        symbol: "circle",
        symbolSize: 5,
        lineStyle: { width: 2, color: "#2F6F3E", type: "dashed" },
        itemStyle: { color: "#2F6F3E" },
      },
      {
        name: "Renewal Premium",
        type: "line",
        smooth: true,
        data: activeData.map((d) => d.renewal),
        symbol: "circle",
        symbolSize: 5,
        lineStyle: { width: 2, color: "#C9A227", type: "dotted" },
        itemStyle: { color: "#C9A227" },
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
      {/* Header with Title and Interval Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#0B2545]" />
            Premium Collection Overview
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Gross inflow dynamics tracking new acquisitions, policy renewals, and total premium collection.
          </p>
        </div>

        {/* Interval Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#F4F7F6] p-1 rounded-xl border border-[#E5E9E7] self-start sm:self-auto">
          {[
            { label: "Monthly", value: "monthly" },
            { label: "Quarterly", value: "quarterly" },
            { label: "Yearly", value: "yearly" },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setViewInterval(item.value)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                viewInterval === item.value
                  ? "bg-[#0B2545] text-white shadow-2xs font-bold"
                  : "text-[#667085] hover:text-[#0B2545]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="w-full">
        <ReactECharts option={option} style={{ height: "320px", width: "100%" }} />
      </div>
    </div>
  );
}
