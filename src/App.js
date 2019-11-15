import React from 'react';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import login from './Component/login';
import home from './Component/home';
import myform from './Component/myform';
import view from './Component/view';
import lifecycle from './Component/lifecycle'; 
import { PrivateRoute } from './Component/PrivateRoute';

class App extends React.Component {
	render() {
		return (
/*path="/user/manage(/:id)(/:type)"  path="/myform/:postId" */
			<div className="Apps">
				<Router> <div className="menu">
					<Route path="/" exact component={login} />
					<PrivateRoute path="/home" exact component={home} />
				
					<PrivateRoute path="/view" exact component={view} />		
					<Route path="/myform/:postId/:secpar" exact component={myform} />	
					
					<Route path="/myform" exact component={myform} />
					<Route path="/lifecycle" exact component={lifecycle} />
					<ul>
						<li> <Link to="/home">home</Link> </li>		
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
