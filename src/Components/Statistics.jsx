import React, { useState } from "react";
import Heading from "./Heading";
import StatisticsBarChart from "./StatisticsBarChart";
import StatisticsAverages from "./StatisticsAverages";
import { useTheme } from "../Contexts/ThemeContext";
import Macros from "./Macros";


export default function Statistics() {
  const {theme} = useTheme();
  return (
    <div className={`stats ${theme === "Dark" ? "dark" : ""}`}>
      <Heading text={"Statistics"} className={"statistics"}/>
      <Macros />
      <StatisticsBarChart />
      <StatisticsAverages />
    </div>
  );
}
