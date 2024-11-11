import { useTheme } from "./Contexts/ThemeContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMoon,
    faSun
} from "@fortawesome/free-solid-svg-icons";

export default function Theme() {
    const {theme, toggleTheme} = useTheme();
  return (
    <button id="darkModeToggle" onClick={toggleTheme}>{theme === "Light" ? "Dark" : "Light"} Mode <FontAwesomeIcon icon={theme === "Light" ? faMoon : faSun}/></button>
  )
}
