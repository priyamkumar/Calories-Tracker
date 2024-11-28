import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import SettingsOptions from "./SettingsOptions";
import { useTheme } from "../Contexts/ThemeContext";

export default function Settings() {
    const {theme} = useTheme();
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || {
      age: 0,
      gender: "",
      height: 0,
      weight: 0,
      level: "",
      goal: "",
    });
    useEffect(() => {
      localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData])

  return (
    <div className={`settings ${theme === "Dark" ? "dark" : ""}`}>
        <Heading text={"User Settings"} className={"settings"}/>
        <SettingsOptions userDataArr={[userData, setUserData]}/>
    </div>
  );
}
