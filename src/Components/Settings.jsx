import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import SettingsOptions from "./SettingsOptions";
import { useTheme } from "../Contexts/ThemeContext";
import { parseLocalStorage, setLocalStorage } from "../Utility/utils";
import Theme from "./Theme";

export default function Settings() {
    const {theme} = useTheme();
    const [userData, setUserData] = useState(parseLocalStorage("userData" ,{
      age: 0,
      gender: "",
      height: 0,
      weight: 0,
      level: "",
      goal: "",
    }));
    useEffect(() => {
      setLocalStorage("userData", userData);
    }, [userData])

  return (
    <div className={`settings ${theme === "Dark" ? "dark" : ""}`}>
        <Heading text={"User Settings"} className={"settings"}/>
        <SettingsOptions userDataArr={[userData, setUserData]}/>
        <Theme/>
    </div>
  );
}
