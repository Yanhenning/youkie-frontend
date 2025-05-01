export function saveLocalStorage(key: string, value: string): boolean {
  if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
      return true;
  }
  return false
}

export function getLocalStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
  }
  return null
}

export function removeLocalStorage(key: string): boolean {
  if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
      return true;
  }
  return false
}
