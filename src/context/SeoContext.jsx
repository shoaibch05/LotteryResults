import { createContext, useState, useEffect, useCallback } from "react";

export const SEOContext = createContext();

export const SEOProvider = ({ children }) => {
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "Lottery Results Hub",
    siteDescription:
      "Your trusted source for lottery results, winning numbers, and jackpot information.",
    siteKeywords:
      "lottery, results, winning numbers, jackpot, powerball, mega millions",
    siteLogo: "",
    canonicalUrl: "https://lotteryresults.com",
    ogTitle: "Lottery Results Hub - Latest Winning Numbers",
    ogDescription:
      "Get the latest lottery results, winning numbers, and jackpot information.",
    ogImage: "",
    twitterCard: "summary_large_image",
    twitterSite: "@lotteryresults",
  });

  const [loading, setLoading] = useState(true);

  // Fetch SEO settings from backend on mount
  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const fetchSeoSettings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/site/seo-settings"
      );
      if (response.ok) {
        const data = await response.json();
        setSeoSettings(data.data);
      }
    } catch (error) {
      console.error("Error fetching SEO settings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update SEO settings both locally and in backend
  const updateSeoSettings = useCallback(async (newSettings) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/site/seo-settings",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSettings),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSeoSettings(data.data);
        return { success: true, data: data.data };
      } else {
        return { success: false, error: "Failed to update settings" };
      }
    } catch (error) {
      console.error("Error updating SEO settings:", error);
      return { success: false, error: error.message };
    }
  }, []);

  const value = {
    seoSettings,
    loading,
    updateSeoSettings,
    fetchSeoSettings,
  };

  return <SEOContext.Provider value={value}>{children}</SEOContext.Provider>;
};

export default SEOContext;
