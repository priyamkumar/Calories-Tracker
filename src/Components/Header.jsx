import React from "react";

export default function Navbar() {
  return (
    <header className="header">
      <h1>Calories Tracker</h1>
      <nav className="nav">
        <ul>
          <li>Home</li>
          <li>Statistics</li>
          <li>Settings</li>
        </ul>
      </nav>
    </header>
  );
}
