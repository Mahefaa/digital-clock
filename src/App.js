import { useState } from "react";
import "./App.css";
import { Clock, ClockClassComponent } from "./Clock/Clock";
import { TimerClassComponent } from "./Timer/Timer";


function App() {
  const [isTimer,setisTimer]=useState(false);
  let date = new Date();
  return (
    <div>
      <button onClick={()=>setisTimer(!isTimer)} style={{backgroundColor:"lightslategray",color:"#00f005",}}>toggle</button>
      {isTimer?<TimerClassComponent date={date}/> : <ClockClassComponent date={date}/>}
    </div>
  );
}

export default App;
