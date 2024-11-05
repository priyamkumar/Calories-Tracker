import CircularProgress from "@mui/material/CircularProgress";

export default function ProgressBar({calories, calorieGoal}) {
  return (
        <CircularProgress variant="determinate" value={(calories / calorieGoal) * 100}>
        </CircularProgress>
  )
}
