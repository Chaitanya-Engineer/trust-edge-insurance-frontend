const colorMap = {
  blue: { bg: "bg-[#EAF0F6]", text: "text-[#0B2545]" },
  green: { bg: "bg-[#EAF4EC]", text: "text-[#2F6F3E]" },
  yellow: { bg: "bg-[#FBF5DF]", text: "text-[#C9A227]" },
  red: { bg: "bg-[#FDECEC]", text: "text-[#B42318]" },
  purple: { bg: "bg-[#F3E8FF]", text: "text-[#7C3AED]" },
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
  loading = false,
  prefix = "",
  suffix = "",
}) {
  const c = colorMap[color] || colorMap.blue;

  if (loading) {
    return (
      <div className="bg-white rounded-[14px] p-5 border border-[rgba(11,37,69,0.05)] shadow-[0_4px_20px_rgba(11,37,69,0.04)] animate-pulse">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="w-[34px] h-[34px] bg-gray-200 rounded-[9px]" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
    );
  }

  // Determine sub-badge colors based on indicator content
  let badgeClass = "bg-[#EAF0F6] text-[#0B2545]";
  if (subtitle) {
    if (subtitle.includes("↑") || subtitle.toLowerCase().includes("new")) {
      badgeClass = "bg-[#EAF4EC] text-[#2F6F3E]";
    } else if (subtitle.includes("⚠") || subtitle.toLowerCase().includes("review")) {
      badgeClass = "bg-[#FBF5DF] text-[#C9A227]";
    }
  }

  return (
    <div className="bg-white rounded-[14px] p-5 border border-[rgba(11,37,69,0.05)] shadow-[0_4px_20px_rgba(11,37,69,0.04)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(11,37,69,0.08)] flex flex-col justify-between">
      {/* Top Row — Title + Icon */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[12px] font-medium text-[#667085] tracking-wide">{title}</p>
        <div className={`w-[34px] h-[34px] ${c.bg} ${c.text} rounded-[9px] flex items-center justify-center flex-shrink-0`}>
          <span className="w-4.5 h-4.5 flex items-center justify-center">{icon}</span>
        </div>
      </div>

      {/* Value & Subtitle Badge */}
      <div>
        <p className="text-[28px] font-bold text-[#0B2545] leading-tight mb-2">
          {prefix}
          {typeof value === "number" ? value.toLocaleString("en-IN") : value}
          {suffix}
        </p>

        {subtitle && (
          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${badgeClass}`}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}
