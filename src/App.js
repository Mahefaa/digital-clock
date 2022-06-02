import { useState } from "react";
import "./App.css";
import { Clock, ClockClassComponent } from "./Clock/Clock";
import { TimerClassComponent } from "./Timer/Timer";


function App() {
  const [isTimer,setisTimer]=useState(true);
  let date = new Date();
  return (
    <div>
      <button onClick={()=>setisTimer(!isTimer)} style={{backgroundColor:"lightslategray",color:"#00f005",}}>toggle</button>
      {<ClockClassComponent date={date} isTimer={isTimer}/>}
    </div>
  );
}

export default App;
