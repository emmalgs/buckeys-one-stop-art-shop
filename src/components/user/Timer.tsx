import { useState } from "react";
import { SaleObj } from "../admin/AdminControl";

interface TimerProps {
  timer: number;
  selection: SaleObj;
  buyArt: (art: SaleObj) => void;
}

function Timer(props: TimerProps) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  setInterval(() => {
    const now = new Date().getTime();
    const distance = props.timer - now;
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
  }, 1000);
  return (
    <div className="timer-container">
      <div className="timer">
        <div className="time">
          <h2>{days}</h2>
          <span>DAYS</span>
        </div>
        <div className="colon">:</div>
        <div className="time">
          <h2>{hours}</h2>
          <span>HR</span>
        </div>
        <div className="colon">:</div>
        <div className="time">
          <h2>{minutes}</h2> 
          <span>MIN</span>
        </div>
        <div className="colon">:</div>
        <div className="time">
          <h2>{seconds}</h2> 
          <span>SEC</span>
        </div>
      </div>
      <button className="buy" onClick={() => props.buyArt(props.selection)}>BUY</button>
    </div>
  );
}

export default Timer;
