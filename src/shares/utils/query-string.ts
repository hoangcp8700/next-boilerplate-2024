export const queryString = (obj: Record<string, string | number>) => {
  return `?${Object.keys(obj)
    .map((key) => {
      return `${key}=${encodeURIComponent(obj[key])}`;
    })
    .join('&')}`;
};
