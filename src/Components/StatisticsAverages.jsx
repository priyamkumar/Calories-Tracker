import React from "react";

export default function StatisticsAverages() {
  let today = new Date().toISOString().split("T")[0];
  let todayData = JSON.parse(localStorage.getItem(today));
  let remainingCal = todayData.calorieGoal - todayData.calories;

  let allDates = JSON.parse(localStorage.getItem("allDates"));
  let barDates = allDates.sort((a, b) => b.split("-")[0] - a.split("-")[0]);
  barDates = allDates.sort((a, b) => b.split("-")[1] - a.split("-")[1]);
  barDates = allDates.sort((a, b) => b.split("-")[2] - a.split("-")[2]);
  barDates = barDates.slice(0, 7).reverse();
  let barData = barDates.map((el) => JSON.parse(localStorage.getItem(el)));
  let calories = barData.map((el) => el.calories);
  let carbs = barData.map((el) => el.carbs);
  let protein = barData.map((el) => el.protein);
  let fats = barData.map((el) => el.fats);
  let averageWeekCal = Math.round(
    calories.reduce((acc, cur) => acc + cur, 0) / 7
  );
  let averageWeekCarbs = Math.round(
    carbs.reduce((acc, cur) => acc + cur, 0) / 7
  );
  let averageWeekProtein = Math.round(
    protein.reduce((acc, cur) => acc + cur, 0) / 7
  );
  let averageWeekFats = Math.round(fats.reduce((acc, cur) => acc + cur, 0) / 7);

  let userData = JSON.parse(localStorage.getItem("userData"));
  console.log(typeof userData.weight);
  let bmi = 0;
  if (userData.height && userData.weight)
    bmi = (
      (userData.weight / (userData.height * userData.height)) *
      10000
    ).toFixed(2);
  console.log(bmi);

  return (
    <div className="average-cal">
      <h3>Today's Remaining Calories: {remainingCal > 0 ? remainingCal : 0}</h3>
      <h3>Last 7 days :-</h3>
      <h3>Average Calories: {averageWeekCal} Cal</h3>
      <h3>Average Carbs: {averageWeekCarbs} g</h3>
      <h3>Average Protein: {averageWeekProtein} g</h3>
      <h3>Average Fats: {averageWeekFats} g</h3>
      <h3>
        BMI: {bmi} kg/m<sup>2</sup>
      </h3>
    </div>
  );
}
