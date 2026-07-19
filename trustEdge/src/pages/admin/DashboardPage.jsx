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
      <div>
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          title="Total Users"
          value={stats.total_users}
          subtitle="↑ 12 registered today"
          color="blue"
          icon={<Users className="w-5 h-5" />}
        />
        <KPICard
          title="Active Policies"
          value={stats.active_policies}
          subtitle="↑ 5 new this week"
          color="green"
          icon={<ShieldCheck className="w-5 h-5" />}
        />
        <KPICard
          title="Pending Documents"
          value={stats.pending_documents}
          subtitle="⚠ Review required"
          color="yellow"
          icon={<FileWarning className="w-5 h-5" />}
        />
        <KPICard
          title="Total Revenue"
          value={stats.total_revenue}
          subtitle="↑ 8% this month"
          color="purple"
          prefix="₹"
          icon={<IndianRupee className="w-5 h-5" />}
        />
      </div>

      {/* ── Charts Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <LineChart
            title="New User Registrations"
            data={monthly_signups}
            xKey="month"
            yKey="users"
            color="#2563eb"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Users */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">Recent Users</p>
            <a
              href="/admin/users"
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recent_users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-xs font-semibold">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {timeAgo(user.created_at)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-700">
              Pending Documents
            </p>
            <a
              href="/admin/documents"
              className="flex items-center gap-1 text-xs text-blue-600 hover:underline font-medium"
            >
              View all <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {pending_documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {doc.user_name}
                    </p>
                    <p className="text-xs text-gray-400">{doc.document_type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    {formatDate(doc.uploaded_at)}
                  </span>
                  <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
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
