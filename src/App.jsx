import "./App.css";
import Header from "./Components/Header";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "./Contexts/ThemeContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { server } from "./main.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  setIsAuthenticated,
  setIsLoading,
} from "./Components/AuthenticationSlice.js";
import React from "react";
import { updateData } from "./Components/CaloriesTodaySlice.js";
import Loader from "./Components/Loader.jsx";
import { jwtDecode } from "jwt-decode";

function App() {
  const [userData, setUserData] = useState({
    age: 0,
    gender: "",
    height: 0,
    weight: 0,
    level: "",
    goal: "",
  });

  const handleLogout = async () => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      dispatch(setIsAuthenticated(false));
      dispatch(setIsLoading(false));
      setState({});
    } catch (err) {
      toast.error("Session expired");
      console.log(err);
      dispatch(setIsAuthenticated(false));
      dispatch(setIsLoading(false));
    }
  };

  const [sevenDaysData, setSevenDaysData] = useState([]);
  const [state, setState] = useState({});
  const [foodData, setFoodData] = useState(null);

  const dispatch = useDispatch();
  const { currentDate, data } = useSelector((state) => state.calories);
  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.authentication
  );

  useEffect(() => {
    if (!foodData) {
      axios
        .get(`${server}/track/foodData`)
        .then((res) => {
          setFoodData(res.data);
        })
        .catch((err) => console.log(err));
    }
    if (isAuthenticated && state[currentDate]) {
      dispatch(updateData(state[currentDate]));
      return;
    }
    dispatch(setIsLoading(true));
    axios
      .post(
        `${server}/user/getUser`,
        {
          date: currentDate,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        const token = jwtDecode(res.data.token);
        const exp = token.iat * 1000 + 1000 * 60 * 15;
        const currentTime = Date.now();
        const timeLeft = exp - currentTime;
        if (timeLeft > 0)
          setTimeout(() => {
            handleLogout();
          }, timeLeft);
        else {
          handleLogout();
        }
        dispatch(setUser(res.data.user));
        dispatch(setIsAuthenticated(true));
        dispatch(setIsLoading(false));
        if (res.data.details) {
          const {
            age,
            gender,
            height,
            weight,
            activity_level,
            goal,
            caloriesGoal,
          } = res.data.details;
          setUserData({
            age,
            gender,
            height,
            weight,
            level: activity_level,
            goal,
          });

          let meals = res.data.meals;
          let totalCal = meals.reduce((acc, cur) => acc + cur.calories, 0);
          let totalCarbs = meals.reduce((acc, cur) => acc + cur.carbs, 0);
          let totalProtein = meals.reduce((acc, cur) => acc + cur.protein, 0);
          let totalFats = meals.reduce((acc, cur) => acc + cur.fats, 0);

          const newData = {
            ...data,
            calorieGoal: caloriesGoal,
            meals,
            calories: totalCal,
            carbs: totalCarbs,
            protein: totalProtein,
            fats: totalFats,
          };
          dispatch(updateData(newData));
          setState((state) => ({ ...state, [currentDate]: newData }));
          axios
            .get(`${server}/track/getCaloriesData`, {
              withCredentials: true,
            })
            .then((res) => setSevenDaysData(res.data))
            .catch((err) => console.log(err));
        }
      })
      .catch((error) => {
        dispatch(setUser({}));
        dispatch(setIsAuthenticated(false));
        dispatch(setIsLoading(false));
        dispatch(
          updateData({
            calorieGoal: 2600,
            calories: 0,
            carbs: 0,
            protein: 0,
            fats: 0,
            meals: [],
          })
        );
        setUserData({
          age: 0,
          gender: "",
          height: 0,
          weight: 0,
          level: "",
          goal: "",
        });
        setSevenDaysData([]);
      });
  }, [isAuthenticated, currentDate]);

  return (
    <ThemeProvider>
      <Header handleLogout={handleLogout} />
      {isLoading ? (
        <Loader />
      ) : (
        <Outlet
          context={{
            userData,
            setUserData,
            state,
            setState,
            foodData,
            setFoodData,
            sevenDaysData,
            setSevenDaysData,
            handleLogout,
          }}
        />
      )}
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
