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

export default function AddMeal({
  calorieGoal,
  mealsArr,
  mealTypeArr,
  setCarbs,
  setProtein,
  setFats,
  setCalories,
  breakfastMealsArr,
  lunchMealsArr,
  dinnerMealsArr,
  snackMealsArr,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const [meals, setMeals] = mealsArr;

  const [mealType, setMealType] = mealTypeArr;

  const [breakfastMeals, setBreakfastMeals] = breakfastMealsArr;

  const [lunchMeals, setLunchMeals] = lunchMealsArr;

  const [dinnerMeals, setDinnerMeals] = dinnerMealsArr;

  const [snackMeals, setSnackMeals] = snackMealsArr;

  const openPopup = (meal) => {
    setMealType(meal);
    setShowPopup((prev) => !prev);
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
            {breakfastMeals.reduce((acc, cur) => acc + cur[0].calories, 0)} /{" "}
            {Math.floor((calorieGoal / 100) * 30)} Cal
          </p>
          <ul>
            {breakfastMeals.map((meal, index) => (
              <li key={index}>
                {meal[0].name} - {meal[0].calories} Cal{" "}
                <button onClick={() => openPopup("Snacks")}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
              </li>
            ))}
          </ul>
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
            {lunchMeals.reduce((acc, cur) => acc + cur[0].calories, 0)} /{" "}
            {Math.floor((calorieGoal / 100) * 30)} Cal
          </p>
          {lunchMeals.map((meal, index) => (
            <li key={index}>
              {meal[0].name} - {meal[0].calories} Cal{" "}
              <button onClick={() => openPopup("Snacks")}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
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
            {dinnerMeals.reduce((acc, cur) => acc + cur[0].calories, 0)} /{" "}
            {Math.floor((calorieGoal / 100) * 30)} Cal
          </p>
          {dinnerMeals.map((meal, index) => (
            <li key={index}>
              {meal[0].name} - {meal[0].calories} Cal{" "}
              <button onClick={() => openPopup("Snacks")}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
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
            {snackMeals.reduce((acc, cur) => acc + cur[0].calories, 0)} /{" "}
            {Math.floor((calorieGoal / 100) * 10)} Cal
          </p>
          {snackMeals.map((meal, index) => (
            <li key={index}>
              {meal[0].name} - {meal[0].calories} Cal{" "}
              <button onClick={() => openPopup("Snacks")}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
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
          mealsArr={[meals, setMeals]}
          setCarbs={setCarbs}
          setProtein={setProtein}
          setFats={setFats}
          setCalories={setCalories}
          mealType={mealType}
          setBreakfastMeals={setBreakfastMeals}
          setLunchMeals={setLunchMeals}
          setDinnerMeals={setDinnerMeals}
          setSnackMeals={setSnackMeals}
        />
      )}
    </div>
  );
}
