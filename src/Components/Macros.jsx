import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function Macros() {
  return (
    <div className="macros-container">
      <div className="card">
        <h3>Carbs</h3>
        <LinearProgress variant="determinate" value={10} />
        <p>206 / 258 g</p>
      </div>
      <div className="card">
        <h3>Protein</h3>
        <LinearProgress variant="determinate" value={10} />
        <p>35 / 103 g</p>
      </div>
      <div className="card">
        <h3>Fats</h3>
        <LinearProgress variant="determinate" value={10} />
        <p>32 / 68 g</p>
      </div>
    </div>
  );
}
