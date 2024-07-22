export interface CustomFetchBaseQueryArgs {
  baseUrl?: string;
}

export type ErrorResponse = {
  errors?: any;
  status?: number | string;
  message?: string;
};
