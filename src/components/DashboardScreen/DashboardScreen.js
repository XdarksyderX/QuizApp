import React from 'react'
import { NavLink } from 'react-router-dom';
import './dashboard-screen.scss';
import play from '../../assets/play.png';

export const Dashboard = () => {
    return (
        <div>
            <NavLink className="play-button" to="/game">{<img src={play} alt="play-button"/>}</NavLink>
        </div>
    )
}
