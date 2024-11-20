import React, { useState } from "react";
import StatisticsHeading from "./StatisticsHeader";
import StatisticsBarChart from "./StatisticsBarChart";
import StatisticsAverages from "./StatisticsAverages";
import { useTheme } from "../Contexts/ThemeContext";


export default function Statistics() {
  const {theme} = useTheme();
 
  return (
    <div className={`stats ${theme === "Dark" ? "dark" : ""}`}>
      <StatisticsHeading />
      <StatisticsBarChart />
      <StatisticsAverages />
    </div>
  );
}
