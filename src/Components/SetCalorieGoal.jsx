import SliderElement from "./SliderElement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function SetCalorieGoal() {
    const {data} = useSelector((state) => state.calories);

  return (
    <div className="calories-goal-heading">
            <h3>Set Calories Goal</h3>
            <FontAwesomeIcon icon={faArrowRight} />
            <SliderElement />
            <p>{data.calorieGoal}</p> 
          </div>
  )
}
