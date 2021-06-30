import React, {useState, useEffect, useContext} from 'react';
import { insert } from '../../../helpers/insert';
import { AnswerList, setRecords } from '../AnswerList/AnswerList'
import { HitsTracker } from '../HitsTracker/HitsTracker';
import _ from 'underscore';

import './question.scss';
import { Timer } from '../Timer/Timer';
import { useHistory } from 'react-router-dom';
import { QuizAppContext } from '../../../auth/QuizAppContext';

export const Question = ({ setHits, hits }) => {
  const {user, dispatch} = useContext(QuizAppContext);
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time] = useState(15);

  const history = useHistory();

  useEffect(() => {
    fetchQuestions();
  }, [hits]);

  const fetchQuestions = async () => {
    const data = await fetch("https://opentdb.com/api.php?amount=1");
    const { results } = await data.json();
    const question = results[0];

    let answers = [...question.incorrect_answers];
    const correctIndex = Math.floor(Math.random() * (answers.length + 1));
    answers = insert(answers, correctIndex, question.correct_answer);
    answers = answers.map(answer => {
      return _.unescape(answer);
    });
    
    const title = _.unescape(question.question.replace('=', ''));

    setQuestion({
      title,
      answers,
      correctIndex
    });
    setLoading(false);
  };

  return (
    <>
      {loading && !question ? (
        <div className="loading">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="question">
          <h1>{question.title}</h1>
          <AnswerList
            answers={question.answers}
            correctIndex={question.correctIndex}
            setHits={setHits}
            hits={hits}
          />
          <div className="info">
            <HitsTracker hits={hits} />
            <Timer time={time} callback={() =>  { 
              setRecords(user.name, hits, dispatch);
              history.replace(`/fail?count=${hits}`)
            }}/>
          </div>
        </div>
      )}
    </>
  );
};