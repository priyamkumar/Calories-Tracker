import React, { useState } from "react";
import Heading from "./Heading";
import SettingsOptions from "./SettingsOptions";
import { useTheme } from "../Contexts/ThemeContext";

export default function Settings() {
    const {theme} = useTheme();
    const [userData, setUserData] = useState({
      age: 1,
      gender: "male",
      weight: 10,
      level: "Sedentary",
      goal : "Weight Loss"
    });
  return (
    <div className={`settings ${theme === "Dark" ? "dark" : ""}`}>
        <Heading text={"Settings"} className={"settings"}/>
        <SettingsOptions userDataArr={[userData, setUserData]}/>
    </div>
  );
}
