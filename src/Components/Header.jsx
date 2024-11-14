import React from "react";
import Title from "./Title";
import Navbar from "./Navbar";
import Theme from "./Theme";
import { useTheme } from "../Contexts/ThemeContext";

export default function Header() {
  const {theme} = useTheme();
  return (
    <header className={`header ${theme === "Dark" ? "dark" : ""}`}>
      <Title />
      <Navbar />
      <Theme/>
    </header>
  );
}
