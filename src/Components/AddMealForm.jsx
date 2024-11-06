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
  setBreakfastMeals,
  setLunchMeals,
  setDinnerMeals,
  setSnackMeals,
}) {
  const [query, setQuery] = useState("");
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);
  const [meals, setMeals] = mealsArr;
  const [foodCalorie, setFoodCalorie] = useState(0);

  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let element = "";
  if (m < 10) m = "0" + m;
  const [currentTime, setCurrentTime] = useState(`${h}:${m}`);
  const handleOnChange = (event) => {
    console.log(event);
    if (event.target.name === "time") setCurrentTime(event.target.value);
    if (event.target.name === "meal-name") {
      setQuery(event.target.value);
      element = indianFoodData.filter((item, i) => {
        return item.name === event.target.value;
      });
      setFoodCalorie(element[0]?.calories || 0);
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
    let element = indianFoodData.filter((item, i) => {
      return item.name === query;
    });
    setMeals((prev) => [...prev, element]);
    setShowPopup(false);
    setCarbs((prev) => prev + element[0].carbs);
    setProtein((prev) => prev + element[0].protein);
    setFats((prev) => prev + element[0].fats);
    setCalories((prev) => prev + element[0].calories);

    switch (mealType) {
      case "Breakfast":
        setBreakfastMeals((prev) => [...prev, element])
        
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
