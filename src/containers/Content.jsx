import React from 'react'
import Cashier from '../pages/Cashier'
import Members from '../pages/Members'
import Homepage from '../pages/Homepage'
import Products from '../pages/Products'
import { Switch } from 'react-router-dom'
import Employees from '../pages/Employees'
import Header from '../components/UI/Header'
import Sidebar from '../components/UI/Sidebar'
import Transactions from '../pages/Transactions'
import Analytics from '../pages/Analytics'
import PrivateRoute from '../components/UI/PrivateRoute'

const Content = () => {
    return (
        <div className="static lg:flex">
            <Sidebar/>
            <div className="flex-grow">
                <Header/>
                <Switch>
                    <PrivateRoute path="/" exact component={Homepage}/>
                    <PrivateRoute path="/products" component={Products}/>
                    <PrivateRoute path="/employees" component={Employees}/>
                    <PrivateRoute path="/cashier" component={Cashier}/>
                    <PrivateRoute path="/transactions" component={Transactions}/>
                    <PrivateRoute path="/members" component={Members}/>
                    <PrivateRoute path="/analytics" component={Analytics}/>
                </Switch>
            </div>
        </div>
    )
}

export default Content
