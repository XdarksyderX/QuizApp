import React, { useReducer } from 'react'
import { QuizAppContext } from './auth/QuizAppContext';
import { QuizAppReducer } from './auth/QuizAppReducer';
import { AppRouter } from './routers/AppRouter';


import './scss/main.scss';


export const QuizApp = () => {
    
    const init = () => {
        const usersRecords = localStorage.getItem('usersRecords');
        if (usersRecords === null) {
            localStorage.setItem('usersRecords', JSON.stringify({}));
        }

        const currentSession = JSON.parse(localStorage.getItem('currentSession'));
        if (!currentSession) return {
            logged: false,
            name: '',
            record: 0
        };
        return currentSession;
    };
    const [user, dispatch] = useReducer(QuizAppReducer, {}, init);

    
    return (
        <QuizAppContext.Provider value={{user, dispatch}}>
            <AppRouter/>
        </QuizAppContext.Provider>
    )
};
