// ─── DonutChart ───────────────────────────────────────────────
//
// Usage:
// <DonutChart
//   title="Plan Distribution"
//   data={[
//     { name: "Health",  value: 40 },
//     { name: "Life",    value: 35 },
//     { name: "Vehicle", value: 25 },
//   ]}
// />
// ─────────────────────────────────────────────────────────────

import ReactECharts from "echarts-for-react";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];

export default function DonutChart({
  title,
  data = [],
  loading = false,
  height = "300px",
  centerText = "",   // donut ke beech mein text
}) {

  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: "#1f2937",
      borderColor: "#1f2937",
      textStyle: { color: "#f9fafb", fontSize: 12 },
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      bottom: 0,
      left: "center",
      textStyle: { color: "#6b7280", fontSize: 11 },
      icon: "circle",
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 16,
    },
    series: [
      {
        type: "pie",
        radius: ["45%", "70%"],   // donut shape
        center: ["50%", "45%"],
        avoidLabelOverlap: false,
        label: {
          show: !!centerText,
          position: "center",
          formatter: centerText,
          fontSize: 14,
          fontWeight: "bold",
          color: "#1f2937",
        },
        emphasis: {
          label: { show: true },
          itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,0,0,0.1)" },
        },
        labelLine: { show: false },
        data: data.map((item, index) => ({
          ...item,
          itemStyle: { color: COLORS[index % COLORS.length] },
        })),
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
