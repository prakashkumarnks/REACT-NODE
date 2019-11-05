import React from 'react';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import login from './Component/login';
import home from './Component/home';
import myform from './Component/myform';
import PropData from './Component/props';
import dropdown from './Component/dropdown';
import view from './Component/view';
import lifecycle from './Component/lifecycle'; 


class App extends React.Component {
	render() {
		return (

			<div className="Apps">
				<Router> <div className="menu">
					<Route path="/" exact component={login} />
					<Route path="/home" exact component={home} />
					<Route path="/props_data" exact component={PropData} />
					<Route path="/dropdown" exact component={dropdown} />
					<Route path="/view" exact component={view} />		
					<Route path="/myform/:postId" exact component={myform} />	
					<Route path="/myform" exact component={myform} />
					<Route path="/lifecycle" exact component={lifecycle} />
					<ul>
						<li> <Link to="/home">home</Link> </li>
						<li> <Link to="/">login</Link> </li>
						<li> <Link to="/PropData">props_data</Link> </li>
						<li> <Link to="/dropdown">dropdown</Link> </li>
						<li> <Link to="/view">view</Link> </li>
						<li> <Link to="/myform">myform</Link> </li>
						<li> <Link to="/lifecycle">lifecycle</Link> </li>
					</ul>
				</div>
				</Router>
			</div>

		);
	}
}

export default App;
