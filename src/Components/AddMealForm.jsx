import React, { useState } from "react";
import { foodData } from "../Utility/Anuvaad_INDB_2024.11";
import { useTheme } from "../Contexts/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "./CaloriesTodaySlice.js";

export default function AddMealForm({
  formRef,
  setShowPopup,
  mealType,
  popupType,
  editDataArr,
}) {
  const [editData, setEditData] = editDataArr;
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.calories);
  const [query, setQuery] = useState("");
  const [mealName, setMealName] = useState(popupType === "edit" ? editData?.["food_name"] : "");
  const [foodCalorie, setFoodCalorie] = useState(
    popupType === "edit" ? Math.round(editData?.["energy_kcal"]) : 0
  );
  const [quantity, setQuantity] = useState(
    popupType === "edit" ? editData?.quantity : ""
  );
  const { theme } = useTheme();

  popupType === "edit" ? (mealType = editData.type) : mealType;

  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  if (m < 10) m = "0" + m;
  const [currentTime, setCurrentTime] = useState(`${h}:${m}`);

  const handleOnChange = (event) => {
    if (event.target.name === "time") setCurrentTime(event.target.value);
    else if (event.target.name === "meal-name") {
      setMealName(event.target.value);
      setQuery(event.target.value);
      let element = foodData.find(
        (item) => item["food_name"] === event.target.value
      );
      setFoodCalorie(Math.round(element?.["energy_kcal"]) || 0);
    } else if (event.target.name === "quantity") {
      setQuantity(Number(event.target.value));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const matchedItem = foodData.find((item) => item.food_name === mealName);
    if (!matchedItem) {
      alert("Selected food item not found in the database.");
      return;
    }

    if (popupType === "edit") {
      let deletedMeal = data.meals.find(
        (element) => editData.id === element.id
      );
      let updatedMeals = data.meals.filter(
        (element) => deletedMeal.id !== element.id
      );
      let element = foodData.find((item) => item["food_name"] === mealName);
      setShowPopup(false);
      if (element) {
        let newItem = {
          ...element,
          calories: Math.round((element["energy_kcal"] / 100) * quantity),
          carbs: Math.round((element["carb_g"] / 100) * quantity),
          protein: Math.round((element["protein_g"] / 100) * quantity),
          fats: Math.round((element["fat_g"] / 100) * quantity),
          quantity: quantity,
          id: deletedMeal.id,
          type: mealType,
          time: currentTime,
        };
        dispatch(
          updateData({
            ...data,
            calories: Math.round(data.calories + newItem.calories - deletedMeal.calories),
            meals: [...updatedMeals, newItem],
            carbs: Math.round(data.carbs + newItem.carbs - deletedMeal.carbs),
            protein: Math.round(data.protein + newItem.protein - deletedMeal.protein),
            fats: Math.round(data.fats + newItem.fats - deletedMeal.fats),
          })
        );
      }
    } else {
      let element = foodData.find((item) => item["food_name"] === query);
      setShowPopup(false);
      if (element) {
        let newItem = {
          ...element,
          calories: Math.round((element["energy_kcal"] / 100) * quantity),
          carbs: Math.round((element["carb_g"] / 100) * quantity),
          protein: Math.round((element["protein_g"] / 100) * quantity),
          fats: Math.round((element["fat_g"] / 100) * quantity),
          quantity: quantity,
          id: Math.floor(Math.random() * 1e9),
          type: mealType,
          time: currentTime,
        };
        dispatch(
          updateData({
            ...data,
            calories: data.calories + newItem.calories,
            meals: [...data.meals, newItem],
            carbs: data.carbs + newItem.carbs,
            protein: data.protein + newItem.protein,
            fats: data.fats + newItem.fats,
          })
        );
      }
    }
  };

  return (
    <div className={`popup-overlay`}>
      <form
        className={`popup-form ${theme === "Dark" ? "dark" : ""}`}
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <h2>{popupType === "add" ? "Add" : "Edit"} Meal</h2>
        <div className="meal-info">
          <datalist id="foodname">
            {foodData.map((item, index) => (
              <option key={index} value={item["food_name"]} />
            ))}
          </datalist>
          <label htmlFor="meal-name">
            Meal Name
            <input
              name="meal-name"
              type="text"
              id="foodname"
              list="foodname"
              value={mealName}
              onChange={handleOnChange}
              required
            />
          </label>
          <label htmlFor="quantity">
            Quantity
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="0"
              value={quantity}
              onChange={handleOnChange}
              required
            />
          </label>

          <label htmlFor="calories">
            Calories per 100 g/ml
            <input
              type="number"
              id="calories"
              min="0"
              value={foodCalorie}
              readOnly
            />
          </label>

          <label htmlFor="time">
            Time
            <input
              type="time"
              id="time"
              name="time"
              value={currentTime}
              readOnly
            />
          </label>
        </div>
        <button type="submit">
          {popupType === "add" ? "Add" : "Edit"} Meal
        </button>
      </form>
    </div>
  );
}
