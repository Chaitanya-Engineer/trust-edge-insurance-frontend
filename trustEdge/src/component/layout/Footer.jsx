import WhatsAppIcon from "../../assets/WhatsappIcon";
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
              Secure, simple, and affordable insurance for every Indian family —
              protecting today, securing tomorrow.
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919773548537"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-brand hover:bg-green-light hover:text-navy text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-300"
            >
              <WhatsAppIcon />
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
