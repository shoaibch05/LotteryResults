// src/components/SEO.jsx
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

/**
 * SEO Component - Dynamic Meta Tags
 *
 * Usage:
 * <SEO
 *   title="Page Title"
 *   description="Page description"
 *   type="article"
 *   canonical="https://yoursite.com/page"
 * />
 */

const SEO = ({
  title,
  description,
  type = "website",
  canonical,
  noindex = false,
  keywords,
  author,
  publishedTime,
  modifiedTime,
  section,
  tags,
}) => {
  // Default site info (can be fetched from admin settings API)
  const siteTitle = "Lottery Results Hub";
  const siteName = "Lottery Results Hub";
  const siteUrl = window.location.origin;
  const twitterHandle = "@lotteryresults";

  // Construct full title
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  // Construct canonical URL
  const canonicalUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {author && <meta name="author" content={author} />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title || siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />

      {/* Open Graph - Article specific */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      {type === "article" &&
        tags &&
        tags.length > 0 &&
        tags.map((tag, index) => (
          <meta property="article:tag" content={tag} key={index} />
        ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title || siteTitle} />
      <meta name="twitter:description" content={description} />

      {/* Additional SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["website", "article"]),
  canonical: PropTypes.string,
  noindex: PropTypes.bool,
  keywords: PropTypes.string,
  author: PropTypes.string,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  section: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

export default SEO;
