import React, {useState } from "react";

import "./Timer.css";

export class TimerClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hour:this.padStart(this.props.date.getHours()), minute:this.padStart(this.props.date.getMinutes()), second:this.padStart(this.props.date.getSeconds()),timer:null, start:false}}
  padStart=digit=>digit.toString().padStart(2,"0");

  //decrement hours,minutes,seconds following watch's rules
  decrement=(hour,minute,second)=>{
    let [hourValue,minuteValue,secondValue]=[hour,minute,second].map((e)=>parseInt(e));

    this.timer=setInterval(()=>{
      if(hourValue===0 && minuteValue===0 && secondValue ===0){
        clearInterval(this.timer);
        this.setState({start:false})
        return alert("Time's up !!");
      }
      secondValue--;
      if((secondValue<0 && minuteValue >0) || (secondValue<0 && minuteValue===0 && hourValue>0)){
        secondValue=59;
        minuteValue--;
      }
      if(minuteValue<0 && hourValue >0){
        minuteValue=59;
        hourValue--;
      }
      this.setState({hour:hourValue,minute:minuteValue,second:secondValue});
    },1000);
  };

  componentDidMount(){
    //to put the focus on hour's input
    this.hour.focus();
  }
  render() {
    
    let input=null;
    return (
      <>
        <div className="timer">
          <button onClick={()=>{
            this.state.start? clearInterval(this.timer):this.decrement(this.state.hour,this.state.minute,this.state.second);
            this.setState((prevState)=>({start:!prevState.start}));
            }}
            >
              {!this.state.start? "start": "stop" }
          </button>
          <span>
            <input ref={(inputHour)=>this.hour=inputHour} type="text" value={this.state.start ? this.padStart(this.state.hour): this.state.hour} onChange={(e)=>{
              input = e.target.value.replace(/\D/g,"").slice(0,2);
              input = input>=0 && input<24? input : 23;
              this.setState({hour:input});
              }}
              onBlur={()=>{
                this.setState((prevState)=>({hour:this.padStart(prevState.hour)}));
              }}
            />:
          </span>

          <span><input type={"text"} value={this.state.start ? this.padStart(this.state.minute) : this.state.minute}
          onChange={(e)=>{
            input = e.target.value.replace(/\D/g,"").slice(0,2);
            input= (input<60 && input>=0)? input : 59;
            this.setState({minute:input});
          }}
          onBlur={()=>{
            this.setState((prevState)=>({minute:this.padStart(prevState.minute)}));
          }}
          ></input>:</span>

          <span><input type={"text"} value={this.state.start ? this.padStart(this.state.second) : this.state.second}
          onChange={(e)=>{
            input = e.target.value.replace(/\D/g,"").slice(0,2);
            input = (input<60 && input>=0)? input : 59;
            this.setState({second:input});
          }}
          onBlur={()=>{
            this.setState((prevState)=>({second:this.padStart(prevState.second)}));
          }}
          ></input></span>
        </div>
      </>
    );
  }
}


export function Timer(props) {
  const {date} = props;
  let [timerId,setTimerId]=useState(null);
  const [hour,setHour]=useState(padStart(date.getHours()));
  const [minute,setMinute]=useState(padStart(date.getMinutes()));
  const [second,setSecond]=useState(padStart(date.getSeconds()));
  const [start,setStart]=useState(false);

  function padStart(digit) {
    return digit.toString().padStart(2, "0");
  }

  function decrement (hour,minute,second){
    let [hourValue,minuteValue,secondValue]=[hour,minute,second].map((e)=>parseInt(e));
    setTimerId(setInterval(()=>{
      if(hourValue===0 && minuteValue === 0 && secondValue === 0){
        clearInterval(timerId);
        setStart(false);
        return alert("Time's up !!");
      }
      secondValue--;
      if((secondValue<0 && minuteValue >0) || (secondValue<0 && minuteValue===0 && hourValue>0)){
        secondValue=59;
        minuteValue--;
      }
      if(minuteValue<0 && hourValue >0){
        minuteValue=59;
        hourValue--;
      }
      setHour(hourValue);
      setMinute(minuteValue);
      setSecond(secondValue);
    },1000));
  };

  return (
    <>
      <div className="timer">
        <button onClick={()=>{
          start?  clearInterval(timerId):decrement(hour,minute,second);
          setStart(!start);
          }}
          >
          {start? "stop" : "start"}
        </button>
        <Input type="text" value={[start,hour,"h"]} onChange={[handleChange,setHour]} padStart={padStart} input={null}/>:
        <Input type="text" value={[start,minute,"m"]} onChange={[handleChange,setMinute]} padStart={padStart} input={null}/>:
        <Input type="text" value={[start,second,"s"]} onChange={[handleChange,setSecond]} padStart={padStart} input={null}/>
      </div>
    </>
  );
}
function handleChange(e,input,set,type){
  input = e.target.value.replace(/\D/g,"").slice(0,2);
  if(type!=="h")
    set((input<60 && input>=0)? input : 59);
  else
    set(input>=0 && input<24? input : 23)
}

function Input(props){
  let {type,value,onChange,padStart,input}=props;
  let [handleChange,set]=onChange;
  let [start,prevValue,string]=value;
  return(
    <span>
      <input type={type} value={start ? padStart(prevValue) : prevValue}
        onChange={(e)=>handleChange(e,input,set,string)}
        onBlur={()=>set(padStart(prevValue))}
        />
    </span>
  )
}

/** */