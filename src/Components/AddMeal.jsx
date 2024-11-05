import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMugSaucer, faBreadSlice, faBowlRice, faAppleWhole, faPlus} from '@fortawesome/free-solid-svg-icons'
import AddMealForm from "./AddMealForm";

export default function AddMeal({setCarbs, setProtein, setFats}) {
  const [showPopup, setShowPopup] = useState(false);
  const [meals, setMeals] = useState([]);

  const openPopup = () => {
    setShowPopup((prev) =>!prev)
  }

  let formRef = useRef();

  useEffect(() => {
    let handler = (e) => {
        if(formRef.current && !formRef.current.contains(e.target)) 
          {
            setShowPopup(false);
          }
    }
    document.addEventListener("mousedown", handler);
  })
  console.log(meals.map((meal) => meal[0].name));

    return (
    <div className="meal-container">
      <div className="meal-card">
        <div>
        
          <h3><FontAwesomeIcon icon={faMugSaucer} /> Breakfast</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button onClick={openPopup}>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3><FontAwesomeIcon icon={faBreadSlice} /> Lunch</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button onClick={() => openPopup()}>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>       
          <h3><FontAwesomeIcon icon={faBowlRice} /> Dinner</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button onClick={() => openPopup()}>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3><FontAwesomeIcon icon={faAppleWhole} /> Snacks</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button onClick={() => openPopup()}>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {showPopup && <AddMealForm formRef={formRef} setShowPopup={setShowPopup} mealsArr={[meals, setMeals]}/>}
      {meals.map((meal) => (
        <ul>
          <li>
            {meal[0].name}
          </li>
          </ul>
      ))}
    </div>
  );
}
