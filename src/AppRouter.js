import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from './App'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

import React from 'react'

export default function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route exact path ='/'>
                    <Home />
                </Route>
                <Route path='/invoices'>
                    <App  />
                </Route>
                <Route path='/Register'>
                    <Register  />
                </Route>
                <Route path='/login'>
                    <Login  />
                </Route>
                <Route path= '/settings'>
                    <App />
                </Route>
            </Switch>
        </Router>
    )
}
