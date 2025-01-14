import Heading from "./Heading";
import SettingsOptions from "./SettingsOptions";
import { useTheme } from "../Contexts/ThemeContext";
import Theme from "./Theme";

export default function Settings() {
  const { theme } = useTheme();
  
  return (
    <div className={`settings ${theme === "Dark" ? "dark" : ""}`}>
      <Heading text={"User Settings"} className={"settings"} />
      <SettingsOptions />
      <Theme />
    </div>
  );
}
