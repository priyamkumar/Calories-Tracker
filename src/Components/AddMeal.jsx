import React from 'react'

export default function AddMeal() {
  return (
    <div className="meal-container">
      <div className="meal-card">
        <h3>Breakfast</h3>
        <p>100 / 640 Cal</p>
      </div>
      <div className="add">
        <button><i class="fa-solid fa-plus"></i></button>
      </div>
      <div className="meal-card">
        <h3>Lunch</h3>
        <p>100 / 640 Cal</p>
        <div className="add">
        <button><i class="fa-solid fa-plus"></i></button>
      </div>
      </div>
      <div className="meal-card">
        <h3>Dinner</h3>
        <p>100 / 640 Cal</p>
        <div className="add">
        <button><i class="fa-solid fa-plus"></i></button>
      </div>
      </div>
      <div className="meal-card">
        <h3>Snacks</h3>
        <p>100 / 640 Cal</p>
        <div className="add">
        <button><i class="fa-solid fa-plus"></i></button>
      </div>
      </div>
    </div>
  )
}
