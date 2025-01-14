import { createSlice } from "@reduxjs/toolkit";
import { updateAllDates, parseLocalStorage, setLocalStorage } from "../Utility/utils";

let today = new Date().toISOString().split("T")[0];

const defaultData = {
  calorieGoal: 2600,
  calories: 0,
  carbs: 0,
  protein: 0,
  fats: 0,
  meals: [],
};

const initialState = {
  currentDate: today,
  allDates: parseLocalStorage("allDates", []),
  data: defaultData,
};

const dataSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    setDate(state, action) {
      const newDate = action.payload;
      state.currentDate = newDate;
    },
    updateData(state, action) {
      state.data = action.payload,
      updateAllDates(state, state.currentDate);
    },
  },
});

export const { setDate, updateData } = dataSlice.actions;
export default dataSlice.reducer;
