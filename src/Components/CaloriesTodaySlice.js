import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDate: new Date().toISOString().split("T")[0],
  allDates: JSON.parse(localStorage.getItem("allDates")) || [],
  data: JSON.parse(
    localStorage.getItem(new Date().toISOString().split("T")[0])
  ) || {
    calorieGoal: 2600,
    calories: 0,
    carbs: 0,
    protein: 0,
    fats: 0,
    meals: [],
  },
};

const dataSlice = createSlice({
  name: "calories",
  initialState,
  reducers: {
    setDate(state, action) {
      state.currentDate = action.payload;
      const dateData = JSON.parse(localStorage.getItem(action.payload));
      state.data = dateData || {
        calorieGoal: 2600,
        calories: 0,
        carbs: 0,
        protein: 0,
        fats: 0,
        meals: [],
      };
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
