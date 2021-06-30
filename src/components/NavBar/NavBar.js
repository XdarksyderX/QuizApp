import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { QuizAppContext } from '../../auth/QuizAppContext'
import { types } from '../../auth/types'
import logo from '../../assets/logo.png';

import './navbar.scss';

export const NavBar = ({ history }) => {
    const { user, dispatch } = useContext(QuizAppContext);
    const handleLogout = () => {
        const action = {
            type: types.logout
        }

        dispatch(action);
        localStorage.removeItem('currentSession');
        history.replace('/login');
    }

    return (
        <nav className="navbar">
            <ul>
                <NavLink className="navlink" to="/">{<img src={logo} alt="logo"/>}</NavLink>
                <span>Hello {user.name}, your record is {user.record}</span>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    )
}
