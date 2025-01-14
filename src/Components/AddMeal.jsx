import { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import toast from "react-hot-toast";
import { server } from "../main.jsx";
import { useOutletContext } from "react-router-dom";

export default function AddMeal({ mealTypeArr }) {
  const dispatch = useDispatch();

  const { setState } = useOutletContext();

  const { currentDate, data } = useSelector((state) => state.calories);

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
    let mealToEdit = data.meals.find((meal) => meal._id === mealId);
    setShowPopup((prev) => !prev);
    setPopupType("edit");
    setEditData(mealToEdit);
  };

  let breakfastMeals =
    data.meals.filter((meal) => meal.mealType === "Breakfast") || [];

  let lunchMeals = data.meals.filter((meal) => meal.mealType === "Lunch") || [];

  let dinnerMeals =
    data.meals.filter((meal) => meal.mealType === "Dinner") || [];

  let snackMeals =
    data.meals.filter((meal) => meal.mealType === "Snacks") || [];

  const removeMeal = async (index) => {
    let deletedMeal = data.meals.find((element, i) => index === element._id);
    let updatedMeals = data.meals.filter((element, i) => index !== element._id);
    let newData = {
      ...data,
      calories: Math.round(data.calories - deletedMeal.calories),
      carbs: Math.round(data.carbs - deletedMeal.carbs),
      protein: Math.round(data.protein - deletedMeal.protein),
      fats: Math.round(data.fats - deletedMeal.fats),
      meals: updatedMeals,
    };

    try {
      const res = await axios.delete(`${server}/track/delete`, {
        data: {
          mealId: deletedMeal._id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      toast.success("Meal Deleted");
      dispatch(updateData(newData));
      setState((state) => ({ ...state, [currentDate]: newData }));
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
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
                  {meal.mealName} - {meal.calories} Cal ({meal.quantity} g/ml)
                </p>
                <div className="buttons">
                  <button
                    className="edit-btn"
                    onClick={() => editPopup(meal._id)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal._id)}
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
                  {meal.mealName} - {meal.calories} Cal ({meal.quantity} g/ml)
                </p>
                <div className="buttons">
                  <button
                    className="edit-btn"
                    onClick={() => editPopup(meal._id)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal._id)}
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
                  {meal.mealName} - {meal.calories} Cal ({meal.quantity} g/ml)
                </p>
                <div className="buttons">
                  <button
                    className="edit-btn"
                    onClick={() => editPopup(meal._id)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal._id)}
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
                  {meal.mealName} - {meal.calories} Cal ({meal.quantity} g/ml)
                </p>
                <div className="buttons">
                  <button
                    className="edit-btn"
                    onClick={() => editPopup(meal._id)}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ color: theme === "Dark" ? "white" : "black" }}
                    />
                  </button>
                  <button
                    className="remove-btn"
                    onClick={() => removeMeal(meal._id)}
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
