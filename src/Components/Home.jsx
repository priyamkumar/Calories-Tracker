import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import AddMeal from "./AddMeal";
import Macros from "./Macros";
import SliderElement from "./SliderElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../Contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux"
import { setDate, updateData } from "./CaloriesTodaySlice.js"

export default function CaloriesToday() {

  const dispatch = useDispatch();

  const [mealType, setMealType] = useState("");
  const { theme } = useTheme();
  const { currentDate, data } = useSelector((state) => state.calories);

  let today = new Date().toISOString().split("T")[0];

  const handleDateChange = (event) => {
    dispatch(setDate(event.target.value));
  }

  const handleDataUpdate = (newData) => {
    dispatch(updateData(newData));
  }


  const [date, setDate] = useState(today);
  const [allDate, setAllDate] = useState(
    JSON.parse(localStorage.getItem("allDates")) || []
  );

  // const [data, setData] = useState(
  //   JSON.parse(localStorage.getItem(date)) || {
  //     calorieGoal: 2600,
  //     calories: 0,
  //     carbs: 0,
  //     protein: 0,
  //     fats: 0,
  //     meals: [],
  //   }
  // );

  // const defaultData = {
  //   calorieGoal: 2600,
  //   calories: 0,
  //   carbs: 0,
  //   protein: 0,
  //   fats: 0,
  //   meals: [],
  // };

  // const updateData = (data) => {
  //   setData(data);
  // };

  // useEffect(() => {
  //   let dateData = JSON.parse(localStorage.getItem(date));
  //   if (dateData) {
  //     updateData(dateData);
  //   } else {
  //     setData(defaultData);
  //   }
  // }, [date]);

  // useEffect(() => {
  //   localStorage.setItem(date, JSON.stringify(data));
  //   setAllDate(!allDate.includes(date) ? [...allDate, date] : [...allDate]);
  //   localStorage.setItem("allDates", JSON.stringify(allDate));
  // }, [data, date]);

  // const handleDate = (event) => {
  //   setDate(event.target.value);
  // };

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
                value={date}
                onChange={handleDateChange}
              />
            </label>
            <ProgressBar data={data} />
            <h2>
              {data.calories} of {data.calorieGoal} Cal
            </h2>
          </div>
          <div className="calories-goal-heading">
            <h3>Set Calories Goal</h3>
            <FontAwesomeIcon icon={faArrowRight} />
            <SliderElement dataArr={[data, handleDataUpdate]} />
          </div>
        </div>
        <Macros data={data} />
        <AddMeal
          dataArr={[data, handleDataUpdate]}
          mealTypeArr={[mealType, setMealType]}
        />
      </div>
    </main>
  );
}
