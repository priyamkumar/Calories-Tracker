import Slider from '@mui/material/Slider';

export default function SliderElement({calorieGoalArr}) {
  const [calorieGoal, setCalorieGoal] = calorieGoalArr;
  return (
    <Slider
    getAriaLabel={() => 'Set Calories Goal'}
    min={2000}
    max={3000}
    step={10}
    value={calorieGoal}
    onChange={(event)=> setCalorieGoal(event.target.value)}
    
  />
  )
}
