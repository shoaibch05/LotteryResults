// src/components/Footer.jsx
import { memo } from 'react'; // Added memo for performance, if props are stable

const Footer = () => {
   const footerContent = {
    copyright: "© 2025 Lottery.org",
    paragraphs: [
      "NYLottery.org is an independent service that offers unofficial results and information about games provided by the New York State Lottery. It is not endorsed by or affiliated with any state, multi-state or national lottery provider, including New York State Gaming Commission.",
      "All trademarks and service marks remain the property of their rightful owners and used for informational purposes only."
    ],
    links: [
      { text: "Disclaimer", href: "#" },
      { text: "Privacy Policy", href: "#" },
      { text: "Terms", href: "#" },
      { text: "Contact", href: "#" }
    ]
  };

  return (
    <footer 
      // Tailwind classes where possible, inline for specific non-Tailwind needs
      className=" border-t border-gray-200 min-h-8 py-2 w-full  mt-auto"
      
      style={{ 
        backgroundColor: 'var(--color-brand-gray)'

      }}
    >
        <div 
        className="max-w-7xl mx-auto text-center text-sm text-white px-6 pt-4 w-full"
        style={{
          // Ensure consistent spacing and fixed height for inner content
          paddingBottom: '1rem', // Ensure consistent bottom padding
          minHeight: '280px', // Crucial for reserving space
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center' // Vertically centers content if shorter than minHeight
        }}
      >
        {/* Copyright - fixed height container */}
        <div className="h-6 mb-6 flex items-center justify-center">
          <p className="text-base font-medium">{footerContent.copyright}</p>
        </div>

        {/* Paragraphs with fixed heights to prevent shifts */}
        <div className="space-y-4 mb-2">
          {footerContent.paragraphs.map((paragraph, index) => (
            // Apply min-h-[30px] to each paragraph for consistent line height/spacing
            <div 
              key={index}
              className="leading-relaxed min-h-[30px] flex items-center justify-center"
            >
              <p>{paragraph}</p>
            </div>
          ))}
        </div>

        {/* Navigation links with fixed height container */}
        <nav 
          className="flex justify-center items-center space-x-6 flex-wrap gap-2 min-h-[30px]"
          style={{ marginTop: '0.2rem' }} // Keep this as it's specific spacing
        >
          {footerContent.links.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="hover:text-red-400 transition-colors duration-200 px-2 py-1"
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default memo(Footer); // Using memo for the Footer as well