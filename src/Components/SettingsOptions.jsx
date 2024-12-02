import React from "react";
import SetCalorieGoal from "./SetCalorieGoal";

export default function SettingsOptions({ userDataArr }) {
  const [userData, setUserData] = userDataArr;
  function handleChange(event) {
    switch (event.target.name) {
      case "age":
        if(event.target.value < 0 || event.target.value > 100) event.target.value = 0;
        setUserData((data) => ({...data, age: event.target.value}))
        break;
      case "gender":
        setUserData((data) => ({...data, gender: event.target.value}))
        break;
      case "height":
        if(event.target.value < 0 ) event.target.value = 0;
        setUserData((data) => ({...data, height: event.target.value}))
        break;
      case "weight":
        if(event.target.value < 0 ) event.target.value = 0;
        setUserData((data) => ({...data, weight: event.target.value}))
        break;
      case "level":
        setUserData((data) => ({...data, level: event.target.value}))
        break;
      case "goal":
        setUserData((data) => ({...data, goal: event.target.id}))
        break;
      default:
        break;
    }
  }

  return (
    <div className="options">
      <label htmlFor="age">
        Age <input name="age" id="age" type="number" min="0" max="100" onChange={handleChange} value={userData.age}/>
      </label>
      <label htmlFor="gender">
        Gender{" "}
        <select name="gender" id="gender" onChange={handleChange} value={userData.gender}>
          <option value="" hidden>
            Select
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Height (cm) <input name="height" id="height" type="number" min="0" onChange={handleChange} value={userData.height}/>
      </label>
      <label>
        Weight (kg) <input name="weight" id="weight" type="number" min="0" onChange={handleChange} value={userData.weight}/>
      </label>
      <label htmlFor="level">
        Activity Level{" "}
        <select name="level" id="level" onChange={handleChange} value={userData.level}>
          <option value="sedentary">Sedentary</option>
          <option value="lightly_active">Lightly Active</option>
          <option value="moderately_active">Moderately Active</option>
          <option value="very_active">Very Active</option>
        </select>
      </label>
      <p className="goal-radio-group">
        Goal :
        <label htmlFor="loss">
          <input type="radio" name="goal" id="loss" onChange={handleChange} checked = {userData.goal === "loss"}/> Weight
          Loss
        </label>
        <label htmlFor="maintain">
          <input type="radio" name="goal" id="maintain" onChange={handleChange} checked = {userData.goal === "maintain"}/> Weight Maintenance
        </label>
        <label htmlFor="gain">
          {" "}
          <input type="radio" name="goal" id="gain" onChange={handleChange} checked = {userData.goal === "gain"}/> Weight Gain
        </label>
      </p>
      <SetCalorieGoal />
    </div>
  );
}
