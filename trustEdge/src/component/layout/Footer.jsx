import { FooterValues, Title } from "../../lib/constant/AppLevelConstant";
import { footerLinks } from "../../lib/constant/routes";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-slate-300">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <a href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">
                {Title?.TRUST}
                <span className="text-green-light">{Title?.EDGE}</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Secure, simple, and affordable insurance for every Indian
              family — protecting today, securing tomorrow.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919773548537"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-light hover:text-navy text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.555 4.124 1.527 5.855L0 24l6.335-1.502A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.371l-.36-.214-3.727.883.936-3.62-.235-.372A9.817 9.817 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182S21.818 6.58 21.818 12 17.42 21.818 12 21.818z" />
              </svg>
              Chat with Us
            </a>

            {/* Contact details */}
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gold flex-shrink-0" />
                <span>
                  D-121, Steel Chamber, Steel Market, Kalamboli, Navi Mumbai
                  410218
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="tel:+919773548537"
                  className="hover:text-white transition-colors"
                >
                  +91 97735 48537
                </a>
                <span className="text-slate-500">/</span>
                <a
                  href="tel:+919922554066"
                  className="hover:text-white transition-colors"
                >
                  +91 99225 54066
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                <a
                  href="mailto:trustedgeimf@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  trustedgeimf@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Mon – Sat, 10:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-gold-light transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © {currentYear} {FooterValues?.ALL_RIHT_RESERVED}
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-green-light rounded-full inline-block animate-pulse"></span>
            {FooterValues?.ALL_SYSTEM_OPERATIONAL}
          </div>
        </div>
      </div>
    </footer>
  );
}