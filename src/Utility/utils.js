export const parseLocalStorage = (key, fallback = null) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback;
    } catch {
      return fallback;
    }
  };

  export const updateAllDates = (state, date) => {
    if (!state.allDates.includes(date)) {
      state.allDates = [...state.allDates, date] ;
      localStorage.setItem("allDates", JSON.stringify(state.allDates));
    }
  };
