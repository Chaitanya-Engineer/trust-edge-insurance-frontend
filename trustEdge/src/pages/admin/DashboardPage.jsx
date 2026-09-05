import React from "react";
import { DUMMY_DASHBOARD } from "../admin/constant";
import KPICard from "../../component/core_components/KpiCardComponent/KPICard";
import LineChart from "../../component/core_components/ChartComponent/LineChart";
import DonutChart from "../../component/core_components/ChartComponent/DonutChart";
import {
  Users,
  ShieldCheck,
  FileWarning,
  IndianRupee,
  FileText,
  ArrowUpRight,
} from "lucide-react";

// ─── Format Date ─────────────────────────────────────────────
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

// ─── Time Ago ─────────────────────────────────────────────────
const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

const DashboardPage = () => {
  const dashboard = DUMMY_DASHBOARD;
  const {
    stats,
    monthly_signups,
    plan_distribution,
    recent_users,
    pending_documents,
  } = dashboard;
  return (
    <div className="space-y-6">
      {/* ── Page Title ─────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="text-[24px] font-bold text-[#0B2545] tracking-tight">Dashboard</h2>
        <p className="text-[12px] text-[#667085] mt-1">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <KPICard
          title="Total Users"
          value={stats.total_users}
          subtitle="↑ 12 registered today"
          color="blue"
          icon={<Users className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Active Policies"
          value={stats.active_policies}
          subtitle="↑ 5 new this week"
          color="green"
          icon={<ShieldCheck className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Pending Documents"
          value={stats.pending_documents}
          subtitle="⚠ Review required"
          color="yellow"
          icon={<FileWarning className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Total Revenue"
          value={stats.total_revenue}
          subtitle="↑ 8% this month"
          color="green"
          prefix="₹"
          icon={<IndianRupee className="w-[18px] h-[18px]" />}
        />
      </div>

      {/* ── Charts Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <LineChart
            title="New User Registrations"
            data={monthly_signups}
            xKey="month"
            yKey="users"
            color="#0B2545"
            height="280px"
          />
        </div>
        <div className="lg:col-span-1">
          <DonutChart
            title="Plan Distribution"
            data={plan_distribution}
            height="280px"
          />
        </div>
      </div>

      {/* ── Bottom Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Users */}
        <div className="bg-white border border-[rgba(11,37,69,0.05)] rounded-[14px] shadow-[0_4px_20px_rgba(11,37,69,0.04)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(11,37,69,0.05)] bg-white rounded-t-[14px]">
            <p className="text-[15px] font-semibold text-[#0B2545]">Recent Users</p>
            <a
              href="/admin/user-dashboard"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0B2545] border border-[rgba(11,37,69,0.12)] rounded-[9px] px-3 py-1.5 bg-white hover:bg-[#f0f4f8] transition-colors"
            >
              View all <ArrowUpRight className="w-3 h-3 text-[#0B2545]" />
            </a>
          </div>
          <div className="divide-y divide-[rgba(11,37,69,0.05)] bg-white">
            {recent_users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-[#f0f4f8] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] bg-[#EAF0F6] rounded-[9px] flex items-center justify-center flex-shrink-0">
                    <span className="text-[#0B2545] text-xs font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0B2545]">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-[#667085] font-normal">{user.email}</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#667085] font-medium">
                  {timeAgo(user.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white border border-[rgba(11,37,69,0.05)] rounded-[14px] shadow-[0_4px_20px_rgba(11,37,69,0.04)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(11,37,69,0.05)] bg-white rounded-t-[14px]">
            <p className="text-[15px] font-semibold text-[#0B2545]">
              Pending Documents
            </p>
            <a
              href="/admin/documents"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0B2545] border border-[rgba(11,37,69,0.12)] rounded-[9px] px-3 py-1.5 bg-white hover:bg-[#f0f4f8] transition-colors"
            >
              View all <ArrowUpRight className="w-3 h-3 text-[#0B2545]" />
            </a>
          </div>
          <div className="divide-y divide-[rgba(11,37,69,0.05)] bg-white">
            {pending_documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-[#f0f4f8] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-[34px] h-[34px] bg-[#FBF5DF] rounded-[9px] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-[#C9A227]" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[#0B2545]">
                      {doc.user_name}
                    </p>
                    <p className="text-[11px] text-[#667085] font-normal">{doc.document_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#667085] font-medium">
                    {formatDate(doc.uploaded_at)}
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#FBF5DF] text-[#C9A227] text-[11px] rounded-full font-bold">
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
