import React from "react";
import Title from "./Title";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="header">
      <Title/>
      <Navbar/>
    </header>
  );
}
