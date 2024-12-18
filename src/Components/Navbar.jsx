import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Navbar({ setView }) {
  const handleView = (event) => {
    switch (event.target.innerText) {
      case "Home":
        setView("Tracker");
        setToggle(false);
        break;
      case "Statistics":
        setView("Statistics");
        setToggle(false);
        break;
      case "Settings":
        setView("Settings");
        setToggle(false);
        break;
      default:
        break;
    }
  };

  const [toggle ,setToggle] = useState(false);

  const toggleMenu = () => {
    setToggle((prev) => !prev);
  }

  return (
    <div>
       <div className="hamburger-menu" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} className="bars" />{" "}
      </div>
    <nav className={`nav ${toggle ? "show" : ""}`}>
      <ul>
        <li onClick={handleView}>Home</li>
        <li onClick={handleView}>Statistics</li>
        <li onClick={handleView}>Settings</li>
      </ul>
    </nav>
    </div>
  );
}
