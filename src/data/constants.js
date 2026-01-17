// Common data and constants
// Note: All placeholder images should use CVOWF brand colors (#4B2E83 purple, #F5A623 gold)
// when generating or replacing with actual images

export const IMPACT_STATS = [
  { number: "10,000+", label: "Lives Changed", metric: "lives" },
  { number: "50+", label: "Programs Active", metric: "programs" },
  { number: "500+", label: "Volunteers", metric: "volunteers" },
  { number: "$2.5M", label: "Funds Raised", metric: "funds" },
];

export const FEATURED_PROGRAMS = [
  {
    id: 1,
    title: "Clean Water Initiative",
    description:
      "Providing access to clean, safe drinking water in rural communities across Southeast Asia.",
    raised: 75000,
    goal: 100000,
    image: "/images/programimages/Water.png",
    urgent: true,
    category: "health",
  },
  {
    id: 2,
    title: "Education for All",
    description:
      "Building schools and providing educational resources to underserved children.",
    raised: 45000,
    goal: 80000,
    image: "/images/programimages/Education.png",
    urgent: false,
    category: "education",
  },
  {
    id: 3,
    title: "Healthcare Access",
    description:
      "Mobile health clinics bringing medical care to remote communities.",
    raised: 32000,
    goal: 60000,
    image: "/images/programimages/Healthcare.png",
    urgent: false,
    category: "health",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Program Director",
    image: "/images/testimonialimages/SarahChen.png",
    quote:
      "CVWF has transformed how we deliver aid to communities that need it most. Their systematic approach ensures every dollar creates lasting impact.",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Field Volunteer",
    image: "/images/testimonialimages/MarcusRodriguez.png",
    quote:
      "Working with CVWF opened my eyes to the power of grassroots change. Every project I've been part of has made a tangible difference.",
  },
  {
    id: 3,
    name: "Dr. Amira Hassan",
    role: "Medical Partner",
    image: "/images/testimonialimages/DrAmiraHassan.png",
    quote:
      "The healthcare initiatives supported by CVWF have saved countless lives. Their commitment to sustainable solutions is remarkable.",
  },
];

export const QUICK_DONATION_AMOUNTS = [25, 50, 100, 250];

export const NAVIGATION_LINKS = [
  { href: "#programs", label: "Programs" },
  { href: "#impact", label: "Impact" },
  { href: "#about", label: "About" },
  { href: "#volunteer", label: "Volunteer" },
];
