export const isString = (value: any) => {
  return typeof value === 'string';
};

export const isArray = (value: any) => {
  return Array.isArray(value);
};

export const isObject = (value: any) => {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
};
