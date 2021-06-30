import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";


import { NavBar } from '../components/NavBar/NavBar';

import { Dashboard } from '../components/DashboardScreen/DashboardScreen';
import { GameScreen } from '../components/GameScreen/GameScreen';
import { FailScreen } from '../components/FailScreen/FailScreen';



  
export const DashboardRouter = ({ history }) => {
    return (
        <Router>
            <NavBar history={history}/>
            <Switch>
                <Route exact path="/" component={Dashboard}/>
                <Route exact path="/game" component={GameScreen}/>
                <Route exact path="/fail" component={FailScreen}/>
                <Redirect to="/"/>
            </Switch>
        </Router>
    );
};
  