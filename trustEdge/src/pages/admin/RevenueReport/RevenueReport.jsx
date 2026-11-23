import { Fragment, useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import dayjs from "dayjs";
import LogoSpinner from "../../../component/core_components/LogoSpinner/LogoSpinner";
import CustomDateRangePicker from "../../../component/core_components/DatePicker/CustomDateRangePicker";
import { API_ENDPOINTS } from "../../../lib/constant/ApiEndpoints";
import { useAPI } from "../../../lib/hooks/useAPI";
import { showToast } from "../../../component/core_components/CustomToast/CustomToast";

// NOTE: import paths above follow PolicyDashboardPage.jsx.
// Adjust the "../../../" part to match where you place this file.

// ─── Helpers ──────────────────────────────────────────────────
const inr = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;

const CATEGORY_LABELS = {
  VEHICLE: "Motor",
  HEALTH: "Health",
  LIFE: "Life",
  OTHER: "Other",
};

const categoryFilterOptions = [
  { value: "", label: "All categories" },
  { value: "VEHICLE", label: "Motor" },
  { value: "HEALTH", label: "Health" },
  { value: "LIFE", label: "Life" },
  { value: "OTHER", label: "Other" },
];

const TONES = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  green: "border-green-100 bg-green-50 text-green-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
  slate: "border-slate-200 bg-white text-slate-700",
};

// ─── Small UI pieces ──────────────────────────────────────────
const StatCard = ({ title, value, hint, tone = "slate" }) => (
  <div className={`rounded-xl border p-4 shadow-sm ${TONES[tone]}`}>
    <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
      {title}
    </p>
    <p className="mt-2 text-2xl font-bold">{value}</p>
    {hint && <p className="mt-1 text-xs opacity-80">{hint}</p>}
  </div>
);

const Th = ({ children, right }) => (
  <th
    className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
      right ? "text-right" : "text-left"
    }`}
  >
    {children}
  </th>
);

const Td = ({ children, right, className = "" }) => (
  <td
    className={`px-4 py-2.5 text-sm text-slate-700 ${
      right ? "text-right" : "text-left"
    } ${className}`}
  >
    {children}
  </td>
);

const Section = ({ title, subtitle, children }) => (
  <div className="rounded-xl border border-[#E5E9E7] bg-white shadow-sm">
    <div className="border-b border-[#E5E9E7] px-5 py-4">
      <h2 className="text-base font-bold text-[#0B2545]">{title}</h2>
      {subtitle && <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>}
    </div>
    <div className="overflow-x-auto">{children}</div>
  </div>
);

const MoneyCells = ({ row, bold }) => (
  <>
    <Td right className={bold ? "font-semibold" : ""}>
      {row.policies}
    </Td>
    <Td right className={bold ? "font-semibold" : ""}>
      {inr(row.premium)}
    </Td>
    <Td right className={`text-green-700 ${bold ? "font-semibold" : ""}`}>
      {inr(row.commission_received)}
    </Td>
    <Td right className={`text-amber-700 ${bold ? "font-semibold" : ""}`}>
      {inr(row.commission_pending)}
    </Td>
  </>
);

// ─── Page ─────────────────────────────────────────────────────
const RevenueReport = () => {
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    category: "",
  });

  const {
    data,
    isLoading,
    error,
    callApi: fetchReport,
  } = useAPI(API_ENDPOINTS?.ADMIN?.REVENUE_REPORT, {
    method: "GET",
    onFailure: (err) =>
      showToast.error(
        "Report Failed",
        err?.response?.data?.error || "Could not load the revenue report."
      ),
  });

  // One API call whenever a filter changes. Empty filters = backend default
  // (current financial year, all categories).
  useEffect(() => {
    const params = {};
    if (filters.startDate)
      params.start_date = dayjs(filters.startDate).format("YYYY-MM-DD");
    if (filters.endDate)
      params.end_date = dayjs(filters.endDate).format("YYYY-MM-DD");
    if (filters.category) params.category = filters.category;
    fetchReport(params);
  }, [filters]);

  // Premium (big numbers) on the left axis as bars, commission (small numbers)
  // on the right axis as a line, so commission does not look flat.
  const chartOption = useMemo(() => {
    const rows = data?.monthly_trend || [];
    return {
      tooltip: { trigger: "axis" },
      legend: { bottom: 0 },
      grid: { top: 30, right: 56, bottom: 44, left: 64 },
      xAxis: { type: "category", data: rows.map((r) => r.label) },
      yAxis: [
        { type: "value", name: "Premium (₹)" },
        {
          type: "value",
          name: "Commission (₹)",
          position: "right",
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: "Premium Collected",
          type: "bar",
          barWidth: "50",
          data: rows.map((r) => r?.premium_collected),
          itemStyle: { color: "#2563eb", borderRadius: [5, 5, 0, 0] },
        },
        {
          name: "Commission Sent",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          data: rows.map((r) => r.commission_received),
          itemStyle: { color: "#16a34a" },
          lineStyle: { width: 3 },
        },
      ],
    };
  }, [data]);

  const summary = data?.summary;

  return (
    <div className="flex w-full flex-col gap-5">
      {/* Header + filters */}
      <div className="flex flex-col gap-3 p-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-[26px] font-bold tracking-tight text-[#0B2545]">
            Revenue Report
          </h1>
          <p className="mt-0.5 text-xs text-[#667085]">
            Premium collected and commission status for policies issued in the
            selected period.
            {data?.filters &&
              ` Showing ${dayjs(data.filters.start_date).format(
                "DD MMM YYYY"
              )} to ${dayjs(data.filters.end_date).format("DD MMM YYYY")}.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, category: e.target.value }))
            }
            className="h-[38px] rounded-[8px] border border-[#E5E9E7] bg-white px-3 text-[13px] text-[#0B2545] outline-none"
          >
            {categoryFilterOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <div className="w-52 shrink-0 sm:w-60">
            <CustomDateRangePicker
              startDate={filters.startDate}
              endDate={filters.endDate}
              onChange={({ startDate, endDate }) =>
                setFilters((prev) => ({ ...prev, startDate, endDate }))
              }
            />
          </div>
        </div>
      </div>

      {error && !data ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
          Could not load the report. Please try again.
        </div>
      ) : isLoading || !data ? (
        <div className="flex min-h-[40vh] items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
          <LogoSpinner type="spin" size="md" />
        </div>
      ) : (
        <>
          {/* 1. Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Total Premium"
              value={inr(summary.premium)}
              hint={`${summary.policies} policies`}
              tone="blue"
            />
            <StatCard
              title="Premium Collected"
              value={inr(summary.premium_collected)}
              hint="Paid (cheques not cleared are excluded)"
              tone="green"
            />
            <StatCard
              title="Premium Pending"
              value={inr(summary.premium_pending)}
              hint="Yet to be collected from customers"
              tone="amber"
            />
            <StatCard
              title="Commission Sent"
              value={inr(summary.commission_received)}
              hint="Status: Sent"
              tone="green"
            />
            <StatCard
              title="Commission Pending"
              value={inr(summary.commission_pending)}
              hint="Status: Pending"
              tone="amber"
            />
            <StatCard
              title="Commission Not Entered"
              value={summary.commission_not_entered}
              hint="Policies with no commission amount"
              tone="slate"
            />
          </div>

          {/* 2. Monthly trend */}
          <Section
            title="Monthly Trend"
            subtitle="Premium is shown in the month it was paid; commission in the month it was sent."
          >
            {data.monthly_trend.length === 0 ? (
              <p className="p-6 text-center text-sm text-slate-400">
                No collections in this period.
              </p>
            ) : (
              <div className="p-4">
                <ReactECharts option={chartOption} style={{ height: 320 }} />
              </div>
            )}
          </Section>

          {/* 3. Category-wise */}
          <Section
            title="Category-wise"
            subtitle="Motor / Health / Life with sub-type breakup."
          >
            <table className="w-full min-w-[640px]">
              <thead className="bg-slate-50">
                <tr>
                  <Th>Category / Sub-type</Th>
                  <Th right>Policies</Th>
                  <Th right>Premium</Th>
                  <Th right>Commission Sent</Th>
                  <Th right>Commission Pending</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.category_wise.length === 0 && (
                  <tr>
                    <Td className="py-6 text-center text-slate-400">
                      No policies in this period.
                    </Td>
                  </tr>
                )}
                {data.category_wise.map((cat) => (
                  <Fragment key={cat.category}>
                    <tr className="bg-slate-50/70">
                      <Td className="font-semibold">
                        {CATEGORY_LABELS[cat.category] || cat.category}
                      </Td>
                      <MoneyCells row={cat} bold />
                    </tr>
                    {cat.sub_types.map((sub) => (
                      <tr key={`${cat.category}-${sub.sub_type}`}>
                        <Td className="pl-8 text-slate-500">{sub.sub_type}</Td>
                        <MoneyCells row={sub} />
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </Section>

          {/* 4. Insurance company-wise */}
          <Section
            title="Insurance Company-wise"
            subtitle="Which company's commission is sent and which is still pending."
          >
            <table className="w-full min-w-[640px]">
              <thead className="bg-slate-50">
                <tr>
                  <Th>Insurance Company</Th>
                  <Th right>Policies</Th>
                  <Th right>Premium</Th>
                  <Th right>Commission Sent</Th>
                  <Th right>Commission Pending</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.insurer_wise.length === 0 && (
                  <tr>
                    <Td className="py-6 text-center text-slate-400">
                      No policies in this period.
                    </Td>
                  </tr>
                )}
                {data.insurer_wise.map((row) => (
                  <tr key={row.insurer}>
                    <Td className="font-medium">{row.insurer}</Td>
                    <MoneyCells row={row} />
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </>
      )}
    </div>
  );
};

export default RevenueReport;
