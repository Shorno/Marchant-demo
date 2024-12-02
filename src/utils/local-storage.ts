export const setToLocalStorage = (key: string, token:string) => {
  if (!key || typeof window === "undefined") {
     return ""
 }
return localStorage.setItem(key, token)
}

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
     return ""
 }
return localStorage.getItem(key)
}


export const getFromCookies = (cookieName: string): string => {
  if (!cookieName || typeof document === 'undefined') {
    return '';
  }

  const cookies = document.cookie.split(';').map(cookie => cookie.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }

  return '';
};




