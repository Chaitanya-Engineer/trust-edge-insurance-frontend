import React, { useEffect, useState } from "react";
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
  ClockFading,
} from "lucide-react";
import { useAPI } from "../../lib/hooks/useAPI";
import { API_ENDPOINTS } from "../../lib/constant/ApiEndpoints";

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
  const { recent_users, pending_documents } = dashboard;
  const [dashboadData, setdashboardData] = useState({});
  const [recentUser, setRecentUser] = useState([]);
  const [pendingUserList, setPedingUserList] = useState([]);
  const { callApi: getDashBaordData } = useAPI(
    API_ENDPOINTS?.ADMIN?.ADMIN_DASHBOARD,
    {
      method: "GET",
      onSuccess: (response) => {
        setdashboardData(response);
        console.log("response", response);
      },
      onFailure: (error) => {
        console.log("error", error);
        setUserList([]);
      },
    }
  );
  const { callApi: AllUsersList, isLoading: userListLoading } = useAPI(
    API_ENDPOINTS?.ADMIN?.USERS_LIST,
    {
      method: "GET",
      onSuccess: (response) => {
        console.log("resonse.result", response);
        if (response && response.length > 0) {
          setRecentUser(response.slice(0, 5));
        } else {
          setRecentUser([]);
        }
      },
      onFailure: (error) => {
        console.log("error", error);
        setRecentUser([]);
      },
    }
  );

  const { callApi: PendingPolicyUsersList, isLoading: isPendingListLoading } =
    useAPI(API_ENDPOINTS?.ADMIN?.SHOW_PENDING_POLICY_USER, {
      method: "GET",
      onSuccess: (response) => {
        if (response) {
          console.log("first", response?.results);
          setPedingUserList(response?.results?.slice(0, 5));
        } else {
          setPedingUserList([]);
        }
      },
      onFailure: (error) => {
        console.log("error", error);
        setPedingUserList([]);
      },
    });

  useEffect(() => {
    getDashBaordData();
    AllUsersList();
    PendingPolicyUsersList();
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Page Title ─────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="text-[24px] font-bold text-[#0B2545] tracking-tight">
          Dashboard
        </h2>
        <p className="text-[12px] text-[#667085] mt-1">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* ── KPI Cards ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <KPICard
          title="Total Users"
          value={dashboadData?.stats?.total_users || "--"}
          color="blue"
          icon={<Users className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Active Policies"
          value={dashboadData?.stats?.active_policies || "--"}
          color="green"
          icon={<ShieldCheck className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Pending Policies"
          value={dashboadData?.stats?.pending_policies || "--"}
          subtitle="⚠ Review required"
          color="yellow"
          icon={<FileWarning className="w-[18px] h-[18px]" />}
        />
        <KPICard
          title="Expire Policies"
          value={dashboadData?.stats?.expire_policies || "--"}
          color="green"
          icon={<ClockFading className="w-[18px] h-[18px]" />}
        />
      </div>

      {/* ── Charts Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <LineChart
            title="New User Registrations"
            data={dashboadData?.monthly_signups}
            xKey="month"
            yKey="users"
            color="#0B2545"
            height="280px"
          />
        </div>
        <div className="lg:col-span-1">
          <DonutChart
            title="Plan Distribution"
            data={dashboadData?.plan_distribution}
            height="280px"
          />
        </div>
      </div>

      {/* ── Bottom Row ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Users */}
        <div className="bg-white border border-[rgba(11,37,69,0.05)] rounded-[14px] shadow-[0_4px_20px_rgba(11,37,69,0.04)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(11,37,69,0.05)] bg-white rounded-t-[14px]">
            <p className="text-[15px] font-semibold text-[#0B2545]">
              Recent Users
            </p>
            <a
              href="/admin/user-dashboard"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0B2545] border border-[rgba(11,37,69,0.12)] rounded-[9px] px-3 py-1.5 bg-white hover:bg-[#f0f4f8] transition-colors"
            >
              View all <ArrowUpRight className="w-3 h-3 text-[#0B2545]" />
            </a>
          </div>
          <div className="divide-y divide-[rgba(11,37,69,0.05)] bg-white">
            {userListLoading ? (
              <div className="flex items-center justify-center py-10">
                <LogoSpinner type="spin" size="md" />
              </div>
            ) : recentUser?.length > 0 ? (
              recentUser.map((user) => (
                <div
                  key={user?.customer_id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f0f4f8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[34px] h-[34px] bg-[#EAF0F6] rounded-[9px] flex items-center justify-center flex-shrink-0">
                      <span className="text-[#0B2545] text-xs font-semibold">
                        {user?.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </span>
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-[#0B2545]">
                        {user?.name}
                      </p>

                      <p className="text-[11px] text-[#667085] font-normal">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-[#667085] font-medium">
                    {timeAgo(user?.created_at)}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-[34px] h-[34px] bg-[#EAF0F6] rounded-[9px] flex items-center justify-center mb-2">
                  <span className="text-[#667085] text-xs font-semibold">
                    👤
                  </span>
                </div>

                <p className="text-sm font-semibold text-[#0B2545]">
                  No recent users found
                </p>

                <p className="text-xs text-[#667085] mt-1">
                  There are no recent users to display.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pending Documents */}
        <div className="bg-white border border-[rgba(11,37,69,0.05)] rounded-[14px] shadow-[0_4px_20px_rgba(11,37,69,0.04)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(11,37,69,0.05)] bg-white rounded-t-[14px]">
            <p className="text-[15px] font-semibold text-[#0B2545]">
              Pending Documents
            </p>
            <a
              href="/admin/policies"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#0B2545] border border-[rgba(11,37,69,0.12)] rounded-[9px] px-3 py-1.5 bg-white hover:bg-[#f0f4f8] transition-colors"
            >
              View all <ArrowUpRight className="w-3 h-3 text-[#0B2545]" />
            </a>
          </div>
          <div className="divide-y divide-[rgba(11,37,69,0.05)] bg-white">
            {isPendingListLoading ? (
              <div className="flex items-center justify-center py-10">
                <LogoSpinner type="spin" size="md" />
              </div>
            ) : pendingUserList?.length > 0 ? (
              pendingUserList.map((doc) => (
                <div
                  key={doc.policy_id}
                  className="flex items-center justify-between px-5 py-3 hover:bg-[#f0f4f8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-[34px] h-[34px] bg-[#FBF5DF] rounded-[9px] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-[#C9A227]" />
                    </div>

                    <div>
                      <p className="text-[13px] font-semibold text-[#0B2545]">
                        {doc?.customer_name}
                      </p>
                      <p className="text-[11px] text-[#667085] font-normal">
                        Policy Document
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-[#667085] font-medium">
                      {formatDate(doc?.created_at)}
                    </span>

                    <span className="px-2.5 py-0.5 bg-[#FBF5DF] text-[#C9A227] text-[11px] rounded-full font-bold">
                      PENDING
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <FileText className="w-8 h-8 text-[#98A2B3] mb-2" />

                <p className="text-sm font-semibold text-[#0B2545]">
                  No pending users found
                </p>

                <p className="text-xs text-[#667085] mt-1">
                  There are no pending policy documents.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
