import React from "react";
import "./answer.scss";

export const Answer = ({ text, callback, finished, correct }) => {
  return (
    <div className="answer regular" onClick={!finished ? callback : null}>
      <span>{text}</span>
    </div>
  );
};

export const handleCorrect = (target, callback = () => {}) => {
  if (target.tagName === "SPAN") {
    target.parentElement.classList.remove("regular");
    target.parentElement.classList.add("correct");
  } else {
    target.classList.remove("regular");
    target.classList.add("correct");
  }
  callback();
};

export const handleWrong = (target, callback = () => {}) => {
  if (target.tagName === "SPAN") {
    target.parentElement.classList.remove("regular");
    target.parentElement.classList.add("wrong");
  } else {
    target.classList.remove("regular");
    target.classList.add("wrong");
  }
  callback();
};