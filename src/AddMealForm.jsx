import React, { useState } from "react";

export default function AddMealForm() {
  let d = new Date(); 
  let h = d.getHours(); 
  let m = d.getMinutes();
  const [currentTime, setCurrentTime] = useState(`${h}:${m}`);
  const handleOnChange = (event) => {
    setCurrentTime(event.target.value)
  }
  return (
    <div className="popup-overlay">
  <form className="popup-form">
    <h2>Add Meal</h2>
    <div className="meal-info">
      <label htmlFor="meal-name">Meal Name
        <input type="text" id="meal-name" />
      </label>
      
      <label htmlFor="calories">Calories
        <input type="number" id="calories" min="0" />
      </label>
      
      <label htmlFor="date">Date
        <input type="time" id="date" value={currentTime} onChange={handleOnChange}/>
      </label>
    </div>
    <button type="submit">Add Meal</button>
  </form>
</div>

  );
}
