import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch
  } from "react-router-dom";

import { QuizAppContext } from '../auth/QuizAppContext';
import { LoginScreen } from '../components/LoginScreen/LoginScreen';
import { DashboardRouter } from './DashboardRouter';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';



export const AppRouter = () => {    
    const { user } = useContext(QuizAppContext);
    
    return (
    <Router>
        <Switch>
            <PublicRoute exact path="/login" isAuthenticated={user.logged} component={LoginScreen} />
            <PrivateRoute path="/" isAuthenticated={user.logged} component={DashboardRouter}/>
        </Switch>
    </Router>)
}
