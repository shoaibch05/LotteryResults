import { memo, useState } from 'react';

const SEOSettings = memo(() => {
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'Lottery Results Hub',
    siteDescription: 'Your trusted source for lottery results, winning numbers, and jackpot information.',
    siteKeywords: 'lottery, results, winning numbers, jackpot, powerball, mega millions',
    siteLogo: '',
    canonicalUrl: 'https://lotteryresults.com',
    ogTitle: 'Lottery Results Hub - Latest Winning Numbers',
    ogDescription: 'Get the latest lottery results, winning numbers, and jackpot information.',
    ogImage: '',
    twitterCard: 'summary_large_image',
    twitterSite: '@lotteryresults'
  });

  const [sitemapSettings, setSitemapSettings] = useState({
    lastUpdated: '2024-01-15T10:30:00Z',
    totalUrls: 156,
    lastGenerated: '2024-01-15T10:30:00Z'
  });

  const [loading, setLoading] = useState(false);

  const handleSiteSettingsChange = (e) => {
    const { name, value } = e.target;
    setSiteSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSiteSettings = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - replace with actual backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Site settings saved:', siteSettings);
      alert('Site settings saved successfully!');
    } catch (error) {
      console.error('Error saving site settings:', error);
      alert('Error saving site settings');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSitemap = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with actual backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSitemapSettings(prev => ({
        ...prev,
        lastGenerated: new Date().toISOString(),
        totalUrls: prev.totalUrls + 1
      }));
      alert('Sitemap generated successfully!');
    } catch (error) {
      console.error('Error generating sitemap:', error);
      alert('Error generating sitemap');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
        <p className="text-gray-600 mt-1">Manage your site's SEO and sitemap settings</p>
      </div>

      {/* Site-wide SEO Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Site-wide SEO Settings</h2>
        
        <form onSubmit={handleSaveSiteSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Site Title */}
            <div className="md:col-span-2">
              <label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Site Title *
              </label>
              <input
                type="text"
                id="siteTitle"
                name="siteTitle"
                value={siteSettings.siteTitle}
                onChange={handleSiteSettingsChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your site title"
              />
            </div>

            {/* Site Description */}
            <div className="md:col-span-2">
              <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Site Description *
              </label>
              <textarea
                id="siteDescription"
                name="siteDescription"
                value={siteSettings.siteDescription}
                onChange={handleSiteSettingsChange}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of your site"
              />
            </div>

            {/* Site Keywords */}
            <div className="md:col-span-2">
              <label htmlFor="siteKeywords" className="block text-sm font-medium text-gray-700 mb-2">
                Site Keywords
              </label>
              <input
                type="text"
                id="siteKeywords"
                name="siteKeywords"
                value={siteSettings.siteKeywords}
                onChange={handleSiteSettingsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Comma-separated keywords"
              />
            </div>

            {/* Canonical URL */}
            <div>
              <label htmlFor="canonicalUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Canonical URL *
              </label>
              <input
                type="url"
                id="canonicalUrl"
                name="canonicalUrl"
                value={siteSettings.canonicalUrl}
                onChange={handleSiteSettingsChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://yoursite.com"
              />
            </div>

            {/* Site Logo */}
            <div>
              <label htmlFor="siteLogo" className="block text-sm font-medium text-gray-700 mb-2">
                Site Logo URL
              </label>
              <input
                type="url"
                id="siteLogo"
                name="siteLogo"
                value={siteSettings.siteLogo}
                onChange={handleSiteSettingsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://yoursite.com/logo.png"
              />
            </div>
          </div>

          {/* Open Graph Settings */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-semibold text-gray-900 mb-4">Open Graph Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="ogTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  OG Title
                </label>
                <input
                  type="text"
                  id="ogTitle"
                  name="ogTitle"
                  value={siteSettings.ogTitle}
                  onChange={handleSiteSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Open Graph title"
                />
              </div>

              <div>
                <label htmlFor="ogDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  OG Description
                </label>
                <input
                  type="text"
                  id="ogDescription"
                  name="ogDescription"
                  value={siteSettings.ogDescription}
                  onChange={handleSiteSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Open Graph description"
                />
              </div>

              <div>
                <label htmlFor="ogImage" className="block text-sm font-medium text-gray-700 mb-2">
                  OG Image URL
                </label>
                <input
                  type="url"
                  id="ogImage"
                  name="ogImage"
                  value={siteSettings.ogImage}
                  onChange={handleSiteSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://yoursite.com/og-image.png"
                />
              </div>

              <div>
                <label htmlFor="twitterSite" className="block text-sm font-medium text-gray-700 mb-2">
                  Twitter Site
                </label>
                <input
                  type="text"
                  id="twitterSite"
                  name="twitterSite"
                  value={siteSettings.twitterSite}
                  onChange={handleSiteSettingsChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="@yoursite"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${
                loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>

      {/* Sitemap Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Sitemap Management</h2>
        
        <div className="space-y-6">
          {/* Sitemap Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600">Total URLs</h3>
              <p className="text-2xl font-bold text-gray-900">{sitemapSettings.totalUrls}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600">Last Updated</h3>
              <p className="text-sm text-gray-900">{formatDate(sitemapSettings.lastUpdated)}</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-600">Last Generated</h3>
              <p className="text-sm text-gray-900">{formatDate(sitemapSettings.lastGenerated)}</p>
            </div>
          </div>

          {/* Sitemap Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleGenerateSitemap}
              disabled={loading}
              className={`px-6 py-2 text-white rounded-lg transition-colors duration-200 ${
                loading
                  ? 'bg-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Generating...' : 'Generate Sitemap'}
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              View Sitemap
            </a>
            <a
              href="https://search.google.com/search-console"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Google Search Console
            </a>
          </div>

          {/* Sitemap Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-2">Sitemap Information</h3>
            <p className="text-sm text-blue-800">
              Your sitemap is automatically updated when you create or update posts. 
              You can manually regenerate it using the button above, or submit it to 
              Google Search Console for faster indexing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

SEOSettings.displayName = 'SEOSettings';

export default SEOSettings;

