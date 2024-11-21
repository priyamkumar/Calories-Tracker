import React from "react";
import SettingsHeading from "./SettingsHeading";
import SettingsOptions from "./SettingsOptions";
import { useTheme } from "../Contexts/ThemeContext";

export default function Settings() {
    const {theme} = useTheme();
  return (
    <div className={`settings ${theme === "Dark" ? "dark" : ""}`}>
        <SettingsHeading />
        <SettingsOptions/>
    </div>
  );
}
