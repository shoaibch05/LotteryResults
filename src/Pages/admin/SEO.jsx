import { memo } from 'react';
import SEOSettings from '../../components/admin/seo/SEOSettings';

const SEO = memo(() => {
  return <SEOSettings />;
});

SEO.displayName = 'SEO';

export default SEO;

