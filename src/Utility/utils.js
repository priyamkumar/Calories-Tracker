export const parseLocalStorage = (key, fallback = null) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  };

  export const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  }
