export * from './queryString';
export * from './file';
export * from './validate';
export * from './string';
export * from './price';

export const isBrowser = (): boolean => typeof window !== 'undefined';
