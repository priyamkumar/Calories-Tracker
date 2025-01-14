import React, { useState } from "react";
import { useTheme } from "../Contexts/ThemeContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "./AuthenticationSlice";

export default function Register() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authentication);

  const handleInput = (event) => {
    const { name, value } = event.target;
    let updatedData = { ...userData };
    updatedData[name] = value;
    setUserData(updatedData);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    try {
      const { name, email, password } = userData;
      const { data } = await axios.post(
        `${server}/user/register`,
        {
          name,
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
      dispatch(setIsLoading(false));
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div className={`login-container ${theme === "Dark" ? "dark" : ""}`}>
      <div className="form-container">
        <h2>Create a new account</h2>
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleInput}
              required
            />
          </div>
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
          <button disabled={isLoading} type="submit" className="sign-up-btn">
            Sign Up
          </button>
          <div className="login-div">
            <Link to="/login">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
