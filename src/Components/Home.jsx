import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import AddMeal from "./AddMeal";
import Macros from "./Macros";

export default function CaloriesToday() {
  const [calories, setCalories] = useState(0);
  const [progress, setProgress] = useState(100);
  return (
    <div className="home">
      <div className="calories-consumed">
      <ProgressBar progress={progress}/>
      <h2>{calories} of 3000 Cal</h2>
      </div>
      <Macros/>
      <AddMeal/>
    </div>
  );
}
