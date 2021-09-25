import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from './App'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';

import { useState, useEffect } from "react";
import PaymentGateway from "./pages/PaymentGateway/PaymentGateway";

export default function AppRouter() {

const [StripeObject, setStripeObject] = useState(null)

useEffect( async () => {
   
    const stripePromise = loadStripe(
        'pk_test_51J7P2UC6DO7oZMzwFigARqX8KyMNlZWjDuzas5oRbpgurPlCRrwwwb3ZGeZS5FbsC8RKZmpn7zSdCcwYftctUfz400GYOMb0BJ',
        {
            stripeAccount: `acct_1J7P2UC6DO7oZMzw`
        })
        
        setStripeObject(stripePromise)
        
    }, [])



    return (
        <Elements stripe = {StripeObject}>
        <Router>
            <Switch>
                <Route exact path ='/'>
                    <Login />
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
                <Route path= '/pay/:InvoiceId'>
                    <PaymentGateway />
                </Route>
            </Switch>
        </Router>
        </Elements>
    )
}
