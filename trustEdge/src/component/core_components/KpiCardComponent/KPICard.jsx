// ─── KPICard ──────────────────────────────────────────────────
//
// Usage:
// <KPICard
//   title="Total Users"
//   value={248}
//   subtitle="↑ 12 today"
//   icon={<svg>...</svg>}
//   color="blue"         // blue | green | yellow | red | purple
// />
// ─────────────────────────────────────────────────────────────

const colorMap = {
  blue:   { bg: "bg-blue-50",   icon: "bg-blue-600",   text: "text-blue-600"   },
  green:  { bg: "bg-green-50",  icon: "bg-green-600",  text: "text-green-600"  },
  yellow: { bg: "bg-yellow-50", icon: "bg-yellow-500", text: "text-yellow-600" },
  red:    { bg: "bg-red-50",    icon: "bg-red-500",    text: "text-red-600"    },
  purple: { bg: "bg-purple-50", icon: "bg-purple-600", text: "text-purple-600" },
};

export default function KPICard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
  loading = false,
  prefix = "",    // jaise "₹" for revenue
  suffix = "",    // jaise "%" for percentage
}) {
  const c = colorMap[color] || colorMap.blue;

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-gray-200 rounded w-24" />
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-16" />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}>

      {/* Top Row — Title + Icon */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <div className={`w-10 h-10 ${c.icon} rounded-lg flex items-center justify-center`}>
          <span className="text-white w-5 h-5">{icon}</span>
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl font-bold text-gray-900 mb-1">
        {prefix}
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
        {suffix}
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p className={`text-xs font-medium ${c.text}`}>{subtitle}</p>
      )}

    </div>
  );
}
