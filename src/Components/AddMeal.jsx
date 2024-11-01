import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMugSaucer, faBreadSlice, faBowlRice, faAppleWhole, faPlus} from '@fortawesome/free-solid-svg-icons'

export default function AddMeal() {  return (
    <div className="meal-container">
      <div className="meal-card">
        <div>
        
          <h3><FontAwesomeIcon icon={faMugSaucer} /> Breakfast</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3><FontAwesomeIcon icon={faBreadSlice} /> Lunch</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>       
          <h3><FontAwesomeIcon icon={faBowlRice} /> Dinner</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div className="meal-card">
        <div>
          <h3><FontAwesomeIcon icon={faAppleWhole} /> Snacks</h3>
          <p>100 / 640 Cal</p>
        </div>
        <button>
        <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}
