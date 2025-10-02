// src/components/Footer.jsx
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
      style={{ 
        backgroundColor: '#3e434a',
        borderTop: '1px solid #e5e7eb',
        padding: '0.5rem 0',
        marginTop: 'auto', // Critical for flex layout
        width: '100%',
        flexShrink: 0 // Prevents compression
      }}
    >
        <div 
        className="max-w-7xl mx-auto text-center text-sm text-white px-6 py-8 w-full"
        style={{
          // Ensure consistent spacing
          paddingTop: '2rem',
          paddingBottom: '2rem',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {/* Copyright - fixed height */}
        <div className="h-6 mb-6 flex items-center justify-center">
          <p className="text-base font-medium">{footerContent.copyright}</p>
        </div>

        {/* Paragraphs with fixed heights to prevent shifts */}
        <div className="space-y-4 mb-6">
          {footerContent.paragraphs.map((paragraph, index) => (
            <div 
              key={index}
              className="leading-relaxed min-h-[60px] flex items-center justify-center"
            >
              <p>{paragraph}</p>
            </div>
          ))}
        </div>

        {/* Navigation links with fixed height */}
        <nav 
          className="flex justify-center items-center space-x-6 flex-wrap gap-2 min-h-[40px]"
          style={{ marginTop: '1rem' }}
        >
          {footerContent.links.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              className="hover:text-red-400 transition-colors duration-200 px-2 py-1 whitespace-nowrap"
            >
              {link.text}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;