import React, { useEffect, useState } from "react";
import { searchFood } from "../Utility/openFoodFactsAPI";
import { indianFoodData } from "../Utility/mockData";

export default function AddMealForm({
  formRef,
  setShowPopup,
  mealsArr,
  setCarbs,
  setProtein,
  setFats,
  setCalories,
  mealType,
}) {
  const [query, setQuery] = useState("");
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);
  const [meals, setMeals] = mealsArr;
  const [foodCalorie, setFoodCalorie] = useState(0);
  const [quantity, setQuantity] = useState("");

  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  if (m < 10) m = "0" + m;
  const [currentTime, setCurrentTime] = useState(`${h}:${m}`);
  const handleOnChange = (event) => {
    if (event.target.name === "time") setCurrentTime(event.target.value);
    if (event.target.name === "meal-name") {
      setQuery(event.target.value);
      let element = indianFoodData.filter((item, i) => {
        return item.name === event.target.value;
      });
      setFoodCalorie(element[0]?.calories || 0);
      setQuantity(element[0]?.quantity || 0);
    }
  };
  // const handleSearch = async () => {
  //   setError(null);
  //   const data = await searchFood(query);
  //   if (data && data.status === 1) {
  //     setFoodData(data.product);
  //     setMeals((meals) => [...meals, data.product.name]);
  //   } else {
  //     setFoodData(null);
  //     setError("Product not found.");
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    let element = indianFoodData.filter((item, i) => item.name === query);
    setShowPopup(false);
    if (element[0]) {
      let newItem = {
        ...element[0],
        id: Math.floor(Math.random() * 1e9),
        type: mealType,
      };
      setMeals((prev) => [...prev, newItem]);
      setCarbs((prev) => prev + Math.floor(element[0].carbs));
      setProtein((prev) => prev + Math.floor(element[0].protein));
      setFats((prev) => prev + Math.floor(element[0].fats));
      setCalories((prev) => prev + Math.floor(element[0].calories));
    }
  };

  return (
    <div className="popup-overlay">
      <form className="popup-form" ref={formRef} onSubmit={handleSubmit}>
        <h2>Add Meal</h2>
        <div className="meal-info">
          <datalist id="foodname">
            {indianFoodData.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <label htmlFor="meal-name">
            Meal Name
            <input
              name="meal-name"
              type="text"
              id="foodname"
              list="foodname"
              onChange={handleOnChange}
            />
          </label>
          {/* <button onClick={handleSearch} type="button">
            Search
          </button> */}
          <label htmlFor="quantity">
            Quantity
            <input
              type="text"
              id="quantity"
              min="0"
              value={quantity}
              readOnly
            />
          </label>

          <label htmlFor="calories">
            Calories
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
              onChange={handleOnChange}
            />
          </label>
        </div>
        <button type="submit">Add Meal</button>
      </form>
    </div>
  );
}
