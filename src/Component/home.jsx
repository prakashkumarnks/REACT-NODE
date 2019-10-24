import React from 'react';
import PropData from './props';
import { Redirect } from 'react-router-dom';


class home extends React.Component {

	state = {
		redirect: false
	}

	renderRedirect = () => {

		if (!localStorage.getItem("loggoed")) 
			{
			return <Redirect to="/login" />;
			}
	}

	setRedirect = () => {

		this.setState({
			redirect: true
		})
	}

	render() {
		var loggoed = localStorage.getItem("loggoed");
		return (
		
			< div >
		
				{ this.renderRedirect() }
			home page { loggoed }
			<PropData brand="2" />
	
		</div >
		);
	}
}

export default home;