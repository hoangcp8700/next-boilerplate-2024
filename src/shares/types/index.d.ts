type PageParamsType = {
  locale: string;
  id: string;
};

type PageParamsModuleType = {
  params: PageParamsType;
};

type PageType = {
  children: ReactNode;
  params: PageParamsType;
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

type PaginationParamsType = {
  page?: number;
  size?: number;
  search?: string;
  limit?: number;
  skip?: number;
};

type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
};

type ResponseRTK<T> = {
  data?: T;
  message?: string;
  error?: string;
};
