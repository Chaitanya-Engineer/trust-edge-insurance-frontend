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
  Car,
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

const vehicleTypes = [
  "Private Car",
  "Two-Wheeler / Bike",
  "Commercial Vehicle",
  "Truck / Tempo",
  "Bus",
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
    vehicle: "",
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
    if (!form.vehicle) e.vehicle = "Please select a vehicle type";
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
    <div className="bg-slate-50 text-slate-800">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy via-navy-light to-navy-dark py-20 px-6 text-white text-center">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border border-gold/15" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-52 w-52 rounded-full border border-green-brand/20" />
        <div className="relative z-10 mx-auto max-w-2xl">
          <span className="inline-block rounded-full border border-gold/50 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-light mb-5">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            We're Here to <span className="text-gold">Help You</span>
          </h1>
          <p className="text-slate-200 text-lg leading-relaxed max-w-lg mx-auto">
            Have questions about a plan, need a quote, or want claim support?
            Reach us instantly — a real advisor always picks up.
          </p>
        </div>
      </section>

      {/* ── QUICK CONTACT CARDS ── */}
      <section className="relative z-10 mx-auto -mt-10 max-w-5xl px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactInfo.map(({ icon: Icon, title, lines, action }, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl shadow-lg border border-slate-100 p-5 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy mb-3 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-6 w-6 text-gold" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                {title}
              </p>
              {lines.map((line, j) =>
                action && j === 0 ? (
                  <a
                    key={j}
                    href={action}
                    className="text-sm font-medium text-navy hover:text-green-brand transition-colors"
                  >
                    {line}
                  </a>
                ) : (
                  <p key={j} className="text-sm text-slate-500">
                    {line}
                  </p>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FORM + MAP ── */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-10">
          {/* LEFT — FORM */}
          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-10">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                Send a Message
              </span>
              <h2 className="mt-1 text-2xl font-bold text-navy">
                Get a Free Insurance Quote
              </h2>
              <div className="mt-2 h-1 w-12 rounded-full bg-gold" />
              <p className="mt-3 text-sm text-slate-500">
                Fill in your details and we'll call you back within 30 minutes
                during business hours.
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
                <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                  Thank you,{" "}
                  <span className="font-semibold text-navy">{form.name}</span>!
                  Our advisor will call you on{" "}
                  <span className="font-semibold text-navy">
                    +91 {form.phone}
                  </span>{" "}
                  shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      vehicle: "",
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
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
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
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all ${
                        errors.name
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-gold focus:bg-white"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all ${
                        errors.phone
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-gold focus:bg-white"
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
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

                {/* Vehicle Type */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                    Vehicle Type *
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      name="vehicle"
                      value={form.vehicle}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 transition-all appearance-none bg-no-repeat ${
                        errors.vehicle
                          ? "border-red-400 bg-red-50"
                          : "border-slate-200 bg-slate-50 focus:border-gold focus:bg-white"
                      } ${
                        form.vehicle === ""
                          ? "text-slate-400"
                          : "text-slate-800"
                      }`}
                    >
                      <option value="">Select vehicle type</option>
                      {vehicleTypes.map((v) => (
                        <option key={v} value={v}>
                          {v}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.vehicle && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.vehicle}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1.5 uppercase tracking-wide">
                    Message (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your vehicle or any specific requirements..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-navy hover:bg-navy-light text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
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

                {/* WhatsApp alternative */}
                <a
                  href="https://wa.me/919773548537"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-brand hover:bg-green-light text-white font-bold py-3.5 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
                >
                  <WhatsAppIcon />
                  Or Chat on WhatsApp
                </a>

                <p className="text-center text-xs text-slate-400">
                  We never share your details. No spam, ever.
                </p>
              </form>
            )}
          </div>

          {/* RIGHT — MAP + INFO */}
          <div className="flex flex-col gap-6">
            {/* Google Map Embed */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 flex-1 min-h-[360px]">
              <iframe
                title="TrustEdge Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.3!2d73.0961!3d18.9952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9b5b5b5b5b5%3A0x0!2sSteel+Market%2C+Kalamboli%2C+Navi+Mumbai%2C+Maharashtra+410218!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin&q=Steel+Market+Kalamboli+Navi+Mumbai"
                width="100%"
                height="100%"
                style={{ minHeight: "360px", border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Address card */}
            <div className="bg-navy rounded-3xl p-7 text-white shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gold/20">
                  <MapPin className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-1">
                    Visit Our Office
                  </p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    D-121, Steel Chamber, Steel Market,
                    <br />
                    Kalamboli, Navi Mumbai 410218
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  },
                  {
                    icon: Mail,
                    label: "Email 2",
                    val: "kmchaudhari939@gmail.com",
                    href: "mailto:kmchaudhari939@gmail.com",
                  },
                ].map(({ icon: Icon, label, val, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="group flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/10 hover:border-gold/40 transition-all duration-300"
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-gold" />
                      <span className="text-xs text-slate-400">{label}</span>
                    </div>
                    <span className="text-xs font-semibold text-white group-hover:text-gold-light transition-colors break-all">
                      {val}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-400">Business Hours</p>
                  <p className="text-xs font-semibold text-white">
                    Mon – Sat &nbsp;|&nbsp; 10:00 AM – 7:00 PM
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-light animate-pulse" />
                  <span className="text-xs text-green-light font-semibold">
                    Open
                  </span>
                </div>
              </div>

              {/* Get Directions button */}
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Steel+Market+Kalamboli+Navi+Mumbai+410218"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold py-3 rounded-xl text-sm transition-all duration-300 hover:scale-[1.02]"
              >
                <MapPin className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK REACH STRIP ── */}
      <section className="pb-20 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl bg-gradient-to-br from-navy to-navy-dark p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full border border-gold/10 translate-x-1/2 -translate-y-1/2" />
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2">
                Prefer a Quick Call?
              </h2>
              <p className="text-slate-300 text-sm">
                Our advisors are available Mon–Sat, 10 AM to 7 PM.
                <br />
                We answer every call — no bots, no queues.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <a
                href="tel:+919773548537"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-navy font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                +91 97735 48537
              </a>
              <a
                href="tel:+919922554066"
                className="inline-flex items-center gap-2 border border-white/20 hover:border-gold text-white hover:text-gold font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-300"
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
