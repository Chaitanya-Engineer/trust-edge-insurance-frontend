import React from "react";
import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

export default function FinancialKPISection({ financials, loading }) {
  const formatINR = (val) => {
    return Number(val || 0).toLocaleString("en-IN");
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-[#E5E9E7] h-32" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. PRIMARY METRIC: Total Premium Collected */}
        <div className="bg-[#0B2545] text-white rounded-2xl p-4.5 border border-[#0E2F52] shadow-sm flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8 pointer-events-none" />
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-wider">
              Total Premium Collected
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="text-[22px] font-extrabold tracking-tight text-white mb-1">
              ₹{formatINR(financials.totalCollected)}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                <TrendingUp className="w-3 h-3" />
                +14.8%
              </span>
              <span className="text-[10px] text-gray-300">vs prev period</span>
            </div>
            <p className="text-[10px] text-gray-300 mt-1">
              Primary realized revenue
            </p>
          </div>
        </div>

        {/* 2. Gross Premium */}
        <div className="bg-white rounded-2xl p-4.5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Gross Premium
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EAF0F6] text-[#0B2545] flex items-center justify-center">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="text-[20px] font-extrabold text-[#0B2545] mb-1">
              ₹{formatINR(financials.grossPremium)}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                <TrendingUp className="w-3 h-3" />
                +11.2%
              </span>
              <span className="text-[10px] text-[#667085]">written value</span>
            </div>
            <p className="text-[10px] text-[#667085] mt-1">
              Total underwritten value
            </p>
          </div>
        </div>

        {/* 3. Outstanding Premium */}
        <div className="bg-white rounded-2xl p-4.5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Outstanding Premium
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FBF5DF] text-[#C9A227] flex items-center justify-center">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="text-[20px] font-extrabold text-[#B54708] mb-1">
              ₹{formatINR(financials.outstandingPremium)}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700">
                <TrendingDown className="w-3 h-3" />
                -3.4%
              </span>
              <span className="text-[10px] text-[#667085]">due from clients</span>
            </div>
            <p className="text-[10px] text-[#667085] mt-1">
              Pending collections
            </p>
          </div>
        </div>

        {/* 4. Claims Paid */}
        <div className="bg-white rounded-2xl p-4.5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Claims Paid
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#FDECEC] text-[#B42318] flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="text-[20px] font-extrabold text-[#0B2545] mb-1">
              ₹{formatINR(financials.claimsPaid)}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-50 text-green-700">
                <CheckCircle2 className="w-3 h-3" />
                Settled
              </span>
              <span className="text-[10px] text-[#667085]">disbursed</span>
            </div>
            <p className="text-[10px] text-[#667085] mt-1">
              Total disbursed to claimants
            </p>
          </div>
        </div>

        {/* 5. Total Refunds */}
        <div className="bg-white rounded-2xl p-4.5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Total Refunds
            </span>
            <div className="w-7 h-7 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
              <RotateCcw className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="text-[20px] font-extrabold text-[#0B2545] mb-1">
              ₹{formatINR(financials.totalRefunds)}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                0.6%
              </span>
              <span className="text-[10px] text-[#667085]">of collected</span>
            </div>
            <p className="text-[10px] text-[#667085] mt-1">
              Cancellations & endorsements
            </p>
          </div>
        </div>

        {/* 6. Net Premium */}
        <div className="bg-white rounded-2xl p-4.5 border border-[#E5E9E7] shadow-xs flex flex-col justify-between hover:border-gray-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider">
              Net Premium
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EAF4EC] text-[#2F6F3E] flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>

          <div>
            <div className="text-[20px] font-extrabold text-[#2F6F3E] mb-1">
              ₹{formatINR(financials.netPremium)}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#EAF4EC] text-[#2F6F3E]">
                Retained
              </span>
              <span className="text-[10px] text-[#667085]">net balance</span>
            </div>
            <p className="text-[10px] text-[#667085] mt-1">
              Collected minus claims & refunds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
