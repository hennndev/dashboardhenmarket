import React from 'react'
import Employees from '../pages/Employees'
import Products from '../pages/Products'
import Homepage from '../pages/Homepage'
import { Switch } from 'react-router-dom'
import Header from '../components/UI/Header'
import Sidebar from '../components/UI/Sidebar'
import Cashier from '../pages/Cashier'
import PrivateRoute from '../components/UI/PrivateRoute'

const Content = () => {
    return (
        <div className="static sm:flex">
            <Sidebar/>
            <div className="flex-grow">
                <Header/>
                <Switch>
                    <PrivateRoute path="/" exact component={Homepage}/>
                    <PrivateRoute path="/products" component={Products}/>
                    <PrivateRoute path="/employees" component={Employees}/>
                    <PrivateRoute path="/cashier" component={Cashier}/>
                </Switch>
            </div>
        </div>
    )
}

export default Content
