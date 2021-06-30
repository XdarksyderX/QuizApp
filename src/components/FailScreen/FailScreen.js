import React, { useState } from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import './failScreen.scss';

export const FailScreen = ({ location, history }) => {

    const handlePlayAgain = () => {
        history.replace('/game');
    };

    const [ params ] = useState(parse(location.search));

    return (
        <>
            {
                (!Boolean(Object.keys(params).length))
                ? <Redirect to="/"/>
                : (<div className="fail-screen">
                    <h1>{"Wrong option! :("}</h1>
                    <p>You have had {params.count} hits!</p>
                    <button onClick={handlePlayAgain}>Play again!</button>
                   </div>)
            }
        </>)
}
