import React from "react";
import StatisticsHeading from "./StatisticsHeader";
import StatisticsBarChart from "./StatisticsBarChart";

export default function Statistics() {
  return (
    <div className="stats">
      <StatisticsHeading />
      <StatisticsBarChart />
    </div>
  );
}
