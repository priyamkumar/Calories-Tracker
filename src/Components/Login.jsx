import React, { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setIsLoading } from "./AuthenticationSlice.js";

export default function Login() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    let updatedData = { ...userData };
    updatedData[name] = value;
    setUserData(updatedData);
  };

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.authentication);
  const { isLoading } = useSelector((state) => state.authentication);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    try {
      const { email, password } = userData;
      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      dispatch(setIsAuthenticated(true));
      dispatch(setIsLoading(false));
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      dispatch(setIsAuthenticated(false));
      dispatch(setIsLoading(false));
    }
  };

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div className={`login-container ${theme === "Dark" ? "dark" : ""}`}>
      <div className="form-container">
        <h2>Log in</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleInput}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleInput}
              required
            />
          </div>
          <button disabled={isLoading} type="submit" className="submit-btn">
            Log in
          </button>
          <div className="register">
            <Link to="/register">
              <button className="register-btn">Create new account</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
