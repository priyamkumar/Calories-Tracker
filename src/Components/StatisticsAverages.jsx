import { useSelector } from "react-redux";
import { parseLocalStorage } from "../Utility/utils";

export default function StatisticsAverages() {
  const { currentDate } = useSelector((state) => state.calories);

  let today = new Date().toISOString().split("T")[0];
  let todayData = parseLocalStorage(today, { calorieGoal: 0, calories: 0 });
  let remainingCal = Math.max(todayData.calorieGoal - todayData.calories, 0);

  let allDates = parseLocalStorage("allDates", []);
  let barDates = allDates
    .sort((a, b) => new Date(a) - new Date(b))
    .slice(-7)
    .reverse();
  let barData = barDates.map((el) => parseLocalStorage(el));
  const getWeeklyAverage = (key) => (
    Math.round(barData.reduce((acc, cur) => acc + (cur[key] || 0), 0) / 7)
  );

  let averageWeekCal = getWeeklyAverage("calories");
  let averageWeekCarbs = getWeeklyAverage("carbs");
  let averageWeekProtein = getWeeklyAverage("protein");
  let averageWeekFats = getWeeklyAverage("fats");

  let userData = parseLocalStorage("userData", {
    weight: 0,
    height: 0,
    age: 0,
    gender: "",
    level: "",
    goal: "",
  });
  userData.weight = Number(userData.weight);
  userData.height = Number(userData.height);
  let bmi =
    userData.height && userData.weight
      ? (
          (userData.weight / (userData.height * userData.height)) *
          10000
        ).toFixed(1)
      : 0;
  let bmr =
    userData.gender === "Male"
      ? 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5
      : 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
  bmr = Math.max(bmr, 0);

  function multiplierCalculator() {
    switch (userData.level) {
      case "sedentary":
        return Math.round(bmr * 1.2);
      case "lightly_active":
        return Math.round(bmr * 1.375);
      case "moderately_active":
        return Math.round(bmr * 1.55);
      case "very_active":
        return Math.round(bmr * 1.725);
      default:
        return 0;
    }
  }
  let calorieNeed = multiplierCalculator();
  function goalCalculator() {
    switch (userData.goal) {
      case "loss":
        return calorieNeed - 300;
      case "maintain":
        return calorieNeed;
      case "gain":
        return calorieNeed + 300;
      default:
        return calorieNeed;
    }
  }
  let requireCalories = goalCalculator();

  return (
    <div className="average-cal">
      {userData && (
        <>
          <h3>
            BMI (Body Mass Index) : {bmi} kg/m<sup>2</sup>
          </h3>
          <h3>BMR (Basal Metabolic Rate) : {bmr} Calories/day</h3>
          <h3>
            Daily calorie needs based on activity level : {calorieNeed} Calories
          </h3>
          <h3>
            Daily calorie needs based on your fitness goal : {requireCalories}{" "}
            Calories
          </h3>
          {today === currentDate && (
            <>
              <h3>
                Today's Remaining Calories :{" "}
                {remainingCal > 0 ? remainingCal : 0}
              </h3>
              <h3>Last 7 days :-</h3>
              <h3>Average Calories : {averageWeekCal} Cal</h3>
              <h3>Average Carbs : {averageWeekCarbs} g</h3>
              <h3>Average Protein : {averageWeekProtein} g</h3>
              <h3>Average Fats : {averageWeekFats} g</h3>
            </>
          )}
        </>
      )}
    </div>
  );
}
