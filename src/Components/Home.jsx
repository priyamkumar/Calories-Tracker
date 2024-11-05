import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AddMeal from "./AddMeal";
import Macros from "./Macros";

export default function CaloriesToday() {
  const [calorieGoal, setCalorieGoal] = useState(2600);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);
  const [meals, setMeals] = useState([]);

  return (
    <div className="home">
      <div className="calories-consumed">
      <ProgressBar calories={calories} calorieGoal={calorieGoal}/>
      <h2>{calories} of {calorieGoal} Cal</h2>
      </div>
      <Macros carbs={carbs} protein={protein} fats={fats}/>
      <AddMeal calorieGoal={calorieGoal} mealsArr={[meals, setMeals]} setCarbs={setCarbs} setProtein={setProtein} setFats={setFats} setCalories={setCalories}/>
    </div>
  );
}
