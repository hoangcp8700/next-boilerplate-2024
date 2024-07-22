export const setLocalStorage = (name: string, value: string) => {
  window.localStorage.setItem(name, value);
};

export const getLocalStorage = (name: string): string | null =>
  window.localStorage.getItem(name);

export const removeLocalStorage = (name: string): void => {
  window.localStorage.removeItem(name);
};

export const clearLocalStorage = () => window.localStorage.clear();
