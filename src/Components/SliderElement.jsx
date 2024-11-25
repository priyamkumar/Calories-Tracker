import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useEffect } from "react";

export default function SliderElement({ dataArr }) {
  const [data, handleDataUpdate] = dataArr;
const handleChange = (event) => {
  const newData = {...data, calorieGoal: event.target.value};
  handleDataUpdate(newData);
}

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Set Calories Goal"}
        min={2000}
        max={3200}
        step={10}
        value={data.calorieGoal}
        onChange={handleChange}
      />
    </Box>
  );
}
