/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/logo.svg", destination: "/brand-horizontal.png", permanent: false },
      { source: "/icon.svg", destination: "/brand-icon.png", permanent: false },
        {
            "source": "/leadership",
            "destination": "/about#governance",
            "permanent": true
        },
        {
            "source": "/capability-statement",
            "destination": "/about#capability",
            "permanent": true
        },
        {
            "source": "/careers",
            "destination": "/about#careers",
            "permanent": true
        },
        {
            "source": "/faq",
            "destination": "/about#faq",
            "permanent": true
        },
        {
            "source": "/standards",
            "destination": "/about#standards",
            "permanent": true
        },
        {
            "source": "/locations",
            "destination": "/coverage#cities",
            "permanent": true
        },
        {
            "source": "/locations/port-harcourt",
            "destination": "/coverage#cities",
            "permanent": true
        },
        {
            "source": "/locations/kano",
            "destination": "/coverage#cities",
            "permanent": true
        },
        {
            "source": "/locations/uyo",
            "destination": "/coverage#cities",
            "permanent": true
        },
        {
            "source": "/locations/calabar",
            "destination": "/coverage#cities",
            "permanent": true
        },
        {
            "source": "/locations/enugu",
            "destination": "/coverage#cities",
            "permanent": true
        },
        {
            "source": "/locations/warri",
            "destination": "/coverage#cities",
            "permanent": true
        },
        {
            "source": "/industries/aviation",
            "destination": "/industries#aviation",
            "permanent": true
        },
        {
            "source": "/industries/oil-gas",
            "destination": "/industries#oil-gas",
            "permanent": true
        },
        {
            "source": "/industries/embassies-ngos",
            "destination": "/industries#embassies-ngos",
            "permanent": true
        },
        {
            "source": "/industries/corporate-travel",
            "destination": "/industries#corporate-travel",
            "permanent": true
        },
        {
            "source": "/industries/construction",
            "destination": "/industries#construction",
            "permanent": true
        },
        {
            "source": "/industries/hospitality",
            "destination": "/industries#hospitality",
            "permanent": true
        },
        {
            "source": "/resources/travel-security-nigeria",
            "destination": "/resources#travel-security",
            "permanent": true
        },
        {
            "source": "/resources/executive-protection-checklist",
            "destination": "/resources#executive-protection",
            "permanent": true
        },
        {
            "source": "/resources/airport-arrival-guide",
            "destination": "/resources#airport-arrivals",
            "permanent": true
        },
        {
            "source": "/resources/journey-planning-guide",
            "destination": "/resources#journey-management",
            "permanent": true
        }
    ];
  },
  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "form-action 'self' mailto:",
          "frame-ancestors 'none'",
          "object-src 'none'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "connect-src 'self' https:",
          "upgrade-insecure-requests",
        ].join("; "),
      },
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
