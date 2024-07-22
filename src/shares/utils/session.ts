import { isBrowser } from '.';

export function getSession(name: string) {
  if (isBrowser()) {
    return window.sessionStorage.getItem(name);
  }
}

export function createSession(name: string, data: any) {
  if (isBrowser()) {
    return sessionStorage.setItem(name, data);
  }
}

export function removeSession(name: string) {
  if (isBrowser()) {
    sessionStorage.removeItem(name);
  }
}

export function clearSession() {
  if (isBrowser()) {
    sessionStorage.clear();
  }
}
