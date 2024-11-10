import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({children}) {
  const [theme, setTheme] = useState("Light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "Light" ? "Dark" : "Light"));
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
