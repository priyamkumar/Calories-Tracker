import { createSlice } from "@reduxjs/toolkit";
import { updateAllDates } from "../Utility/utils";

let today = new Date().toISOString().split("T")[0];

const defaultData = {
  calorieGoal: 2600,
  calories: 0,
  carbs: 0,
  protein: 0,
  fats: 0,
  meals: [],
};

if (!localStorage.getItem(today)) {
  localStorage.setItem(today, JSON.stringify(defaultData));
}

const initialState = {
  currentDate: today,
  allDates: JSON.parse(localStorage.getItem("allDates")) || [],
  data: JSON.parse(localStorage.getItem(today)),
};

const dataSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    setDate(state, action) {
      const newDate = action.payload;
      const cachedDateData = localStorage.getItem(newDate);
      if (!cachedDateData) {
        localStorage.setItem(newDate, JSON.stringify(defaultData));
      }
      state.currentDate = newDate;
      state.data = cachedDateData ? JSON.parse(cachedDateData) : defaultData;
    },
    updateData(state, action) {
      state.data = action.payload,
      localStorage.setItem(state.currentDate, JSON.stringify(state.data));
      updateAllDates(state, state.currentDate);
    },
  },
});

export const { setDate, updateData } = dataSlice.actions;
export default dataSlice.reducer;
