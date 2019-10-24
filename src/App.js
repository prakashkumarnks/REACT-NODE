import React from 'react';
import login from './Component/login';
import home from './Component/home';
import PropData from './Component/props';
import dropdown from './Component/dropdown';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

class App extends React.Component {
	render() {
		return (

			<div className="Apps">
				<Router> <div className="menu">
					<Route path="/" exact component={login} />
					<Route path="/home" exact component={home} />
					<Route path="/props_data" exact component={PropData} />
					<Route path="/dropdown" exact component={dropdown} />	
					<ul>
						<li> <Link to="/home">home</Link> </li>
						<li> <Link to="/">login</Link> </li>
						<li> <Link to="/PropData">props_data</Link> </li>
						<li> <Link to="/dropdown">dropdown</Link> </li>
					</ul>
				</div>
				</Router>
			</div>

		);
	}
}

export default App;
