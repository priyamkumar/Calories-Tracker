import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function Macros({ data }) {
  let carbsLimit = Math.floor(((data.calorieGoal / 100) * 50) / 4);
  let proteinLimit = Math.floor(((data.calorieGoal / 100) * 20) / 4);
  let fatsLimit = Math.floor(((data.calorieGoal / 100) * 30) / 9);

  return (
    <div className="macros-container">
      <div className="card">
        <h3>Carbs</h3>
        <LinearProgress
          variant="determinate"
          value={
            (data.carbs / carbsLimit) * 100 < 100 ? (data.carbs / carbsLimit) * 100 : 100
          }
        />
        <p>
          {data.carbs} / {carbsLimit} g
        </p>
      </div>
      <div className="card">
        <h3>Protein</h3>
        <LinearProgress
          variant="determinate"
          value={
            (data.protein / proteinLimit) * 100 < 100
              ? (data.protein / proteinLimit) * 100
              : 100
          }
        />
        <p>
          {data.protein} / {proteinLimit} g
        </p>
      </div>
      <div className="card">
        <h3>Fats</h3>
        <LinearProgress
          variant="determinate"
          value={
            (data.fats / fatsLimit) * 100 < 100 ? (data.fats / fatsLimit) * 100 : 100
          }
        />
        <p>
          {data.fats} / {fatsLimit} g
        </p>
      </div>
    </div>
  );
}
