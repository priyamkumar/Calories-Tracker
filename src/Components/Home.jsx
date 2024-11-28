import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AddMeal from "./AddMeal";
import { useTheme } from "../Contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux"
import { setDate } from "./CaloriesTodaySlice.js"

export default function CaloriesToday() {

  const dispatch = useDispatch(); 
  const [mealType, setMealType] = useState("");

  let today = new Date().toISOString().split("T")[0];

  const { theme } = useTheme();
  const { currentDate, data } = useSelector((state) => state.calories);

  useEffect(() => {
    let all = JSON.parse(localStorage.getItem("allDates")) || [];
    if(!all.includes(today)) {
      all.push(today);
        localStorage.setItem("allDates", JSON.stringify(all));
      }
  },[]);

  return (
    <main className={theme === "Dark" ? "dark" : ""}>
      <div className="home">
        <div className="calories">
          <div className="calories-consumed">
            <label htmlFor="caloriesDate">
              Date :{" "}
              <input
                type="date"
                style={{colorScheme: theme === "Dark" ? "dark" : ""}}
                max={today}
                id="dataDate"
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
        </div>
        
        <AddMeal
          mealTypeArr={[mealType, setMealType]}
        />
      </div>
    </main>
  );
}
