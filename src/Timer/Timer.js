import React, {useState } from "react";

import "./Timer.css";

export class TimerClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hour:this.padStart(this.props.date.getHours()), minute:this.padStart(this.props.date.getMinutes()), second:this.padStart(this.props.date.getSeconds()),timer:null, start:true}}
  padStart=digit=>digit.toString().padStart(2,"0");

  //decrement hours,minutes,seconds following watch's rules
  decrement=(hour,minute,second)=>{
    let [hourValue,minuteValue,secondValue]=[hour,minute,second].map((e)=>parseInt(e));

    this.timer=setInterval(()=>{
      if(hourValue===0 && minuteValue===0 && secondValue ===0){
        clearInterval(this.timer);
        this.setState({start:true})
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
      <button onClick={()=>{
      this.state.start? this.decrement(this.state.hour,this.state.minute,this.state.second) : clearInterval(this.timer);
      this.setState((prevState)=>({start:!prevState.start}));
      }}
      >{!this.state.start? "stop" : "start"}</button>
        <div className="timer">
          <span>
            <input ref={(inputHour)=>this.hour=inputHour} type="text" value={!this.state.start ? this.padStart(this.state.hour): this.state.hour} onChange={(e)=>{
              input = e.target.value.replace(/\D/g,"").slice(0,2);
              input = input>=0 && input<24? input : 23;
              this.setState({hour:input});
              }}
              onBlur={()=>{
                this.setState((prevState)=>({hour:this.padStart(prevState.hour)}));
              }}
            />:
          </span>

          <span><input type={"text"} value={!this.state.start ? this.padStart(this.state.minute) : this.state.minute}
          onChange={(e)=>{
            input = e.target.value.replace(/\D/g,"").slice(0,2);
            input= (input<60 && input>=0)? input : 59;
            this.setState({minute:input});
          }}
          onBlur={()=>{
            this.setState((prevState)=>({minute:this.padStart(prevState.minute)}));
          }}
          ></input>:</span>

          {<span><input type={"text"} value={!this.state.start ? this.padStart(this.state.second) : this.state.second}
          onChange={(e)=>{
            input = e.target.value.replace(/\D/g,"").slice(0,2);
            input = (input<60 && input>=0)? input : 59;
            this.setState({second:input});
          }}
          onBlur={()=>{
            this.setState((prevState)=>({second:this.padStart(prevState.second)}));
          }}
          ></input></span>}
        </div>
      </>
    );
  }
}


export function Timer(props) {
  const {date} = props;
  let input=null;
  let [timerId,setTimerId]=useState(null);
  const [hour,setHour]=useState(padStart(date.getHours()));
  const [minute,setMinute]=useState(padStart(date.getMinutes()));
  const [second,setSecond]=useState(padStart(date.getSeconds()));
  const [start,setStart]=useState(true);
  const [willPadStart,setWPS]=useState(false);

  function padStart(digit) {
    return digit.toString().padStart(2, "0");
  }

  function decrement (hour,minute,second){
    let [hourValue,minuteValue,secondValue]=[hour,minute,second].map((e)=>parseInt(e));
    setTimerId(setInterval(()=>{
      if(hourValue===0 && minuteValue === 0 && secondValue === 0){
        clearInterval(timerId);
        setStart(!start);
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
          start? decrement(hour,minute,second) : clearInterval(timerId);
          setStart(!start);
          setWPS(true);
          }}
          >
          {!start? "stop" : "start"}
        </button>

        <span>
          <input type="text" value={willPadStart ? padStart(hour) : hour} onChange={(e)=>{
            input = e.target.value.replace(/\D/g,"").slice(0,2);
           setHour(input>=0 && input<24? input : 23);
            }}
            onBlur={()=>{
              setHour(padStart(hour));
            }}
          />:
        </span>

        <span><input type={"text"} value={willPadStart ? padStart(minute) : minute}
        onChange={(e)=>{
          input = e.target.value.replace(/\D/g,"").slice(0,2);
          setMinute((input<60 && input>=0)? input : 59);
        }}
        onBlur={()=>{
          setMinute(padStart(minute));
        }}
        ></input>:</span>

        <span><input type={"text"} value={willPadStart ? padStart(second) : second}
        onChange={(e)=>{
          input = e.target.value.replace(/\D/g,"").slice(0,2);
          setSecond((input<60 && input>=0)? input : 59);
        }}
        onBlur={()=>{
          setSecond(padStart(second));
        }}
        ></input></span>
      </div>
    </>
  );
}
