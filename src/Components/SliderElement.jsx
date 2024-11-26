import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useDispatch, useSelector } from "react-redux"
import { updateData } from "./CaloriesTodaySlice.js";

export default function SliderElement() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.calories)
  const handleChange = (event) => {
    const newData = { ...data, calorieGoal: event.target.value };
    dispatch(updateData(newData));
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Set Calories Goal"}
        min={2000}
        max={3500}
        step={10}
        value={data.calorieGoal}
        onChange={handleChange}
      />
    </Box>
  );
}
