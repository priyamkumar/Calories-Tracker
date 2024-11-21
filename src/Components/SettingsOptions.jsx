import React from "react";

export default function SettingsOptions({ userDataArr }) {
  const [userData, setUserData] = userDataArr;
  console.log(userData)
  function handleChange(event) {
    switch (event.target.name) {
      case "age":
        setUserData((data) => ({...data, age: event.target.value}))
        console.log("1");
        break;
      case "gender":
        console.log("2");
        break;
      case "weight":
        console.log("3");
        break;
      case "level":
        console.log("4");
        break;
      case "goal":
        console.log("5");
        break;
      default:
        break;
    }
  }
  return (
    <div className="options">
      <label htmlFor="age">
        Age <input name="age" id="age" type="number" min="0" onChange={handleChange} value={userData.age}/>
      </label>
      <label htmlFor="gender">
        Gender{" "}
        <select name="gender" id="gender">
          <option value="" hidden>
            Select
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Weight <input name="weight" id="weight" type="number" min="0" />
      </label>
      <label htmlFor="level">
        Activity Level{" "}
        <select name="level" id="level">
          <option value="sedentary">Sedentary</option>
          <option value="lightly_active">Lightly Active</option>
          <option value="moderately_active">Moderately Active</option>
          <option value="very_active">Very Active</option>
        </select>
      </label>
      <p className="goal-radio-group">
        Goal :
        <label htmlFor="gain">
          <input type="radio" name="goal" id="gain" defaultChecked /> Weight
          Loss
        </label>
        <label htmlFor="maintain">
          <input type="radio" name="goal" id="maintain" /> Weight Maintenance
        </label>
        <label htmlFor="loss">
          {" "}
          <input type="radio" name="goal" id="loss" /> Weight Gain
        </label>
      </p>
    </div>
  );
}
