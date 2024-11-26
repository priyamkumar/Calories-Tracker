import { createSlice } from "@reduxjs/toolkit";

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
  allDates: JSON.parse(localStorage.getItem("allDates")) || [],
  data: JSON.parse(
    localStorage.getItem(today)
  ) || defaultData,
};

const dataSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    setDate(state, action) {
      state.currentDate = action.payload;
      state.data = JSON.parse(localStorage.getItem(action.payload)) || defaultData;
    },
    updateData(state, action) {
      state.data = action.payload,
      localStorage.setItem(state.currentDate, JSON.stringify(state.data));
      if (!state.allDates.includes(state.currentDate)) {
        state.allDates.push(state.currentDate);
        localStorage.setItem("allDates", JSON.stringify(state.allDates));
      }
    },
  },
});

export const { setDate, updateData} = dataSlice.actions;
export default dataSlice.reducer;
