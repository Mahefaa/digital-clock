/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import "./Clock.css";

export class ClockClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: this.props.date, timer: null, isTimer:this.props.isTimer};
  }
  componentDidMount() {
    this.setState({
      timer: setInterval(() => this.setState({ date: new Date() }), 1000),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  padStartDigit(digit) {
    return digit.toString().padStart(2, "0");
  }

  render() {
    return (
      <div className="clock">
        <span>{this.padStartDigit(this.state.date.getHours())}: </span>
        <span>{this.padStartDigit(this.state.date.getMinutes())}: </span>
        <span>{this.padStartDigit(this.state.date.getSeconds())}</span>
      </div>
    );
  }
}

export function Clock() {
  const [date, setDate] = useState(new Date());
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
      <span>{padStartDigit(date.getHours())}: </span>
      <span>{padStartDigit(date.getMinutes())}: </span>
      <span>{padStartDigit(date.getSeconds())}</span>
    </div>
  );
}
