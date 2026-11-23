import { useState, useMemo } from "react";
import { ExternalLink, Search } from "lucide-react";

// Insurer Logos
import bajajLogo from "../../assets/Insurances Companies/bajaj_general.png";
import magmaLogo from "../../assets/Insurances Companies/Magma_General.png";
import tataAigLogo from "../../assets/Insurances Companies/Tata_AIG_General.png";
import goDigitLogo from "../../assets/Insurances Companies/Go_Digit_General.png";
import shriramLogo from "../../assets/Insurances Companies/Shriram_General.png";
import royalSundaramLogo from "../../assets/Insurances Companies/Royal_Sundaram_General.png";
import universalSompoLogo from "../../assets/Insurances Companies/Universal_Sompo_General.png";
import cholaMsLogo from "../../assets/Insurances Companies/Cholamandalam_MS_General.png";
import iffcoTokioLogo from "../../assets/Insurances Companies/IFFCO_Tokio_General.png";
import newIndiaLogo from "../../assets/Insurances Companies/The_New_India_Assurance.png";

// Insurer Partner Portals Configuration (All 10 Partners)
const PARTNER_PORTALS = [
  {
    id: "bajaj-allianz",
    name: "Bajaj General Insurance",
    logo: bajajLogo,
    url: "https://www.bajajgeneralinsurance.com/login.html",
  },
  {
    id: "magma",
    name: "Magma General Insurance",
    logo: magmaLogo,
    url: "https://agents.magmainsurance.com/Portal/",
  },
  {
    id: "tata-aig",
    name: "Tata AIG General Insurance",
    logo: tataAigLogo,
    url: "https://sellonline.tataaig.com/ipdsv2/login/#/login",
  },
  {
    id: "go-digit",
    name: "Go Digit General Insurance",
    logo: goDigitLogo,
    url: "https://www.godigit.com/become-an-agent/digit-agent-portal-partner-login",
  },
  {
    id: "shriram",
    name: "Shriram General Insurance",
    logo: shriramLogo,
    url: "https://www.shriramgi.com/customer-portal/login",
  },
  {
    id: "royal-sundaram",
    name: "Royal Sundaram General Insurance",
    logo: royalSundaramLogo,
    url: "https://ilounge.royalsundaram.in/iLounge/login",
  },
  {
    id: "universal-sompo",
    name: "Universal Sompo General Insurance",
    logo: universalSompoLogo,
    url: "https://www.universal-sompo.co.in/imdportal/",
  },
  {
    id: "cholamandalam-ms",
    name: "Cholamandalam MS General Insurance",
    logo: cholaMsLogo,
    url: "https://apps.cholainsurance.com/kiosk_web/Partnerlogin.aspx",
  },
  {
    id: "iffco-tokio",
    name: "IFFCO-Tokio General Insurance",
    logo: iffcoTokioLogo,
    url: "https://www.iffcotokio.co.in/portal/login?zQ=ZFhObGNsUjVjR1U5UVVkRlRsUT0%3D",
  },
  {
    id: "new-india",
    name: "The New India Assurance",
    logo: newIndiaLogo,
    url: "https://online.newindia.co.in/NIABancsPortal/IntermediaryLogin.html",
  },
];

export default function PartnerPortalsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPortals = useMemo(() => {
    if (!searchTerm.trim()) return PARTNER_PORTALS;
    const term = searchTerm.toLowerCase();
    return PARTNER_PORTALS.filter((portal) =>
      portal.name.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleOpenPortal = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Simple Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B2545]">
              Partner Portals
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Direct access to official insurance partner agent login portals.
            </p>
          </div>
          <span className="rounded-full bg-[#EAF0F6] px-2.5 py-1 text-xs font-semibold text-[#0B2545]">
            Total {PARTNER_PORTALS.length} Portals
          </span>
        </div>

        {/* Simple Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search insurer..."
            className="w-full rounded-lg border border-slate-300 bg-white py-1.5 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 focus:border-[#0B2545] focus:outline-none"
          />
        </div>
      </div>

      {/* Clean Compact Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-2.5 px-4 w-12 text-center">#</th>
                <th className="py-2.5 px-4">Insurance Company</th>
                <th className="py-2.5 px-4 hidden md:table-cell">Portal URL</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPortals.length > 0 ? (
                filteredPortals.map((portal, index) => (
                  <tr
                    key={portal.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Index */}
                    <td className="py-2 px-4 text-center font-semibold text-slate-400">
                      {index + 1}
                    </td>

                    {/* Logo & Name */}
                    <td className="py-2 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-20 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-white p-1">
                          <img
                            src={portal.logo}
                            alt={portal.name}
                            className="max-h-full max-w-full object-contain"
                            loading="lazy"
                          />
                        </div>
                        <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {portal.name}
                        </span>
                      </div>
                    </td>

                    {/* Portal URL */}
                    <td className="py-2 px-4 hidden md:table-cell">
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-[#0B2545] hover:underline font-mono text-[11px] truncate max-w-sm block"
                      >
                        {portal.url}
                      </a>
                    </td>

                    {/* Agent Login Button */}
                    <td className="py-2 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenPortal(portal.url)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0B2545] px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#0E2F52] transition-colors cursor-pointer"
                      >
                        <span>Agent Login</span>
                        <ExternalLink className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    No insurance company found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="border-t border-slate-200 bg-slate-50/50 px-4 py-2.5 text-xs text-slate-500 flex items-center justify-between">
          <span>
            Showing all <strong>{filteredPortals.length}</strong> of{" "}
            <strong>{PARTNER_PORTALS.length}</strong> partner portals
          </span>
          <span className="text-[11px] text-slate-400">
            All links open in a new tab via window.open
          </span>
        </div>
      </div>
    </div>
  );
}
