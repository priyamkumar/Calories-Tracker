import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faBreadSlice,
  faBowlRice,
  faAppleWhole,
  faPlus,
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
  setBreakfastMeals,
  setLunchMeals,
  setDinnerMeals,
  setSnackMeals,
}) {
  const [showPopup, setShowPopup] = useState(false);

  const [meals, setMeals] = mealsArr;

  const [mealType, setMealType] = mealTypeArr;

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
          <p>100 / {Math.floor((calorieGoal / 100) * 30)} Cal</p>
        </div>
        <button onClick={(e) => openPopup("Breakfast")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3>
            <FontAwesomeIcon icon={faBreadSlice} /> Lunch
          </h3>
          <p>100 / {Math.floor((calorieGoal / 100) * 30)} Cal</p>
        </div>
        <button onClick={() => openPopup("Lunch")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3>
            <FontAwesomeIcon icon={faBowlRice} /> Dinner
          </h3>
          <p>100 / {Math.floor((calorieGoal / 100) * 30)} Cal</p>
        </div>
        <button onClick={() => openPopup("Dinner")}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3>
            <FontAwesomeIcon icon={faAppleWhole} /> Snacks
          </h3>
          <p>100 / {Math.floor((calorieGoal / 100) * 10)} Cal</p>
        </div>
        <button onClick={() => openPopup("Snacks")}>
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
