import React, { useState } from "react";
import { searchFood } from "../Utility/openFoodFactsAPI";

export default function AddMealForm({ formRef }) {
  const [query, setQuery] = useState("");
  const [foodData, setFoodData] = useState(null);
  const [error, setError] = useState(null);

  let d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  const [currentTime, setCurrentTime] = useState(`${h}:${m}`);
  const handleOnChange = (event) => {
    setCurrentTime(event.target.value);
  };
  const handleSearch = async () => {
    setError(null);
    const data = await searchFood(query);
    console.log(data);

    if(data && data.status === 1)
    {
      setFoodData(data.product);
    }
  };

  return (
    <div className="popup-overlay">
      <form className="popup-form" ref={formRef}>
        <h2>Add Meal</h2>
        <div className="meal-info">
          <label htmlFor="meal-name">
            Meal Name
            <input
              type="text"
              id="meal-name"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <button onClick={handleSearch} type="button">Search</button>
          <label htmlFor="calories">
            Calories
            <input type="number" id="calories" min="0" />
          </label>

          <label htmlFor="date">
            Date
            <input
              type="time"
              id="date"
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
