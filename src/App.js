import { useState } from "react";
import "./App.css";
import { Clock, ClockClassComponent } from "./Clock/Clock";
import { Timer, TimerClassComponent } from "./Timer/Timer";

//Author Mahefa Ny Anjara
function App() {
  const [isTimer,setisTimer]=useState(false);
  return (
    <div>
      <button onClick={()=>setisTimer(!isTimer)} style={{backgroundColor:"lightslategray",color:"#00f005",}}>toggle</button>
      {isTimer?<TimerClassComponent date={new Date()}/> : <ClockClassComponent date={ new Date()}/>
      //isTimer?<Timer date={new Date()}/> : <Clock date={new Date()}/>
      }
    </div>
  );
}

export default App;
