import React, { useContext } from 'react'
import { QuizAppContext } from '../../auth/QuizAppContext'
import { types } from '../../auth/types'
import { useForm } from '../../hooks/useForm'

import './loginScreen.scss';

export const LoginScreen = ({history}) => {
    const { dispatch } = useContext(QuizAppContext);
    const [{ userName }, handleUserNameChange] = useForm({
        userName : '',
    });

    const login = (e) => {
        e.preventDefault();
        if (userName.length < 3) return;

        let usersRecords = JSON.parse(localStorage.getItem('usersRecords'));
        console.log(usersRecords)
        if (usersRecords[`${userName}`] === undefined) {
            usersRecords = {...usersRecords, [`${userName}`]:0}
            localStorage.setItem('usersRecords', JSON.stringify(usersRecords));
        }

        const action = {
            type: types.login,
            payload: {
                name: userName,
                record: usersRecords[`${userName}`]
            }
        };
        dispatch(action);
        history.replace('/');
        localStorage.setItem('currentSession', JSON.stringify({name: userName, logged: true, record: 0}));
    };

    return (
        <div className="login-screen">
            <h1>Log In</h1>


            <input type="text" name="userName" onChange={handleUserNameChange}/>
            <button onClick={login}>Submit!</button>
        </div>
    )
}
