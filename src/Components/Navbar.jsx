import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar({ handleLogout }) {
  const { isAuthenticated } = useSelector((state) => state.authentication);
  const { isLoading } = useSelector((state) => state.authentication);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(false);
  };

  const toggleMenu = () => {
    setToggle((prev) => !prev);
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
