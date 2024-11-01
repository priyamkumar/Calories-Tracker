import CircularProgress from "@mui/material/CircularProgress";

export default function ProgressBar({progress}) {
  return (
        <CircularProgress variant="determinate" value={progress}>
        </CircularProgress>
  )
}
