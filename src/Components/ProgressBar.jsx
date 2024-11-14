import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "../Contexts/ThemeContext";

export default function ProgressBar({ data }) {
  const {theme} = useTheme();
  let color = theme === "Dark" ? "white" : "black"
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={
          (data.calories / data.calorieGoal) * 100 < 100
            ? (data.calories / data.calorieGoal) * 100
            : 100
        }
      ></CircularProgress>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: {color} }}
        >
          {`${Math.floor((data.calories / data.calorieGoal) * 100)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
