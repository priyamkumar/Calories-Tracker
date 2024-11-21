import './App.css'
import Home from './Components/Home'
import Header from './Components/Header'
import { useState } from 'react';
import Statistics from './Components/Statistics';
import Settings from './Components/Settings';

function App() {

  const [view, setView] = useState("Tracker");


  return (
    <>
      <Header setView={setView}/>
      {view === "Tracker" && <Home />}
      {view === "Statistics" && <Statistics />}
      {view === "Settings" && <Settings />}
    </>
  )
}

export default App
