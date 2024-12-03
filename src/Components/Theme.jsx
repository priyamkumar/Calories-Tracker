import { useTheme } from "../Contexts/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import Heading from "./Heading";

export default function Theme() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="theme-section">
      <Heading text={"Select Theme"} className={"theme"}/>
      <button id="darkModeToggle" onClick={toggleTheme}>
        {theme === "Light" ? "Dark" : "Light"} Mode{" "}
        <FontAwesomeIcon icon={theme === "Light" ? faMoon : faSun} />
      </button>
    </div>
  );
}
