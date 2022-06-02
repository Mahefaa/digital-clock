import React, { useEffect, useState } from "react";

import "./Timer.css";

export class TimerClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hour:+this.props.hour, minute:+this.props.minute, second:+this.props.second,start:false,timer:null};
    this.decrement=(hourValue,minuteValue,secondValue)=>{
      this.timer=setInterval(()=>{
        if(hourValue===0 && minuteValue===0 && secondValue ===0){
          clearInterval(this.timer);
          return alert("vitaaa");
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
  }

  componentDidMount(){
    this.hour.focus();
  }
  padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
  }

  render() {
    return (
      <>
      <button value={this.state.start} onClick={()=>{
        this.setState((prevState)=>{
        return {start:!prevState.start};
      });
      this.decrement(this.state.hour,this.state.minute,this.state.second);
    }}
      >{this.state.start?"started":"start"}</button>
        <div className="timer">
          <span><input ref={(inputHour)=>{this.hour=inputHour;}} type={"text"} maxLength={2} value={this.padStartDigit(this.state.hour)}></input>:</span>
          <span><input type={"text"} maxLength={2} value={this.padStartDigit(this.state.minute)}></input>:</span>
          {<span><input type={"text"} maxLength={2} value={this.padStartDigit(this.state.second)}></input></span>}
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
