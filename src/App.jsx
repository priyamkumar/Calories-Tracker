import './App.css'
import Home from './Components/Home'
import Header from './Components/Header'
import { useState } from 'react';
import Statistics from './Components/Statistics';

function App() {

  const [view, setView] = useState("Tracker");


  return (
    <>
      <Header setView={setView}/>
      {view === "Tracker" && <Home />}
      {view === "Statistics" && <Statistics />}
    </>
  )
}

export default App
