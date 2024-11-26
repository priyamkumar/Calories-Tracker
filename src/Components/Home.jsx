import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AddMeal from "./AddMeal";
import SliderElement from "./SliderElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../Contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux"
import { setDate } from "./CaloriesTodaySlice.js"

export default function CaloriesToday() {

  const dispatch = useDispatch();

  const [mealType, setMealType] = useState("");
  const { theme } = useTheme();
  const { currentDate, data } = useSelector((state) => state.calories);

  let today = new Date().toISOString().split("T")[0];

  return (
    <main className={theme === "Dark" ? "dark" : ""}>
      <div className="home">
        <div className="calories">
          <div className="calories-consumed">
            <label htmlFor="caloriesDate">
              Date :{" "}
              <input
                type="date"
                max={today}
                name="caloriesDate"
                value={currentDate}
                onChange={(event) => dispatch(setDate(event.target.value))}
              />
            </label>
            <ProgressBar/>
            <h2>
              {data.calories} of {data.calorieGoal} Cal
            </h2>
          </div>
          <div className="calories-goal-heading">
            <h3>Set Calories Goal</h3>
            <FontAwesomeIcon icon={faArrowRight} />
            <SliderElement />
          </div>
        </div>
        
        <AddMeal
          mealTypeArr={[mealType, setMealType]}
        />
      </div>
    </main>
  );
}
