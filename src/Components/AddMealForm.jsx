import React, { useState } from "react";
import { searchFood } from "../Utility/openFoodFactsAPI";
import { indianFoodData } from "../Utility/mockData";

export default function AddMealForm({ formRef }) {
  const [query, setQuery] = useState("");
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);

  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  if (m < 10) m = "0" + m;
  const [currentTime, setCurrentTime] = useState(`${h}:${m}`);
  const handleOnChange = (event) => {
    if (event.name === "date") setCurrentTime(event.target.value);
    if (event.name === "meal-name") {
      setQuery(event.target.value);
      let target = indianFoodData.filter((item, i, query) => {
        if (item.name === query) return item;
        console.log(target);
      });
    }
  };
  const handleSearch = async () => {
    setError(null);
    const data = await searchFood(query);
    if (data && data.status === 1) {
      setFoodData(data.product);
      setMeals((meals) => [...meals, data.product.name]);
    } else {
      setFoodData(null);
      setError("Product not found.");
    }
  };

  return (
    <div className="popup-overlay">
      <form className="popup-form" ref={formRef}>
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
          <button onClick={handleSearch} type="button">
            Search
          </button>
          <label htmlFor="calories">
            Calories
            <input type="number" id="calories" min="0" />
          </label>

          <label htmlFor="date">
            Date
            <input
              type="time"
              id="date"
              name="date"
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
