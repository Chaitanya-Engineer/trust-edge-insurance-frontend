import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  User,
  AtSign,
  Shield,
  Loader2,
} from "lucide-react";
import WhatsAppIcon from "../../assets/WhatsappIcon";

/* ─────────────────────────────────────────────
   CONTACT INFO DATA
───────────────────────────────────────────── */
const contactInfo = [
  {
    icon: MapPin,
    title: "Office Address",
    lines: [
      "D-121, Steel Chamber, Steel Market,",
      "Kalamboli, Navi Mumbai 410218",
    ],
    action: null,
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+91 97735 48537", "+91 99225 54066"],
    action: "tel:+919773548537",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["trustedgeimf@gmail.com", "kmchaudhari939@gmail.com"],
    action: "mailto:trustedgeimf@gmail.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday – Saturday", "10:00 AM – 7:00 PM"],
    action: null,
  },
];

const policyTypes = [
  "Motor Insurance",
  "Health Insurance",
  "Personal Insurance",
  "Property Insurance",
  "Marine Insurance",
  "Workmen Compensation",
  "Other",
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    policyType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.trim()))
      e.phone = "Enter a valid 10-digit mobile number";
    if (!form.policyType) e.policyType = "Please select a policy type";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) {
      setErrors(e2);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-slate-50 text-slate-800 overflow-x-hidden">
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-[30vh] md:min-h-[45vh] flex items-center overflow-hidden bg-navy text-white py-14 md:py-24 px-6">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80"
            alt="Advisor team working together"
            className="w-full h-full object-cover object-[60%_center] opacity-65 md:opacity-35 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-navy/35 md:bg-gradient-to-r md:from-navy/95 md:via-navy/85 md:to-navy/40" />
        </div>

        {/* Gold decorative rings */}
        <div className="pointer-events-none absolute right-[-120px] top-[-120px] md:right-[-100px] md:top-[-100px] h-[350px] w-[350px] md:h-[400px] md:w-[400px] rounded-full border-[2px] border-gold/20 z-10" />
        <div className="pointer-events-none absolute right-[-60px] top-[-60px] md:right-[-50px] md:top-[-50px] h-[240px] w-[240px] md:h-[280px] md:w-[280px] rounded-full border-[2px] border-gold/15 z-10" />

        <div className="relative z-20 mx-auto max-w-5xl text-center md:text-left w-full">
          <span className="inline-block rounded-full border border-gold/60 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-4">
            Get in Touch
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
            We're Here to <span className="text-gold">Help You</span>
          </h1>

          <p className="mt-4 md:mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200 md:text-lg">
            Have questions about a plan, need a quote, or want claim support? Reach us instantly — a real advisor always picks up.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          QUICK CONTACT CARDS (RESPONSIVE ROW/GRID)
      ══════════════════════════════════════ */}
      <section className="relative z-20 mx-auto -mt-8 md:-mt-10 max-w-5xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {contactInfo.map(({ icon: Icon, title, lines, action }, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-xl shadow-navy/5 border border-slate-100 p-5 md:p-6 flex flex-row md:flex-col items-center md:text-center gap-4 md:gap-3 hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-navy/5 transition-all duration-300 group-hover:bg-navy group-hover:rotate-6">
                <Icon className="h-6 w-6 text-navy transition-colors duration-300 group-hover:text-gold" />
              </div>

              {/* Text Container */}
              <div className="flex-1 md:flex-none text-left md:text-center">
                <h3 className="text-sm font-bold text-navy mb-1 md:mb-2">
                  {title}
                </h3>
                <div className="space-y-0.5">
                  {lines.map((line, j) =>
                    action && j === 0 ? (
                      <a
                        key={j}
                        href={action}
                        className="text-xs sm:text-sm font-semibold text-navy hover:text-green-brand transition-colors block"
                      >
                        {line}
                      </a>
                    ) : (
                      <p key={j} className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                        {line}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FORM + MAP SECTION
      ══════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-12 gap-8 lg:gap-12">

          {/* LEFT — FORM (7 Cols on desktop, stacked on mobile) */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-navy/5 border border-slate-100 p-6 md:p-10 text-left">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                Send a Message
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-navy md:text-3xl">
                Get a Free Quote
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-gold" />
              <p className="mt-4 text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                Fill in your details and we'll call you back within 30 minutes during business hours.
              </p>
            </div>

            {submitted ? (
              /* Success State */
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-brand/10 mb-2">
                  <CheckCircle2 className="h-10 w-10 text-green-brand" />
                </div>
                <h3 className="text-xl font-bold text-navy">
                  Message Sent Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xs leading-relaxed">
                  Thank you, <span className="font-semibold text-navy">{form.name}</span>! Our advisor will call you on <span className="font-semibold text-navy">+91 {form.phone}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      policyType: "",
                      message: "",
                    });
                  }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-brand hover:text-navy transition-colors"
                >
                  Send another message <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* 2-Column row for Desktop, 1-Column for Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all ${errors.name
                            ? "border-red-400 bg-red-50 focus:border-red-400"
                            : "border-slate-200 bg-slate-50 focus:border-gold focus:bg-white"
                          }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 font-semibold">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all ${errors.phone
                            ? "border-red-400 bg-red-50 focus:border-red-400"
                            : "border-slate-200 bg-slate-50 focus:border-gold focus:bg-white"
                          }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 font-semibold">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* 2-Column row for Desktop, 1-Column for Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                      Email Address (Optional)
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Policy Type */}
                  <div>
                    <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                      Policy Type *
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        name="policyType"
                        value={form.policyType}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all appearance-none bg-no-repeat ${errors.policyType
                            ? "border-red-400 bg-red-50 focus:border-red-400"
                            : "border-slate-200 bg-slate-50 focus:border-gold focus:bg-white"
                          } ${form.policyType === ""
                            ? "text-slate-400"
                            : "text-slate-800 font-semibold"
                          }`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "1.25rem",
                        }}
                      >
                        <option value="">Select policy type</option>
                        {policyTypes.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.policyType && (
                      <p className="mt-1 text-xs text-red-500 font-semibold">{errors.policyType}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your requirements or any specific policy needs..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Buttons (Side-by-side on desktop, stacked on mobile) */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed shadow-md w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/919773548537"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-brand hover:bg-green-light text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-[1.01] w-full"
                  >
                    <WhatsAppIcon />
                    Or Chat on WhatsApp
                  </a>
                </div>

                <p className="text-center text-xs text-slate-400 font-medium pt-2">
                  We never share your details. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* RIGHT — MAP + INFO (5 Cols on desktop, stacked on mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-6 w-full">
            {/* Google Map Embed (fixed height on mobile, flex-fill on desktop) */}
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 h-[280px] sm:h-[350px] lg:h-auto lg:flex-grow">
              <iframe
                title="TrustEdge Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.3!2d73.0961!3d18.9952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9b5b5b5b5b5%3A0x0!2sSteel+Market%2C+Kalamboli%2C+Navi+Mumbai%2C+Maharashtra+410218!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=Steel+Market+Kalamboli+Navi+Mumbai"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[280px]"
              />
            </div>

            {/* Address details card */}
            <div className="bg-navy rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden text-left">
              {/* Background rings */}
              <div className="pointer-events-none absolute right-[-40px] top-[-40px] h-[150px] w-[150px] rounded-full border border-gold/10" />

              <div className="flex items-start gap-4 mb-6 relative z-10">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold/20">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-1">
                    Visit Our Office
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    D-121, Steel Chamber, Steel Market,
                    <br />
                    Kalamboli, Navi Mumbai 410218
                  </p>
                </div>
              </div>

              {/* Responsive contacts grid (stacks on extra small, 2 cols on medium+) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                {[
                  {
                    icon: Phone,
                    label: "Phone 1",
                    val: "+91 97735 48537",
                    href: "tel:+919773548537",
                  },
                  {
                    icon: Phone,
                    label: "Phone 2",
                    val: "+91 99225 54066",
                    href: "tel:+919922554066",
                  },
                  {
                    icon: Mail,
                    label: "Email 1",
                    val: "trustedgeimf@gmail.com",
                    href: "mailto:trustedgeimf@gmail.com",
                    isEmail: true,
                  },
                  {
                    icon: Mail,
                    label: "Email 2",
                    val: "kmchaudhari939@gmail.com",
                    href: "mailto:kmchaudhari939@gmail.com",
                    isEmail: true,
                  },
                ].map(({ icon: Icon, label, val, href, isEmail }, i) => (
                  <a
                    key={i}
                    href={href}
                    className={`group flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-gold/40 transition-all duration-300 ${
                      isEmail ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-gold" />
                      <span className="text-[10px] text-slate-400 font-medium">{label}</span>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-white group-hover:text-gold-light transition-colors break-words">
                      {val}
                    </span>
                  </a>
                ))}
              </div>

              {/* Hours of operation */}
              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 relative z-10">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Business Hours</p>
                  <p className="text-xs font-semibold text-white">
                    Mon – Sat &nbsp;|&nbsp; 10:00 AM – 7:00 PM
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-light animate-pulse" />
                  <span className="text-[10px] text-green-light font-bold">
                    Open
                  </span>
                </div>
              </div>

              {/* Get Directions button */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Steel+Market+Kalamboli+Navi+Mumbai+410218"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.01] relative z-10"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════
          QUICK REACH STRIP
      ══════════════════════════════════════ */}
      <section className="pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-br from-navy to-navy-dark p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden text-center lg:text-left">
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full border border-gold/10 translate-x-1/2 -translate-y-1/2" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-32 w-32 rounded-full border border-gold/5 -translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold text-white mb-2 md:text-3xl">
                Prefer a Quick Call?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-xl mx-auto lg:mx-0">
                Our advisors are available Mon–Sat, 10 AM to 7 PM. We answer every single call directly — no automated bots, no hold queues.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 relative z-10 w-full lg:w-auto">
              <a
                href="tel:+919773548537"
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                +91 97735 48537
              </a>
              <a
                href="tel:+919922554066"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-gold text-white hover:text-gold font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 w-full sm:w-auto"
              >
                <Phone className="w-4 h-4" />
                +91 99225 54066
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
