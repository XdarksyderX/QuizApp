import React, { useState, useEffect } from "react";
import './timer.scss';

export const Timer = ({ time, callback }) => {
    const [seconds, setSecond] = useState(time);
  
    const tick = () => {
      setSecond((prev) => prev - 1);
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (seconds > 0) {
          tick();
        } else {
          callback();
        }
      }, 1000);
  
      return () => {
        clearInterval(interval);
      };
    });
  
    return (
      <div className="timer">
        <span>{seconds}</span>
      </div>
    );
  };
