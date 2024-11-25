import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faBreadSlice,
  faBowlRice,
  faAppleWhole,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import AddMealForm from "./AddMealForm";
import { useTheme } from "../Contexts/ThemeContext";

export default function AddMeal({ dataArr, mealTypeArr }) {
  const [showPopup, setShowPopup] = useState(false);
  const [data, handleDataUpdate] = dataArr;

  const [mealType, setMealType] = mealTypeArr;

  const { theme } = useTheme();

  const openPopup = (meal) => {
    setMealType(meal);
    setShowPopup((prev) => !prev);
  };

  let breakfastMeals =
    data.meals.filter((meal) => meal.type === "Breakfast") || [];

  let lunchMeals = data.meals.filter((meal) => meal.type === "Lunch") || [];

  let dinnerMeals = data.meals.filter((meal) => meal.type === "Dinner") || [];

  let snackMeals = data.meals.filter((meal) => meal.type === "Snacks") || [];

  const removeMeal = (index) => {
    let deletedMeal = data.meals.filter((element, i) => index === element.id);
    let updatedMeals = data.meals.filter((element, i) => index !== element.id);
    handleDataUpdate({
      ...data,
      calories: Math.round(data.calories - deletedMeal[0].calories),
      carbs: Math.round(data.carbs - deletedMeal[0].carbs),
      protein: Math.round(data.protein - deletedMeal[0].protein),
      fats: Math.round(data.fats - deletedMeal[0].fats),
      meals: updatedMeals,
    });
  };

  let formRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowPopup(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <div className="meal-container">
      <div className="meal-card">
        <div>
          <h3>
            <FontAwesomeIcon icon={faMugSaucer} /> Breakfast
          </h3>
          <p>
            {breakfastMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {(data.calorieGoal / 100) * 30} Cal
          </p>
          {breakfastMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                {meal[0]["food_name"]} - {meal.calories} Cal{" "}
                <button
                  className="remove-btn"
                  onClick={() => removeMeal(meal.id)}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ color: theme === "Dark" ? "white" : "black" }}
                  />
                </button>{" "}
                {meal.time}
              </div>
            </li>
          ))}
        </div>
        <button className="add-btn" onClick={(e) => openPopup("Breakfast")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3>
            <FontAwesomeIcon icon={faBreadSlice} /> Lunch
          </h3>
          <p>
            {lunchMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {(data.calorieGoal / 100) * 30} Cal
          </p>

          {lunchMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                {meal[0]["food_name"]} - {meal.calories} Cal{" "}
                <button
                  className="remove-btn"
                  onClick={() => removeMeal(meal.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>{" "}
                {meal.time}
              </div>
            </li>
          ))}
        </div>
        <button className="add-btn" onClick={() => openPopup("Lunch")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3>
            <FontAwesomeIcon icon={faBowlRice} /> Dinner
          </h3>
          <p>
            {dinnerMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {(data.calorieGoal / 100) * 30} Cal
          </p>
          {dinnerMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                {meal[0]["food_name"]} - {meal.calories} Cal{" "}
                <button
                  className="remove-btn"
                  onClick={() => removeMeal(meal.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>{" "}
                {meal.time}
              </div>
            </li>
          ))}
        </div>
        <button className="add-btn" onClick={() => openPopup("Dinner")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3>
            <FontAwesomeIcon icon={faAppleWhole} /> Snacks
          </h3>
          <p>
            {snackMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {(data.calorieGoal / 100) * 10} Cal
          </p>
          {snackMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                {meal[0]["food_name"]} - {meal.calories} Cal{" "}
                <button
                  className="remove-btn"
                  onClick={() => removeMeal(meal.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>{" "}
                {meal.time}
              </div>
            </li>
          ))}
        </div>
        <button className="add-btn" onClick={() => openPopup("Snacks")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {showPopup && (
        <AddMealForm
          formRef={formRef}
          setShowPopup={setShowPopup}
          dataArr={[data, handleDataUpdate]}
          mealType={mealType}
        />
      )}
    </div>
  );
}
