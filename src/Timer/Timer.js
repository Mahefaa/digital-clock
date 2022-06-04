import React, { useEffect, useState } from "react";

import "./Timer.css";

export class TimerClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hour:this.padStart(this.props.date.getHours()), minute:this.padStart(this.props.date.getMinutes()), second:this.padStart(this.props.date.getSeconds()),timer:null, start:true}}
  willPadStart=false;
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
      this.willPadStart=true;
      }}
      >{!this.state.start? "stop" : "start"}</button>
        <div className="timer">
          <span><input ref={(inputHour)=>{this.hour=inputHour;}} type={"text"} value={this.willPadStart ? this.padStart(this.state.hour) : this.state.hour} onChange={(e)=>{
            input = e.target.value.replace(/\D/g,"").slice(0,2);
            input = input>=0 && input<24? input : 23;
            this.setState({hour:input});
          }}
          onBlur={()=>{
            this.setState((prevState)=>({hour:this.padStart(prevState.hour)}));
          }}
          ></input>:</span>

          <span><input type={"text"} value={this.willPadStart ? this.padStart(this.state.minute) : this.state.minute}
          onChange={(e)=>{
            input = e.target.value.replace(/\D/g,"").slice(0,2);
            input= (input<60 && input>=0)? input : 59;
            this.setState({minute:input});
          }}
          onBlur={()=>{
            this.setState((prevState)=>({minute:this.padStart(prevState.minute)}));
          }}
          ></input>:</span>

          {<span><input type={"text"} value={this.willPadStart ?this.padStart(this.state.second) : this.state.second}
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








/*export function Timer(props) {
  const [hour,minute,second]=props;
  let timerId;

  function padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
  }

  useEffect(() => {
    timerId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  });

  return (
    <div className="clock">
      <span>{padStartDigit(hour)}:</span>
      <span>{padStartDigit(minute)}: </span>
      <span>{padStartDigit(second)}</span>
    </div>
  );
}*/
