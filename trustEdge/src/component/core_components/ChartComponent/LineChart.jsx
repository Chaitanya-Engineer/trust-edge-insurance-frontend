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
      backgroundColor: "#0B2545",
      borderColor: "#0B2545",
      textStyle: { color: "#ffffff", fontSize: 12 },
      axisPointer: { type: "line" },
    },
    grid: {
      top: 20,
      right: 15,
      bottom: 30,
      left: 40,
    },
    xAxis: {
      type: "category",
      data: data?.map((d) => d[xKey]),
      axisLine: { lineStyle: { color: "#E8ECEB" } },
      axisLabel: { color: "#718096", fontSize: 11 },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: "#E8ECEB" } },
      axisLabel: { color: "#718096", fontSize: 11 },
    },
    series: [
      {
        data: data?.map((d) => d[yKey]),
        type: "line",
        smooth: smooth,
        symbol: "circle",
        symbolSize: 6,
        lineStyle: { color: color, width: 2.5 },
        itemStyle: { color: color, borderColor: "#fff", borderWidth: 2 },
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: color + "20" }, // 12% opacity
              { offset: 1, color: color + "00" }, // 0% opacity
            ],
          },
        },
      },
    ],
  };

  return (
    <div className="bg-white border border-[rgba(11,37,69,0.05)] rounded-[14px] shadow-[0_4px_20px_rgba(11,37,69,0.04)] p-[20px]">
      {title && (
        <p className="text-[14px] font-semibold text-[#0B2545] mb-4">{title}</p>
      )}
      <ReactECharts
        option={option}
        style={{ height }}
        showLoading={loading}
        loadingOption={{
          text: "",
          color: "#0B2545",
          maskColor: "rgba(255,255,255,0.8)",
        }}
      />
    </div>
  );
}
