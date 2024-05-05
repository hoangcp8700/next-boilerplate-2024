type PageParamsType = {
  locale: string;
};

type PageParamsModuleType<T> = {
  params: PageParamsType;
  data?: T;
};

type ProviderType = {
  children: ReactNode;
  locale: string;
};

type SEOType = {
  title?: string;
  description?: string;
  keyword?: string;
  siteName?: string;
  imgSrc?: string;
  robots?: string;
  type?: string;
  themeColor?: string;
};
