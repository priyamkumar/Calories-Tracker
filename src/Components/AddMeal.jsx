import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMugSaucer,
  faBreadSlice,
  faBowlRice,
  faAppleWhole,
  faPlus,
  faXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import AddMealForm from "./AddMealForm";
import { useTheme } from "../Contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "./CaloriesTodaySlice.js";

export default function AddMeal({ mealTypeArr }) {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.calories);

  const [showPopup, setShowPopup] = useState(false);

  const [popupType, setPopupType] = useState("");

  const [mealType, setMealType] = mealTypeArr;

  const [editData, setEditData] = useState({});

  const { theme } = useTheme();

  const openPopup = (meal) => {
    setMealType(meal);
    setShowPopup((prev) => !prev);
    setPopupType("add");
  };

  const editPopup = (mealId) => {
    let mealToEdit = data.meals.filter((meal) => meal.id === mealId);
    setShowPopup((prev) => !prev);
    setPopupType("edit");
    setEditData(mealToEdit[0])
  };

  let breakfastMeals =
    data.meals.filter((meal) => meal.type === "Breakfast") || [];

  let lunchMeals = data.meals.filter((meal) => meal.type === "Lunch") || [];

  let dinnerMeals = data.meals.filter((meal) => meal.type === "Dinner") || [];

  let snackMeals = data.meals.filter((meal) => meal.type === "Snacks") || [];

  const removeMeal = (index) => {
    let deletedMeal = data.meals.filter((element, i) => index === element.id);
    let updatedMeals = data.meals.filter((element, i) => index !== element.id);
    dispatch(
      updateData({
        ...data,
        calories: Math.round(data.calories - deletedMeal[0].calories),
        carbs: Math.round(data.carbs - deletedMeal[0].carbs),
        protein: Math.round(data.protein - deletedMeal[0].protein),
        fats: Math.round(data.fats - deletedMeal[0].fats),
        meals: updatedMeals,
      })
    );
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
          <div className="meal-header">
            <h3>
              <FontAwesomeIcon icon={faMugSaucer} /> Breakfast
            </h3>
            <button className="add-btn" onClick={() => openPopup("Breakfast")}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <p>
            {breakfastMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {Math.floor((data.calorieGoal / 100) * 30)} Cal
          </p>
          {breakfastMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                <p>
                  {meal[0]["food_name"]} - {meal.calories} Cal ({meal.quantity}{" "}
                  g/ml)
                </p>
                <div className="buttons">
                  <button
                    className="edit-btn"
                    onClick={() => editPopup(meal.id)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal.id)}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>{" "}
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
      <div className="meal-card">
        <div>
          <div className="meal-header">
            <h3>
              <FontAwesomeIcon icon={faBreadSlice} /> Lunch
            </h3>
            <button className="add-btn" onClick={() => openPopup("Lunch")}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <p>
            {lunchMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {Math.floor((data.calorieGoal / 100) * 30)} Cal
          </p>

          {lunchMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                <p>
                  {meal[0]["food_name"]} - {meal.calories} Cal ({meal.quantity}{" "}
                  g/ml)
                </p>
                <div className="buttons">
                  <button className="edit-btn">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal.id)}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>{" "}
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
      <div className="meal-card">
        <div>
          <div className="meal-header">
            <h3>
              <FontAwesomeIcon icon={faBowlRice} /> Dinner
            </h3>
            <button className="add-btn" onClick={() => openPopup("Dinner")}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <p>
            {dinnerMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {Math.floor((data.calorieGoal / 100) * 30)} Cal
          </p>
          {dinnerMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                <p>
                  {meal[0]["food_name"]} - {meal.calories} Cal ({meal.quantity}{" "}
                  g/ml)
                </p>
                <div className="buttons">
                  <button className="edit-btn">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal.id)}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>{" "}
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
      <div className="meal-card">
        <div>
          <div className="meal-header">
            <h3>
              <FontAwesomeIcon icon={faAppleWhole} /> Snacks
            </h3>
            <button className="add-btn" onClick={() => openPopup("Snacks")}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <p>
            {snackMeals.reduce((acc, cur) => acc + cur.calories, 0)} /{" "}
            {Math.floor((data.calorieGoal / 100) * 10)} Cal
          </p>
          {snackMeals.map((meal, index) => (
            <li key={index}>
              <div className="meal-items">
                <p>
                  {meal[0]["food_name"]} - {meal.calories} Cal ({meal.quantity}{" "}
                  g/ml)
                </p>
                <div className="buttons">
                  <button className="edit-btn">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal.id)}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>{" "}
                </div>
              </div>
            </li>
          ))}
        </div>
      </div>
      {showPopup && (
        <AddMealForm
          formRef={formRef}
          setShowPopup={setShowPopup}
          mealType={mealType}
          popupType={popupType}
          editDataArr={[editData, setEditData]}
        />
      )}
    </div>
  );
}
