import React from "react";
import { Building2, Award, TrendingUp, CheckCircle2 } from "lucide-react";
import { MASTER_PARTNERS } from "../constant";

export default function PartnerPerformanceSection() {
  const formatINR = (val) => Number(val || 0).toLocaleString("en-IN");

  return (
    <div className="bg-white rounded-2xl border border-[#E5E9E7] p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-[#E5E9E7]">
        <div>
          <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0B2545]" />
            Insurance Partner Performance & Claim Track Record
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            Underwriting contribution, gross premium generation, and claim settlement reliability by underwriter.
          </p>
        </div>
      </div>

      {/* Table Breakdown */}
      <div className="overflow-x-auto rounded-xl border border-[#E5E9E7]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAF9] text-[#667085] uppercase text-[10px] font-bold tracking-wider border-b border-[#E5E9E7]">
              <th className="py-3 px-3.5">Insurance Partner</th>
              <th className="py-3 px-3.5 text-center">Policies Underwritten</th>
              <th className="py-3 px-3.5 text-right">Premium Generated</th>
              <th className="py-3 px-3.5 text-center">Claims (Settled / Total)</th>
              <th className="py-3 px-3.5">Settlement Rate</th>
              <th className="py-3 px-3.5 text-center">Market Share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E9E7]">
            {MASTER_PARTNERS.map((partner, index) => {
              const isTopPartner = index === 0;

              return (
                <tr key={partner.name} className="hover:bg-[#F0F4F8] transition-colors">
                  <td className="py-3 px-3.5 font-bold text-[#0B2545]">
                    <div className="flex items-center gap-2">
                      {isTopPartner && (
                        <span title="Top Revenue Generator">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                        </span>
                      )}
                      <span>{partner.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3.5 text-center font-semibold text-[#0B2545]">
                    {partner.policiesCount}
                  </td>
                  <td className="py-3 px-3.5 text-right font-bold text-[#0B2545] font-mono">
                    ₹{formatINR(partner.premiumGenerated)}
                  </td>
                  <td className="py-3 px-3.5 text-center text-[#475569] font-medium">
                    <span className="text-[#2F6F3E] font-bold">{partner.claimsSettled}</span> / {partner.claimsReported}
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#2F6F3E] h-2 rounded-full"
                          style={{ width: `${partner.settlementRate}%` }}
                        />
                      </div>
                      <span className="font-bold text-xs text-[#2F6F3E]">
                        {partner.settlementRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-[#0B2545] font-bold text-[11px]">
                      {partner.marketShare}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
