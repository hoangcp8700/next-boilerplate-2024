import Head from 'next/head';

const SEO: React.FC<SEOType> = ({ seoData, ogData }) => (
  <Head>
    {/* Main */}
    <title>{seoData?.title}</title>
    <meta name="description" content={seoData?.description} />
    <meta name="keywords" content={seoData?.keyword} />

    {/* Twitter */}
    <meta name="twitter:title" content={seoData?.title} />
    <meta name="twitter:description" content={seoData?.description} />
    {seoData?.imgSrc && <meta name="twitter:image" content={seoData?.imgSrc} />}

    {/* Open Graph */}
    <meta
      property="og:site_name"
      content={ogData?.ogUrl || window.location.href}
      key="ogsitename"
    />
    <meta
      property="og:url"
      content={ogData?.ogUrl || window.location.href}
      key="ogurl"
    />
    {ogData?.ogImage && <meta property="og:image" content={ogData?.ogImage} />}
    {ogData?.ogTitle && <meta property="og:title" content={ogData?.ogTitle} />}
    {ogData?.ogDescription && (
      <meta property="og:description" content={ogData?.ogDescription} />
    )}
  </Head>
);

export default SEO;
