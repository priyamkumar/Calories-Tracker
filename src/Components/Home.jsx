import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AddMeal from "./AddMeal";
import Macros from "./Macros";
import SliderElement from "./SliderElement";

export default function CaloriesToday() {
  const [calorieGoal, setCalorieGoal] = useState(2600);
  const [calories, setCalories] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [protein, setProtein] = useState(0);
  const [fats, setFats] = useState(0);
  const [meals, setMeals] = useState([]);
  const [mealType, setMealType] = useState("");
  const [breakfastMeals, setBreakfastMeals] = useState([]);
  const [lunchMeals, setLunchMeals] = useState([]);
  const [DinnerMeals, setDinnerMeals] = useState([]);
  const [snackMeals, setSnackMeals] = useState([]);

  console.log(breakfastMeals);

  return (
    <div className="home">
      <div className="calories">
        <div className="calories-consumed">
          <ProgressBar calories={calories} calorieGoal={calorieGoal} />
          <h2>
            {calories} of {calorieGoal} Cal
          </h2>
        </div>
        <div className="calories-goal-heading">
          <h3>Set Calories Goal</h3>
          <SliderElement calorieGoalArr={[calorieGoal, setCalorieGoal]} />
        </div>
      </div>
      <Macros
        calorieGoal={calorieGoal}
        carbs={carbs}
        protein={protein}
        fats={fats}
      />
      <AddMeal
        calorieGoal={calorieGoal}
        mealsArr={[meals, setMeals]}
        mealTypeArr={[mealType, setMealType]}
        setCarbs={setCarbs}
        setProtein={setProtein}
        setFats={setFats}
        setCalories={setCalories}
        setBreakfastMeals={setBreakfastMeals}
        setLunchMeals={setLunchMeals}
        setDinnerMeals={setDinnerMeals}
        setSnackMeals={setSnackMeals}
      />
    </div>
  );
}
