import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AddMeal from "./AddMeal";
import Macros from "./Macros";
import SliderElement from "./SliderElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./Contexts/ThemeContext";

export default function CaloriesToday() {
  // const [calorieGoal, setCalorieGoal] = useState(2600);
  // const [calories, setCalories] = useState(
  //   JSON.parse(localStorage.getItem("calories")) || 0
  // );
  // const [carbs, setCarbs] = useState(
  //   JSON.parse(localStorage.getItem("carbs")) || 0
  // );
  // const [protein, setProtein] = useState(
  //   JSON.parse(localStorage.getItem("protein")) || 0
  // );
  // const [fats, setFats] = useState(
  //   JSON.parse(localStorage.getItem("fats")) || 0
  // );
  // const [meals, setMeals] = useState(
  //   JSON.parse(localStorage.getItem("meals")) || []
  // );
  const [mealType, setMealType] = useState("");
  const { theme } = useTheme();

  let today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem(date)) || {
      calorieGoal: 2600,
      calories: 0,
      carbs: 0,
      protein: 0,
      fats: 0,
      meals: [],
    }
  );

  const updateData = (data) => {
    setData(data);
  };

  useEffect(() => {
    let dateData = JSON.parse(localStorage.getItem(date));
    if (dateData) {
      updateData(dateData);
    }
    // localStorage.setItem("date", JSON.stringify(date));
    // localStorage.setItem("meals", JSON.stringify(meals));
    // localStorage.setItem("calories", JSON.stringify(calories));
    // localStorage.setItem("calorieGoal", JSON.stringify(calorieGoal));
    // localStorage.setItem("carbs", JSON.stringify(carbs));
    // localStorage.setItem("protein", JSON.stringify(protein));
    // localStorage.setItem("fats", JSON.stringify(fats));
  }, [date]);

  useEffect(() => {
    localStorage.setItem(date, JSON.stringify(data));
  }, [data]);

  const handleDate = (event) => {
    setDate(event.target.value);
    // let dateData = JSON.parse(localStorage.getItem(date));
    // // console.log(dateData);
    // if(dateData)
    // {
    //   updateData(dateData);

    // }
    // else {
    //   localStorage.setItem(date, JSON.stringify(data));
    // }
  };

  return (
    <main className={theme === "Dark" ? "dark" : ""}>
      <div className="home">
        <div className="calories">
          <div className="calories-consumed">
            <input
              type="date"
              max={today}
              name="caloriesDate"
              value={date}
              onChange={handleDate}
            />
            <ProgressBar data={data} />
            <h2>
              {data.calories} of {data.calorieGoal} Cal
            </h2>
          </div>
          <div className="calories-goal-heading">
            <h3>Set Calories Goal</h3>
            <FontAwesomeIcon icon={faArrowRight} />
            <SliderElement dataArr={[data, setData]} />
          </div>
        </div>
        <Macros
          data={data}
          // carbs={carbs}
          // protein={protein}
          // fats={fats}
        />
        <AddMeal
          dataArr={[data, setData]}
          // mealsArr={[meals, setMeals]}
          mealTypeArr={[mealType, setMealType]}
          // setCarbs={setCarbs}
          // setProtein={setProtein}
          // setFats={setFats}
          // setCalories={setCalories}
        />
      </div>
    </main>
  );
}
