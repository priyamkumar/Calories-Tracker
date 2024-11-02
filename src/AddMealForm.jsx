import React from "react";

export default function AddMealForm() {
  var d = new Date(); 
  d.getHours(); 
  d.getMinutes();
  d.getSeconds(); 
  return (
    <form>
    <div className="meal-info">
      <label htmlFor="meal-name">Meal Name <input type="text" id="meal-name" /></label>
      
      <label htmlFor="calories">Calories <input type="number" id="calories" min="0" /></label>
      
      <label htmlFor="date">Date <input type="texte" id="date" /></label>
      
    </div>
    </form>
  );
}
