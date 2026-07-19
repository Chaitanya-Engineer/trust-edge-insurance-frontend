// ─── LineChart ────────────────────────────────────────────────
//
// Usage:
// <LineChart
//   title="New Users"
//   data={[
//     { month: "Jan", users: 12 },
//     { month: "Feb", users: 18 },
//   ]}
//   xKey="month"      // x axis ke liye key
//   yKey="users"      // y axis ke liye key
//   color="#2563eb"   // line color (optional)
// />
// ─────────────────────────────────────────────────────────────

import ReactECharts from "echarts-for-react";

export default function LineChart({
  title,
  data = [],
  xKey = "month",
  yKey = "value",
  color = "#2563eb",
  loading = false,
  height = "300px",
  smooth = true,
}) {

  // ECharts option object
  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: "#1f2937",
      borderColor: "#1f2937",
      textStyle: { color: "#f9fafb", fontSize: 12 },
      axisPointer: { type: "line" },
    },
    grid: {
      top: 10,
      right: 10,
      bottom: 30,
      left: 40,
    },
    xAxis: {
      type: "category",
      data: data.map((d) => d[xKey]),
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      axisLabel: { color: "#6b7280", fontSize: 11 },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
      axisLabel: { color: "#6b7280", fontSize: 11 },
    },
    series: [
      {
        data: data.map((d) => d[yKey]),
        type: "line",
        smooth: smooth,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: color, width: 2.5 },
        itemStyle: { color: color, borderColor: "#fff", borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: color + "33" },  // 20% opacity
              { offset: 1, color: color + "00" },  // 0% opacity
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
      {title && (
        <p className="text-sm font-semibold text-gray-700 mb-4">{title}</p>
      )}
      <ReactECharts
        option={option}
        style={{ height }}
        showLoading={loading}
        loadingOption={{
          text: "",
          color: "#2563eb",
          maskColor: "rgba(255,255,255,0.8)",
        }}
      />
    </div>
  );
}
