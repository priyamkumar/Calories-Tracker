import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../main";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setIsAuthenticated, setIsLoading } from "./AuthenticationSlice.js";

export default function Navbar({ stateArr }) {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const { isLoading } = useSelector((state) => state.authentication);

  const [state, setState] = stateArr;
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(false);
  };

  const toggleMenu = () => {
    setToggle((prev) => !prev);
  };
  const handleLogout = async () => {
    dispatch(setIsLoading(true));
    try {
      const { data } = await axios.get(`${server}/user/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(setIsAuthenticated(false));
      dispatch(setIsLoading(false));
      setState({});
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
      dispatch(setIsAuthenticated(true));
      dispatch(setIsLoading(false));
    }
  };

  return (
    <div>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="bars" />{" "}
      </div>
      <nav className={`nav ${toggle ? "show" : ""}`}>
        <ul>
          <Link to="/" onClick={handleToggle}>
            Home
          </Link>
          <Link to="/stats" onClick={handleToggle}>
            Statistics
          </Link>
          <Link to="/settings" onClick={handleToggle}>
            Settings
          </Link>
          {isAuthenticated ? (
            <button
              disabled={isLoading}
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="login-btn" onClick={handleToggle}>
                Log in
              </button>
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
}
