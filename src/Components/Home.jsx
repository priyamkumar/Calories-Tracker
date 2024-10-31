import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CaloriesToday() {
  const [calories, setCalories] = useState(0);
  const [progress, setProgress] = useState(10);
  return (
    <>
    <Stack spacing={2} direction="row">
      <CircularProgress variant="determinate" value={progress}><i class="fa-solid fa-utensils"></i></CircularProgress>
      <h2>{calories} of 3000 Cal</h2>
    </Stack>
    </>
  )
}
