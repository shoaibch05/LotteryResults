// src/components/Footer.jsx
import { memo } from "react";

const Footer = () => {
  const footerContent = {
    copyright: "© 2025 Lottery.org",
    paragraphs: [
      "NYLottery.org is an independent service that offers unofficial results and information about games provided by the New York State Lottery. It is not endorsed by or affiliated with any state, multi-state or national lottery provider, including New York State Gaming Commission.",
      "All trademarks and service marks remain the property of their rightful owners and used for informational purposes only.",
    ],
    links: [
      { text: "Disclaimer", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Terms", href: "#" },
      { text: "Contact", href: "#" },
    ],
  };

  return (
    <footer
      className="border-t border-gray-200 w-full"
      style={{
        backgroundColor: "var(--color-brand-gray)",
        height: "320px", // Changed from minHeight to fixed height
        flexShrink: 0, // Prevent footer from shrinking
        position: "relative", // Ensure proper positioning context
      }}
    >
      <div
        className="max-w-7xl mx-auto text-center text-sm text-white px-6 w-full"
        style={{
          paddingTop: "2rem",
          paddingBottom: "2rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Copyright - fixed height container */}
        <div
          style={{
            height: "32px",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="text-base font-medium">{footerContent.copyright}</p>
        </div>

        {/* Paragraphs with fixed heights */}
        <div style={{ marginBottom: "24px" }}>
          {footerContent.paragraphs.map((paragraph, index) => (
            <div
              key={index}
              style={{
                minHeight: "60px",
                marginBottom: index === 0 ? "16px" : "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: "1.75",
              }}
            >
              <p>{paragraph}</p>
            </div>
          ))}
        </div>

        {/* Navigation links with fixed height container */}
        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            minHeight: "40px",
            marginTop: "8px",
          }}
        >
          {footerContent.links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="hover:text-red-400 transition-colors duration-200"
              style={{
                padding: "0.25rem 0.5rem",
              }}
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default memo(Footer);
