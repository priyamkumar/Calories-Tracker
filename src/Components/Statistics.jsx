import React, { useState } from "react";
import Heading from "./Heading";
import StatisticsBarChart from "./StatisticsBarChart";
import StatisticsAverages from "./StatisticsAverages";
import { useTheme } from "../Contexts/ThemeContext";
import Macros from "./Macros";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Statistics() {
  const { theme } = useTheme();
  const { isAuthenticated } = useSelector((state) => state.authentication);
  return (
    <div className={`stats ${theme === "Dark" ? "dark" : ""}`}>
      <Heading text={"Statistics"} className={"statistics"} />
      <Macros />
      {isAuthenticated ? (
        <>
          <StatisticsBarChart />
          <StatisticsAverages />
        </>
      ) : (
        <p className="login-p"><Link to={"/login"}>Login</Link> to view additional information</p>
      )}
    </div>
  );
}
