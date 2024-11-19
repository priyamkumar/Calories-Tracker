import React, { useState } from "react";
import StatisticsHeading from "./StatisticsHeader";
import StatisticsBarChart from "./StatisticsBarChart";
import StatisticsAverages from "./StatisticsAverages";

export default function Statistics() {
 
  return (
    <div className="stats">
      <StatisticsHeading />
      <StatisticsBarChart />
      <StatisticsAverages />
    </div>
  );
}
