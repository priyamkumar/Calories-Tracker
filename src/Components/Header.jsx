import Title from "./Title";
import Navbar from "./Navbar";
import { useTheme } from "../Contexts/ThemeContext";

export default function Header({ handleLogout }) {
  const {theme} = useTheme();
  return (
    <header className={`header ${theme === "Dark" ? "dark" : ""}`}>
      <Title />
      <Navbar handleLogout={handleLogout}/>
    </header>
  );
}
