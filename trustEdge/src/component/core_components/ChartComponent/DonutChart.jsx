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

const COLORS = ["#0B2545", "#2F6F3E", "#C9A227", "#0E2F52", "#5FA968", "#E4C765"];

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
      backgroundColor: "#0B2545",
      borderColor: "#0B2545",
      textStyle: { color: "#ffffff", fontSize: 12 },
      formatter: "{b}: {c} ({d}%)",
    },
    legend: {
      bottom: 0,
      left: "center",
      textStyle: { color: "#718096", fontSize: 11 },
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
          color: "#0B2545",
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
