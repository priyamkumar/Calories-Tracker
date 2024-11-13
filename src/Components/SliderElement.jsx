import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SliderElement({ dataArr }) {
  const [data, setData] = dataArr;
  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Set Calories Goal"}
        min={2000}
        max={3200}
        step={10}
        value={data.calorieGoal}
        onChange={(event) => setData((prev) => ({...prev, calorieGoal: event.target.value}))}
      />
    </Box>
  );
}
