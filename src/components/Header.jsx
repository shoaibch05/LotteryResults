import { useState } from "react";
import NYLotto from "../assets/lotto-logo-white.svg";
import Megamillion from "../assets/mega-millions-logo-white.svg";
import Take5 from "../assets/take-5-logo-white.svg";
import Numbers from "../assets/numbers-logo-white.svg";
import Powerball from "../assets/powerball-logo-white.svg";
import Pick10 from "../assets/pick-10-logo-white.svg";
import Win4 from "../assets/win-4-logo-white.svg";
import QuickDraw from "../assets/quick-draw-logo-white.svg";
import Cash4Life from "../assets/cash-4-life-logo-white.svg";
import information from "../assets/information-logo.svg";
import { Link } from "react-router-dom";

const navItems = [
  {
    logo: NYLotto,
    label: "Lotto",
    url: "/lotto",
    borderColor: "border-red-400",
    links: [
      { name: "New York Lotto ", url: "/lotto/info" },
      { name: "Results", url: "/Lotto/results" },
      { name: "Midday Results", url: "/Lotto/midday" },
      { name: "Evening Results", url: "/Lotto/evening" },
      { name: "Hot Numbers", url: "/Lotto/HotNumbers" },
    ],
  },
  {
    logo: Win4,
    label: "Win 4",
    url: "/win4",
    borderColor: "border-yellow-400",
    links: [
      { name: "Win 4 info ", url: "/win4/info" },
      { name: "Results", url: "/win4/results" },
      { name: "Midday Results", url: "/win4/midday" },
      { name: "Evening Results", url: "/win4/Evening" },
      { name: "Hot Numbers", url: "/win4/HotNumbers" },
    ],
  },
  {
    logo: Numbers,
    label: "Numbers",
    url: "/numbers",
    borderColor: "border-green-400",
    links: [
      { name: "Numbers info", url: "/Numbers/info" },
      { name: "Results", url: "/Numbers/results" },
      { name: "Midday Results", url: "/Numbers/midday" },
      { name: "Evening Results", url: "/Numbers/evening" },
      { name: "Hot Numbers", url: "/Numbers/HotNumbers" },
    ],
  },
  {
    logo: Megamillion,
    label: "Mega Millions",
    url: "/megamillions",
    borderColor: "border-blue-700",
    links: [
      { name: "Mega Millions info", url: "/megamillions/info" },
      { name: "Results", url: "/megamillions/results" },
      { name: "Midday Results", url: "/megamillions/midday" },
      { name: "Evening Results", url: "/megamillions/evening" },
      { name: "Hot Numbers", url: "/megamillions/HotNumbers" },
    ],
  },
  {
    logo: Powerball,
    label: "PowerBall",
    url: "/powerball",
    borderColor: "border-purple-600",
    links: [
      { name: "PowerBall info", url: "/powerball/info" },
      { name: "Midday Results", url: "/powerball/midday" },
      { name: "Evening Results", url: "/powerball/evening" },
      { name: "Hot Numbers", url: "/powerball/HotNumbers" },
    ],
  },
  {
    logo: Take5,
    label: "Take 5",
    url: "/take5",
    borderColor: "border-pink-400",
    links: [
      { name: "Take 5 info", url: "/Take5/info" },
      { name: "Results", url: "/Take5/results" },
      { name: "Midday Results", url: "/Take5/midday" },
      { name: "Evening Results", url: "/Take5/evening" },
      { name: "Hot Numbers", url: "/Take5/HotNumbers" },
    ],
  },

  {
    label: "More",
    subMenus: [
      {
        logo: QuickDraw,
        label: "Quick Draw",
        links: [
          { name: "Quick Draw Results", url: "/quickdraw/results" },
          { name: "Quick Draw Information", url: "/quickdraw/info" },
          { name: "Past Winning Numbers", url: "/quickdraw/past" },
        ],
        borderColor: "border-pink-500",
      },
      {
        logo: Pick10,
        label: "Pick 10",
        links: [
          { name: "Pick 10 Results", url: "/pick10/results" },
          { name: "Pick 10 Information", url: "/pick10/info" },
          { name: "Pick 10 Checker", url: "/pick10/checker" },
        ],
        borderColor: "border-orange-400",
      },
      {
        logo: Cash4Life,
        label: "Cash 4 Life",
        links: [
          { name: "Cash 4 Life Results", url: "/cash4life/results" },
          { name: "Cash 4 Life Information", url: "/cash4life/info" },
          { name: "Cash4Life Checker", url: "/cash4life/checker" },
        ],
        borderColor: "border-green-500",
      },
      {
        label: "Information",
        logo: information,
        links: [
          { name: "FAQs", url: "/faqs" },
          { name: "Scratch Off Tickets", url: "/scratch" },
          { name: "Vax & Scratch", url: "/vax-scratch" },
        ],
        borderColor: "border-red-500",
      },
    ],
  },
];

export default function Header({ headerbgColor = "bg-white" }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  // Close mobile menu when clicking outside (optional enhancement)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setMobileMenuOpen(false);
      setOpenDropdown(null);
    }
  };

  return (
    <header className={`${headerbgColor} text-black px-4 md:px-12 py-3`}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center bg-red-600">
          <Link to="/" onClick={handleLinkClick}>
            <img
              src={NYLotto}
              alt="NY Lotto"
              className="h-10"
              width="120"
              height="40"
              decoding="async"
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-3 relative">
          {navItems.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setOpenDropdown(index)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link to={item.url}>
                <button className="flex flex-col items-center gap-1 font-bold hover:bg-blue-900 hover:text-white px-3 py-2 transition">
                  {item.label}
                  <span className="ml-1 text-xs">▼</span>
                </button>
              </Link>

              {/* Dropdown (desktop) */}
              {openDropdown === index &&
                (item.subMenus ? (
                  // 🟦 Mega menu for "More"
                  <div className="absolute left-0   bg-blue-900 text-white shadow-lg z-50 p-6 grid grid-cols-3 gap-6 w-md">
                    {item.subMenus.map((submenu, sIndex) => (
                      <div key={sIndex}>
                        {submenu.logo && (
                          <img
                            src={submenu.logo}
                            alt={submenu.label}
                            className="mb-2"
                            width="160"
                            height="40"
                            decoding="async"
                            loading="lazy"
                          />
                        )}

                        <hr
                          className={`border-t-2 ${submenu.borderColor} mb-3`}
                        />
                        {submenu.links.map((link, lIndex) => (
                          <Link
                            key={lIndex}
                            to={link.url}
                            className="block px-2 py-1 hover:bg-blue-700 rounded transition"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : (
                  // 🟩 Normal dropdown for others
                  <div className="absolute left-0 w-56 bg-blue-900 text-white shadow-lg z-50 p-3">
                    {item.logo && (
                      <img
                        src={item.logo}
                        alt={item.label}
                        className="mb-4"
                        width="160"
                        height="40"
                        decoding="async"
                        loading="lazy"
                      />
                    )}
                    <hr className={`border-2 ${item.borderColor}`} />
                    {item.links.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.url}
                        className="flex justify-center gap-3 px-4 py-2 hover:bg-blue-700 transition-colors"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span>{link.name}</span>
                      </Link>
                    ))}
                  </div>
                ))}
            </div>
          ))}
          <button className="font-bold hover:opacity-80 hover:bg-blue-700 hover:text-white px-3 py-2 transition">
            Tickets
          </button>
        </nav>

        {/* Desktop Search */}
        <div className="hidden lg:block">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 rounded bg-white text-black border-2"
          />
        </div>

        {/* Hamburger Menu */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu with Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 mt-0"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-blue-900 text-white rounded-lg shadow-lg p-4 space-y-4 mx-4 mt-20 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent backdrop click when clicking inside menu
          >
            {/* Close Button */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Menu</h3>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold hover:text-red-400"
              >
                ×
              </button>
            </div>

            {navItems.map((item, index) => (
              <div key={index}>
                <button
                  className="w-full flex justify-between items-center font-bold px-4 py-3 bg-blue-800 rounded-lg hover:bg-blue-700 transition-colors"
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                >
                  <span>{item.label}</span>
                  <span
                    className={`transform transition-transform ${
                      openDropdown === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Mobile Dropdown */}
                {openDropdown === index &&
                  (item.subMenus ? (
                    // 🟦 Mobile mega menu (stacked)
                    <div className="mt-2 bg-blue-800 rounded-lg p-4 space-y-6">
                      {item.subMenus.map((submenu, sIndex) => (
                        <div key={sIndex}>
                          {submenu.logo && (
                            <img
                              src={submenu.logo}
                              alt={submenu.label}
                              className="mx-auto mb-2 max-w-[120px]"
                            />
                          )}
                          <hr
                            className={`border-t-2 ${submenu.borderColor} mb-3`}
                          />
                          <div className="space-y-2 text-center">
                            {submenu.links.map((link, lIndex) => (
                              <Link
                                key={lIndex}
                                to={link.url}
                                className="block py-2 px-3 hover:bg-blue-600 rounded transition"
                                onClick={handleLinkClick}
                              >
                                {link.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // 🟩 Regular dropdown (unchanged for other items)
                    <div className="mt-2 pl-4 text-center space-y-2 bg-blue-800 rounded-lg p-3">
                      {item.logo && (
                        <img
                          src={item.logo}
                          alt={item.label}
                          className="mx-auto mb-3 max-w-[140px]"
                        />
                      )}
                      <hr className={`border-2 ${item.borderColor} mb-3`} />
                      <div className="space-y-2">
                        {item.links.map((link, idx) => (
                          <Link
                            key={idx}
                            to={link.url}
                            className="block py-2 px-3 hover:bg-blue-600 rounded transition-colors"
                            onClick={handleLinkClick}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ))}

            {/* Tickets Button */}
            <button
              className="block w-full font-bold bg-yellow-400 text-black px-4 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              onClick={handleLinkClick}
            >
              Buy Tickets
            </button>

            {/* Mobile Search */}
            <div className="pt-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded bg-white text-black border-2"
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
