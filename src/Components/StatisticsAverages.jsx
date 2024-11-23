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
  userData.weight = Number(userData.weight);
  userData.height = Number(userData.height);
  let bmi = 0;
  if (userData.height && userData.weight)
    bmi = (
      (userData.weight / (userData.height * userData.height)) *
      10000
    ).toFixed(1);
  let bmr = userData.gender === "Male" ? (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) + 5 : (10 * userData.weight) + (6.25 * userData.height) - (5 * userData.age) - 161;
  bmr = bmr > 0 ? bmr : 0;
  function multiplierCalculator() {
    switch (userData.level) {
      case "sedentary" : return Math.round(bmr * 1.2);
      case "lightly_active" : return Math.round(bmr * 1.375);
      case "moderately_active" : return Math.round(bmr * 1.55);
      case "very_active" : return Math.round(bmr * 1.725);
      default : return 0;
    }
  }
  let calorieNeed = multiplierCalculator();
  function goalCalculator() {
    switch (userData.goal) {
      case "loss" : return calorieNeed - 300;
      case "maintain" : return calorieNeed;
      case "gain" : return calorieNeed + 300;
      default : return 0;
    }
  }
  let requireCalories = goalCalculator();

  return (
    <div className="average-cal">
      <h3>
        BMI (Body Mass Index): {bmi} kg/m<sup>2</sup>
      </h3>
      <h3>BMR (Basal Metabolic Rate): {bmr} Calories/day</h3>
      <h3>Daily calorie needs based on activity level: {calorieNeed} Calories</h3>
      <h3>Daily calorie needs based on your fitness goal: {requireCalories} Calories</h3>
      <h3>Today's Remaining Calories: {remainingCal > 0 ? remainingCal : 0}</h3>
      <h3>Last 7 days :-</h3>
      <h3>Average Calories: {averageWeekCal} Cal, Average Carbs: {averageWeekCarbs} g,</h3>
      <h3></h3>
      <h3>Average Protein: {averageWeekProtein} g, Average Fats: {averageWeekFats} g</h3>
      <h3></h3>
    </div>
  );
}
