import React, { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function Macros({ calorieGoal, carbs, protein, fats }) {
  let carbsLimit = Math.floor(((calorieGoal / 100) * 50) / 4);
  let proteinLimit = Math.floor(((calorieGoal / 100) * 20) / 4);
  let fatsLimit = Math.floor(((calorieGoal / 100) * 30) / 9);

  return (
    <div className="macros-container">
      <div className="card">
        <h3>Carbs</h3>
        <LinearProgress
          variant="determinate"
          value={
            (carbs / carbsLimit) * 100 < 100 ? (carbs / carbsLimit) * 100 : 100
          }
        />
        <p>
          {carbs} / {carbsLimit} g
        </p>
      </div>
      <div className="card">
        <h3>Protein</h3>
        <LinearProgress
          variant="determinate"
          value={
            (protein / proteinLimit) * 100 < 100
              ? (protein / proteinLimit) * 100
              : 100
          }
        />
        <p>
          {protein} / {proteinLimit} g
        </p>
      </div>
      <div className="card">
        <h3>Fats</h3>
        <LinearProgress
          variant="determinate"
          value={
            (fats / fatsLimit) * 100 < 100 ? (fats / fatsLimit) * 100 : 100
          }
        />
        <p>
          {fats} / {fatsLimit} g
        </p>
      </div>
    </div>
  );
}
