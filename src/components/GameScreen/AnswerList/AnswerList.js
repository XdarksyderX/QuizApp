import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { QuizAppContext } from '../../../auth/QuizAppContext';
import { types } from '../../../auth/types';
import { Answer, handleCorrect, handleWrong } from '../Answer/Answer';
import './answerList.scss'

export const AnswerList = ({ answers, setHits, correctIndex, hits }) => {
  const {user, dispatch} = useContext(QuizAppContext);
  const [finished, setFinished] = useState(false);
  const history = useHistory();

  const correct = (guessed, correct, answers) => {
    setFinished(true);
    if (guessed) {
      guessedAnswer(answers, correct);
      setHits((prev) => prev + 1);
      restore(answers);
      setFinished(false);
    } else {
      notGuessedAnswer(answers, correct);
      setRecords(user.name, hits, dispatch)
      history.replace(`/fail?count=${hits}`);
      }

  };

  const answerList = answers.map((answer, index) => {
    if (index === correctIndex) {
      return (
        <Answer
          text={answer}
          callback={({ target }) => {
            handleCorrect(target, () =>
              correct(
                true,
                correctIndex,
                document.getElementsByClassName("answer")
              )
            );
          }}
          key={index}
          finished={finished}
          correct={true}
        />
      );
    }
    return (
      <Answer
        text={answer}
        callback={({ target }) =>
          handleWrong(target, () =>
            correct(
              false,
              correctIndex,
              document.getElementsByClassName("answer")
            )
          )
        }
        key={index}
        finished={finished}
        correct={false}
      />
    );
  });

  return <div className="answer-list">{answerList}</div>;
};

const guessedAnswer = (answers, correct) => {
  for (let i = 0; i < answers.length; i++) {
    if (i === correct) {
      if (answers[i].tagName === "SPAN") {
        answers[i].parentElement.classList.remove("regular");
        answers[i].parentElement.classList.add("correct");
      } else {
        answers[i].classList.remove("regular");
        answers[i].classList.add("correct");
      }
    } else {
      if (answers[i].tagName === "SPAN") {
        answers[i].parentElement.classList.remove("regular");
      } else {
        answers[i].classList.remove("regular");
      }
    }
  }
};

const notGuessedAnswer = (answers, correct) => {
  for (let i = 0; i < answers.length; i++) {
    if (i === correct) {
      if (answers[i].tagName === "SPAN") {
        answers[i].parentElement.classList.remove("regular");
        answers[i].parentElement.classList.add("correct");
      } else {
        answers[i].classList.remove("regular");
        answers[i].classList.add("correct");
      }
    }
  }
};

const restore = (answers) => {
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].tagName === "SPAN") {
      answers[i].parentElement.classList.remove("correct");
      answers[i].parentElement.classList.remove("wrong");
      answers[i].parentElement.classList.add("regular");
    } else {
      answers[i].classList.remove("correct");
      answers[i].classList.remove("wrong");
      answers[i].classList.add("regular");
    }
  }
};


export const setRecords = (name, hits, dispatch) => {
  let usersRecords = JSON.parse(localStorage.getItem('usersRecords'));
  if (usersRecords[name] < hits) {
    usersRecords = {...usersRecords, [`${name}`]:hits}
    localStorage.setItem('usersRecords', JSON.stringify(usersRecords));
    dispatch({
      type: types.updateRecord,
      payload: hits
    })
}
}