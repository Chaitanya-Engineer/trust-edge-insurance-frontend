import React from "react";
import { Lightbulb, TrendingUp, AlertTriangle, ShieldCheck, RefreshCw, Building2 } from "lucide-react";

export default function ManagementInsightsSection() {
  const insights = [
    {
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      title: "Revenue Velocity",
      description:
        "Total premium collection increased by 14.8% compared to the prior reporting cycle, driven primarily by retail health and commercial fleet acquisitions.",
      type: "positive",
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-blue-600" />,
      title: "Dominant Category Lead",
      description:
        "Health Insurance continues to lead overall book volume, contributing 38% of total written policies and ₹1.35 Cr in underwritten premium.",
      type: "neutral",
    },
    {
      icon: <Building2 className="w-4 h-4 text-[#0B2545]" />,
      title: "Top Partner Contribution",
      description:
        "Star Health generated the highest underwritten volume (342 policies, ₹85.5L), while maintaining a 96.4% claim settlement ratio.",
      type: "neutral",
    },
    {
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
      title: "Aging Claims Review",
      description:
        "One marine transit claim (CLM-906, ₹85,000) has exceeded the 30-day turnaround threshold and requires surveyor follow-up.",
      type: "warning",
    },
    {
      icon: <RefreshCw className="w-4 h-4 text-rose-600" />,
      title: "Immediate Renewal Queue",
      description:
        "7 high-value policies are expiring within the next 7 days (₹1.8L combined premium); automated notices have been dispatched.",
      type: "urgent",
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-indigo-600" />,
      title: "Claims TAT Benchmark",
      description:
        "Average claim turnaround time improved from 5.8 days to 4.2 days, outperforming the regulatory IRDAI 7-day benchmark.",
      type: "positive",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Executive Management Insights & Operational Action Items
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Data-backed operational summaries for senior management, finance controllers, and claims committees.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {insights.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#F8FAF9] border border-[#E5E9E7] hover:border-gray-300 transition-all flex items-start gap-3"
          >
            <div className="p-2 rounded-lg bg-white border border-[#E5E9E7] shadow-2xs flex-shrink-0">
              {item.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#0B2545] mb-1">
                {item.title}
              </h4>
              <p className="text-[11px] text-[#475569] leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
