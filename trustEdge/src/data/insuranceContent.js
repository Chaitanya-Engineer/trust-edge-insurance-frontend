import { HeartPulse, UserCircle, Car, Building2, Ship, Briefcase } from "lucide-react";
import healthHero from "../assets/health_hero.png";
import motorHero from "../assets/motor_hero.png";
import propertyHero from "../assets/property_hero.png";
import marineHero from "../assets/marine_hero.png";
import workmenHero from "../assets/workmen_hero.png";
import personalHero from "../assets/personal_hero.png";

export const insuranceContent = {
  health: {
    slug: "health",
    title: "Health Insurance",
    shortDescription: "Comprehensive health coverage for you and your family.",
    icon: HeartPulse,
    seoTitle: "Health Insurance Solutions | TrustEdge",
    seoDescription: "Explore our health insurance solutions to protect your family from unexpected medical expenses. Get a free quote today.",
    hero: {
      title: "Health Insurance",
      badgeText: "100% CASHLESS HEALTH SHIELD",
      subtitle: "Shield your family's health and savings against rising medical inflation with instant cashless hospitalization across 10,000+ top Indian hospitals.",
      highlights: ["10,000+ Cashless Hospitals", "Sec 80D Tax Benefits", "Pre & Post Care Included"],
      statBadgeTitle: "10,000+ Hospital Network",
      statBadgeSub: "Cashless claims settled directly",
      bgImage: healthHero,
    },
    overview: "Health insurance serves as a critical financial shield against the rapidly escalating costs of modern healthcare. In India, a single emergency hospitalization or prolonged medical treatment can severely deplete a family's lifetime savings. A comprehensive health policy covers in-patient hospital room charges, ICU fees, surgeon fees, pre-hospitalization diagnostics, post-hospitalization care, day-care procedures, and organ donor expenses. Furthermore, it offers cashless treatment networks across leading super-specialty hospitals, ensuring quality medical care without upfront financial stress.",
    benefits: [
      "Cashless Hospitalization at network hospitals",
      "Coverage for Pre and Post Hospitalization",
      "Day Care Procedures",
      "Tax Benefits under Section 80D"
    ],
    whoShouldBuy: "Health insurance is essential for every individual and family regardless of age or occupation. It is especially recommended for primary breadwinners to protect family finances, young professionals seeking tax benefits under Section 80D while securing early lock-in rates, growing families needing comprehensive floater coverage, and senior citizens requiring specialized care for age-related conditions or chronic ailments.",
    insuranceTypes: [
      {
        name: "Individual Health Plan",
        shortDescription: "Dedicated medical shield for a single policyholder. Ensures a dedicated sum insured for room rent, ICU care, and surgical treatments without sharing limits with family members.",
        keyBenefits: ["Dedicated sum insured per individual", "No sharing of policy limits", "Tax savings under Sec 80D"]
      },
      {
        name: "Family Floater Plan",
        shortDescription: "Single umbrella policy safeguarding your entire family under one shared sum insured. Offers high cost-efficiency so any family member can utilize total coverage during medical emergencies.",
        keyBenefits: ["Cost-effective for growing families", "Flexibility in annual coverage usage", "Comprehensive newborn & maternity care"]
      },
      {
        name: "Group Health Insurance",
        shortDescription: "Employer-sponsored corporate health protection for employees and dependents. Provides immediate day-1 medical coverage with waived pre-existing disease waiting periods.",
        keyBenefits: ["Pre-existing diseases covered from day one", "Subsidized cashless treatment", "Maternity & OPD add-ons"]
      },
      {
        name: "Senior Citizen Health Plan",
        shortDescription: "Specialized healthcare cover designed for elderly individuals aged 60+. Focuses on age-related medical conditions, chronic disease management, and domiciliary hospitalization.",
        keyBenefits: ["Higher entry age limits", "Coverage for chronic ailments", "Annual wellness check-ups included"]
      }
    ],
    requiredDocuments: [
      "Identity Proof (Aadhaar, PAN, Passport)",
      "Address Proof",
      "Age Proof",
      "Medical records (if requested)"
    ],
    claimProcess: [
      "Notify the insurance desk at the hospital (for cashless)",
      "Submit the pre-authorization form",
      "Undergo treatment",
      "Hospital settles the bill directly with the insurer",
      "(For reimbursement: pay upfront, submit original bills, and receive payment)"
    ],
    faqs: [
      { q: "Is a medical check-up required?", a: "It depends on the policy and your age. Many basic policies up to age 45 do not require a medical test." },
      { q: "Are pre-existing diseases covered?", a: "Yes, but usually after a waiting period (e.g., 2 to 4 years) depending on the specific policy terms." },
      { q: "What is cashless claim?", a: "A cashless claim allows you to get treated at a network hospital without paying cash; the insurer settles the bill directly with the hospital." }
    ],
    relatedCategories: ["personal", "workmen"]
  },
  
  personal: {
    slug: "personal",
    title: "Personal Insurance",
    shortDescription: "Financial protection against personal accidents.",
    icon: UserCircle,
    seoTitle: "Personal Accident Insurance | TrustEdge",
    seoDescription: "Secure your income and family's future with personal accident insurance. Get a free customized quote.",
    hero: {
      title: "Personal Insurance",
      badgeText: "24/7 GLOBAL ACCIDENT PROTECTION",
      subtitle: "Guaranteed financial stability against accidental injury, permanent disability, or income disruption for you and your loved ones.",
      highlights: ["24/7 Worldwide Coverage", "Permanent Disability Cover", "Dependent Education Grant"],
      statBadgeTitle: "100% Direct Payout",
      statBadgeSub: "Complete financial safety net",
      bgImage: personalHero,
    },
    overview: "Personal Accident Insurance offers indispensable financial security against unpredictable life events that result in bodily injury, permanent disability, or accidental demise. While health insurance covers hospital bills, a personal accident policy provides direct monetary payouts to compensate for lost earning capacity, ongoing living expenses, debt liabilities, and specialized recovery equipment. Coverage extends 24/7 worldwide, protecting policyholders whether at work, home, or traveling.",
    benefits: [
      "Accidental Death Benefit",
      "Permanent Total/Partial Disability Cover",
      "Temporary Total Disability",
      "Education Grant for Dependents"
    ],
    whoShouldBuy: "This policy is ideal for active professionals who commute daily, frequent business or leisure travelers, self-employed individuals and sole earners whose families depend strictly on their monthly income, industrial workers, field operatives, and parents looking to secure educational continuity for their children in the event of an unforeseen tragedy.",
    insuranceTypes: [
      {
        name: "Personal Accident Policy",
        shortDescription: "Round-the-clock worldwide financial security against tragic accidental events. Delivers lump-sum payouts for permanent disability, temporary income disruption, and child education grants.",
        keyBenefits: ["24/7 worldwide coverage", "Lump-sum disability payout", "Education grant for dependents"]
      }
    ],
    requiredDocuments: [
      "Identity Proof",
      "Address Proof",
      "Income Proof (for higher sum insured)"
    ],
    claimProcess: [
      "Inform the insurer immediately after the accident",
      "Submit the claim form with FIR (if applicable) and medical reports",
      "Submit disability certificate (if claiming for disability)",
      "Receive claim settlement"
    ],
    faqs: [
      { q: "Is natural death covered?", a: "No, personal accident insurance only covers death or disability arising strictly out of an accident." },
      { q: "Does it cover medical expenses?", a: "Some policies offer accidental hospitalization cover as an add-on or built-in feature up to a specific limit." }
    ],
    relatedCategories: ["health", "motor"]
  },

  motor: {
    slug: "motor",
    title: "Motor Insurance",
    shortDescription: "Coverage for private and commercial vehicles.",
    icon: Car,
    seoTitle: "Motor & Vehicle Insurance | TrustEdge",
    seoDescription: "Protect your vehicles against accidents and liabilities with our motor insurance solutions.",
    hero: {
      title: "Motor Insurance",
      badgeText: "COMPREHENSIVE VEHICLE & FLEET SHIELD",
      subtitle: "Complete protection for private cars, two-wheelers, and commercial fleets against accidents, theft, natural calamities, and legal liabilities.",
      highlights: ["5,000+ Cashless Garages", "Zero Depreciation Add-On", "Mandatory Third-Party Cover"],
      statBadgeTitle: "5,000+ Cashless Garages",
      statBadgeSub: "Instant roadside assistance",
      bgImage: motorHero,
    },
    overview: "Motor insurance provides end-to-end financial and legal protection for private cars, two-wheelers, and commercial fleet vehicles against road accidents, third-party legal liabilities, vehicular theft, vandalism, fire outbreaks, and natural disasters like floods or landslides. Under the Indian Motor Vehicles Act, holding at least valid Third-Party Liability insurance is a legal mandate. Comprehensive policies combine this mandatory cover with Own Damage protection, hassle-free cashless repairs across certified garage networks, and essential add-on features like Zero Depreciation, Engine Protect, and Roadside Assistance.",
    benefits: [
      "Own Damage Cover",
      "Third-Party Liability Protection",
      "Cashless Garage Network",
      "No Claim Bonus (NCB) protection"
    ],
    whoShouldBuy: "Mandatory for all vehicle owners, including private car owners, motorcycle and scooter riders, logistics operators managing commercial goods vehicles, ride-hailing/taxi fleet operators, and corporate companies managing employee transportation fleets who wish to mitigate repair bills and statutory legal liabilities.",
    insuranceTypes: [
      {
        name: "Private Car Insurance",
        shortDescription: "Comprehensive protection for personal cars securing against collision damages, theft, fire, and third-party liabilities. Includes zero-depreciation repair options at 5,000+ network garages.",
        keyBenefits: ["Zero Depreciation & Engine Protect add-ons", "Hassle-free cashless garage repairs", "Mandatory legal liability cover"]
      },
      {
        name: "Two-Wheeler Insurance",
        shortDescription: "360° protection for motorcycles and scooters covering road mishaps, personal rider injuries, and vehicular theft. Offers budget-friendly premiums and multi-year policy options.",
        keyBenefits: ["Affordable premiums & multi-year plans", "Personal accident cover for rider", "Protection against theft & natural disasters"]
      },
      {
        name: "Commercial Vehicle Insurance",
        shortDescription: "Heavy-duty coverage for commercial goods carriers, trucks, taxis, and logistics transport fleets. Secures vehicle damage, transit cargo risk, and legal liabilities.",
        keyBenefits: ["Coverage for goods & passenger vehicles", "Fleet risk management solutions", "Towing & roadside assistance"]
      },
      {
        name: "Miscellaneous Vehicle Insurance",
        shortDescription: "Customized risk protection for specialized industrial, agricultural, and construction equipment like tractors, cranes, and excavators against operational accidents.",
        keyBenefits: ["Customized operational equipment cover", "Protection for high-value machinery", "Third-party liability compliance"]
      }
    ],
    requiredDocuments: [
      "Vehicle Registration Certificate (RC)",
      "Driving License",
      "Previous Insurance Policy (if applicable)",
      "Identity Proof"
    ],
    claimProcess: [
      "Inform the insurer immediately after the incident",
      "File an FIR in case of theft or major accident",
      "Take the vehicle to a network garage",
      "Surveyor inspects the damage",
      "Cashless repair and settlement"
    ],
    faqs: [
      { q: "What is Third-Party Insurance?", a: "Third-Party Insurance covers legal liabilities for injury, death, or property damage caused to another person. It is mandatory by law." },
      { q: "What is Comprehensive Insurance?", a: "Comprehensive Insurance provides third-party coverage along with protection for your own vehicle against accidents, theft, fire, and natural disasters." }
    ],
    relatedCategories: ["personal", "property"]
  },

  property: {
    slug: "property",
    title: "Property Insurance",
    shortDescription: "Safeguard your property against fire and damages.",
    icon: Building2,
    seoTitle: "Property & Home Insurance | TrustEdge",
    seoDescription: "Protect your valuable real estate and contents with property insurance. Request a quote.",
    hero: {
      title: "Property Insurance",
      badgeText: "REAL ESTATE & STRUCTURAL RECOVERY",
      subtitle: "Safeguard your home, commercial offices, factories, and internal contents against fire, natural disasters, burglary, and structural loss.",
      highlights: ["Structure & Content Cover", "Bharat Griha Standard", "Loss of Rent Recovery"],
      statBadgeTitle: "Complete Property Cover",
      statBadgeSub: "Rebuilding & stock protection",
      bgImage: propertyHero,
    },
    overview: "Property and Bharat Griha/Sookshma Raksha Insurance protects real estate structures, residential homes, commercial office buildings, retail spaces, warehouses, and valuable internal inventory against catastrophic damages caused by fire, lightning, explosions, earthquakes, floods, riots, and burglary. Beyond structural rebuilding costs, comprehensive property policies reimburse the replacement value of plant machinery, office furniture, stocks, and loss of rental income during repair periods.",
    benefits: [
      "Protection for Building Structure",
      "Coverage for Contents and Inventory",
      "Loss of Rent",
      "Public Liability"
    ],
    whoShouldBuy: "Property insurance is highly recommended for homeowners wanting to protect their residential property, landlords safeguarding rental premises, real estate investors, commercial business owners, factory/warehouse operators, retail shopkeepers, and tenants looking to cover high-value home electronics, appliances, and personal possessions against theft or fire.",
    insuranceTypes: [
      {
        name: "Fire & Special Perils Policy",
        shortDescription: "Complete structural and content protection for homes, offices, factories, and warehouses against fire outbreaks, natural disasters, explosions, floods, and burglary loss.",
        keyBenefits: ["Rebuilding cost & content replacement", "Protection against floods, earthquakes & fire", "Loss of rent & business interruption cover"]
      }
    ],
    requiredDocuments: [
      "Property Ownership Documents",
      "Identity Proof",
      "List of contents and valuation (if applicable)"
    ],
    claimProcess: [
      "Inform the insurer immediately after the event",
      "Submit claim form and estimate of loss",
      "Surveyor visits the site for assessment",
      "Submit required evidence and documents",
      "Receive claim settlement"
    ],
    faqs: [
      { q: "Does property insurance cover earthquakes?", a: "Yes, standard fire and special perils policies typically cover natural disasters like earthquakes and floods." },
      { q: "Can I insure a rented property?", a: "Yes, you can insure the contents of a rented property, while the landlord can insure the building structure." }
    ],
    relatedCategories: ["marine", "workmen"]
  },

  marine: {
    slug: "marine",
    title: "Marine Insurance",
    shortDescription: "Protect your cargo and maritime assets.",
    icon: Ship,
    seoTitle: "Marine Cargo Insurance | TrustEdge",
    seoDescription: "Secure your goods in transit with comprehensive marine insurance solutions.",
    hero: {
      title: "Marine Insurance",
      badgeText: "GLOBAL & DOMESTIC CARGO TRANSIT",
      subtitle: "End-to-end cargo transit insurance securing sea, air, rail, and road shipments against ocean hazards, damage, and transit losses.",
      highlights: ["Door-to-Door Logistics", "All-Risk Voyage Cover", "Import & Export Guarantee"],
      statBadgeTitle: "Global Logistics Cover",
      statBadgeSub: "Sea, air & land transit security",
      bgImage: marineHero,
    },
    overview: "Marine Insurance is a foundational cornerstone of national and international commerce, delivering ocean, air, rail, and road transit risk coverage for raw materials, machinery, and finished commercial goods. It protects cargo owners, freight forwarders, and logistics operators against physical loss or damage stemming from vessel sinking, overturning, collision, piracy, jettisoning, water ingress, or improper handling during loading and unloading operations.",
    benefits: [
      "Transit Risk Coverage",
      "Customized Voyage Policies",
      "Protection Against Piracy and Weather",
      "Financial Security for Trade"
    ],
    whoShouldBuy: "Essential for import-export trading companies, manufacturing firms transporting raw materials and finished products, logistics and freight forwarding agencies, customs house agents, e-commerce distributors, and merchant traders seeking financial guarantee for domestic and international supply chain operations.",
    insuranceTypes: [
      {
        name: "Marine Cargo Insurance",
        shortDescription: "End-to-end door-to-door transit protection securing commercial cargo across ocean voyages, air freight, rail, and road shipments against transit damage, piracy, and hazards.",
        keyBenefits: ["Door-to-door import & export logistics", "All-risk voyage coverage options", "Protection against jettison, weather & theft"]
      }
    ],
    requiredDocuments: [
      "Invoice and Packing List",
      "Bill of Lading / Lorry Receipt / Airway Bill",
      "KYC Documents of the business"
    ],
    claimProcess: [
      "Lodge a monetary claim on the carrier immediately",
      "Inform the insurer to arrange a survey",
      "Submit claim documents including original invoice and transport documents",
      "Receive settlement after assessment"
    ],
    faqs: [
      { q: "What is an All-Risk policy?", a: "It provides the widest form of cover for cargo, covering accidental physical loss or damage, subject to specific exclusions." },
      { q: "Is inland transit covered?", a: "Yes, marine insurance policies can be customized to cover road or rail transit within the country." }
    ],
    relatedCategories: ["property", "motor"]
  },

  workmen: {
    slug: "workmen-compensation",
    title: "Workmen Compensation",
    shortDescription: "Liability coverage for employee accidents at work.",
    icon: Briefcase,
    seoTitle: "Workmen Compensation Insurance | TrustEdge",
    seoDescription: "Protect your employees and your business with workmen compensation insurance.",
    hero: {
      title: "Workmen Compensation",
      badgeText: "STATUTORY EMPLOYEE LIABILITY COMPLIANCE",
      subtitle: "Fulfill statutory employer obligations under the Employee's Compensation Act while protecting your business against industrial accident liabilities.",
      highlights: ["Statutory Act Compliance", "Medical & Death Benefits", "Litigation Cost Shield"],
      statBadgeTitle: "Statutory Employer Cover",
      statBadgeSub: "Full legal liability protection",
      bgImage: workmenHero,
    },
    overview: "Workmen Compensation Insurance provides statutory financial indemnification for employers against legal liabilities arising from workplace accidents, fatal injuries, permanent total/partial disability, or occupational diseases contracted by workers during employment under the Employee's Compensation Act. It shields businesses from heavy financial penalties and litigation costs while providing immediate medical treatment reimbursement and income compensation to affected workers or their surviving families.",
    benefits: [
      "Coverage for Medical Expenses",
      "Compensation for Death or Disability",
      "Legal Cost Coverage",
      "Compliance with Labor Laws"
    ],
    whoShouldBuy: "Critical for building contractors, civil infrastructure developers, factory owners, manufacturing units, logistics firms, hotel and facility management operators, and any small-to-medium enterprise (SME) employing manual, technical, or operational staff in industrial or field environments.",
    insuranceTypes: [
      {
        name: "Workmen Compensation Policy",
        shortDescription: "Mandatory statutory protection for employers under the Employee's Compensation Act. Reimburses medical expenses, legal litigation fees, and worker disability compensation.",
        keyBenefits: ["100% statutory legal act compliance", "Medical treatment & death benefits", "Litigation cost shield for business owners"]
      }
    ],
    requiredDocuments: [
      "Employee Register / Wage Register",
      "KYC Documents of the business",
      "Details of the nature of work"
    ],
    claimProcess: [
      "Inform the insurer immediately after an employee accident",
      "Submit claim form, medical reports, and HR records",
      "Submit FIR/Post-mortem report in case of fatal accidents",
      "Insurer assesses the liability and processes the compensation"
    ],
    faqs: [
      { q: "Is Workmen Compensation mandatory?", a: "Under the Workmen's Compensation Act, employers hold a strict liability to compensate employees for workplace injuries. Insurance helps transfer this financial risk." },
      { q: "Does it cover occupational diseases?", a: "Yes, certain occupational diseases contracted directly as a result of the employment can be covered." }
    ],
    relatedCategories: ["health", "property"]
  }
};

export const categoriesList = Object.values(insuranceContent).map((cat) => ({
  id: cat.slug,
  name: cat.title,
  icon: cat.icon,
  image: cat.hero.bgImage,
  count: cat.insuranceTypes.length,
  desc: cat.shortDescription,
}));
