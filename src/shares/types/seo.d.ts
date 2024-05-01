type SEOData = {
  title: string;
  description: string;
  keyword: string;
  imgSrc?: string;
};

type OGData = {
  ogTitle?: string;
  ogImage?: string;
  ogDescription?: string;
  ogUrl?: string;
};

type SEOType = {
  seoData?: SEOData;
  ogData?: OGData;
};
