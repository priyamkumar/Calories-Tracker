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
}) {
  const [showPopup, setShowPopup] = useState(false);

  const [meals, setMeals] = mealsArr;

  const [mealType, setMealType] = mealTypeArr;

  const openPopup = (meal) => {
    setMealType(meal);
    setShowPopup((prev) => !prev);
  };

  let breakfastMeals = meals.filter((meal) => meal.type === "Breakfast") || [];

  let lunchMeals = meals.filter((meal) => meal.type === "Lunch") || [];

  let dinnerMeals = meals.filter((meal) => meal.type === "Dinner") || [];

  let snackMeals = meals.filter((meal) => meal.type === "Snacks") || [];

  const removeMeal = (index) => {
    let deletedMeal = meals.filter((element, i) => index === element.id);
    let updatedMeals = meals.filter((element, i) => index !== element.id);
    setMeals(updatedMeals);
    let updatedCalories = meals.reduce((acc, cur) => acc + cur?.calories, 0);
    setCalories(updatedCalories);
    setCarbs((prev) => Math.round(prev - deletedMeal[0].carbs));
    setProtein((prev) => Math.round(prev - deletedMeal[0].protein));
    setFats((prev) => Math.round(prev -deletedMeal[0].fats));
    setCalories((prev) => Math.round(prev - deletedMeal[0].calories));
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
            {Math.floor((calorieGoal / 100) * 30)} Cal
          </p>
          
            {breakfastMeals.map((meal, index) => (
              <li key={index}>
                {meal.name} - {meal.calories} Cal{" "}
                <button onClick={() => removeMeal(meal.id)}>
                  <FontAwesomeIcon icon={faXmark} />
                </button> {" "}
                {meal.time} 
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
            {Math.floor((calorieGoal / 100) * 30)} Cal
          </p>
          {lunchMeals.map((meal, index) => (
            <li key={index}>
              {meal.name} - {meal.calories} Cal{" "}
              <button onClick={() => removeMeal(meal.id)}>
                <FontAwesomeIcon icon={faXmark} />
              </button> {" "}
              {meal.time} 
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
            {Math.floor((calorieGoal / 100) * 30)} Cal
          </p>
          {dinnerMeals.map((meal, index) => (
            <li key={index}>
              {meal.name} - {meal.calories} Cal{" "}
              <button onClick={() => removeMeal(meal.id)}>
                <FontAwesomeIcon icon={faXmark} /> 
              </button> {" "}
              {meal.time} 
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
            {Math.floor((calorieGoal / 100) * 10)} Cal
          </p>
          {snackMeals.map((meal, index) => (
            <li key={index}>
              {meal.name} - {meal.calories} Cal{" "}
              <button onClick={() => removeMeal(meal.id)}>
                <FontAwesomeIcon icon={faXmark} />
              </button> {" "}
              {meal.time} 
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
        />
      )}
    </div>
  );
}
