import React from 'react'
import Login from './pages/Login'
import Content from './containers/Content'
import PrivateRoute from './components/UI/PrivateRoute'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
	return (
    	<Router>
			<div className="min-h-screen bg-gray-100">
				<Switch>
					<PrivateRoute auth path="/login" component={Login}/>
					<Content/>
				</Switch>
			</div>
			
    	</Router>
  	)
}

export default App
