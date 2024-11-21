import React from 'react'

export default function SettingsOptions() {
  return (
    <div className="options">
      <label htmlFor="age">
        Age <input name="age" id="age" type="number" min="0"/>
      </label>
      <label htmlFor="gender">
        Gender {" "}
        <select name="gender" id="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Weight <input name="weight" id="weight" type="number" min="0"/>
      </label>
      <label>
        Activity Level <select name="gender" id="gender">
          <option value="sedentary">Sedentary</option>
          <option value="lightly_active">Lightly Active</option>
          <option value="moderately_active">Moderately Active</option>
          <option value="very_active">Very Active</option>
        </select>
      </label>
      <fieldset className="goal-radio-group">
        Goal :
        <label htmlFor="gain"><input type="radio" name="goal" id="gain" defaultChecked/> Weight Loss</label>
        <label htmlFor="maintain"><input type="radio" name="goal" id="maintain" /> Weight Maintenance</label>
        <label htmlFor="loss"> <input type="radio" name="goal" id="loss" /> Weight Gain</label>
      </fieldset>
      </div>
  )
}
