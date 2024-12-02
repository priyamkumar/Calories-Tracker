import { createContext, useContext, useState } from "react";
import { parseLocalStorage, setLocalStorage } from "../Utility/utils";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState(parseLocalStorage("Theme", "Light"));
  const toggleTheme = () => {
    setTheme((prev) => (prev === "Light" ? "Dark" : "Light"));
    setLocalStorage("Theme", theme === "Light" ? "Dark" : "Light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
