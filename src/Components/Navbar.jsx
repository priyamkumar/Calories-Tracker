import React from "react";

export default function Navbar({setView}) {
  const handleView = (event) => {
    switch(event.target.innerText)
    {
      case "Home":
        setView("Tracker");
        break;
      case "Statistics":
        setView("Statistics");
        break;
      case "Settings":
        setView("Settings");
        break;
      default:
        break;
    }
  }
  return (
    <nav className="nav">
      <ul>
        <li onClick={handleView}>Home</li>
        <li onClick={handleView}>Statistics</li>
        <li onClick={handleView}>Settings</li>
      </ul>
    </nav>
  );
}
