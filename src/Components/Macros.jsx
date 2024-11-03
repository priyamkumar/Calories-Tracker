import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function Macros() {
  const [carbs, setCarbs] = useState(100);
  const [protein, setProtein] = useState(100);
  const [fats, setFats] = useState(50);
  console.log((fats/60)*100);
  return (
    <div className="macros-container">
      <div className="card">
        <h3>Carbs</h3>
        <LinearProgress variant="determinate" value={(carbs/300)*100} />
        <p>{carbs} / 258 g</p>
      </div>
      <div className="card">
        <h3>Protein</h3>
        <LinearProgress variant="determinate" value={(protein/103)*100} />
        <p>{protein} / 103 g</p>
      </div>
      <div className="card">
        <h3>Fats</h3>
        <LinearProgress variant="determinate" value={(fats/60)*100} />
        <p>{fats} / 68 g</p>
      </div>
    </div>
  );
}
