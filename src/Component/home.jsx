import React from 'react';
import PropData from './props';
import { Redirect } from 'react-router-dom';
//import { activateLasers } from './test';
import Select from 'react-select';


class home extends React.Component {

	state = {
		redirect: false,
		state : null,
		dis : null,
	}

	options = [
		{ value: 1, label: 'Chocolate' },
		{ value: 2, label: 'Strawberry' },
		{ value: 3, label: 'Vanilla' },
	];

	renderRedirect = () => {

		if (!localStorage.getItem("loggoed")) {
			return <Redirect to="/login" />;
		}
	}

	setRedirect = () => {
		this.setState({
			redirect: true
		})
	}


	handleChange = state => {
		//console.log(state.value);
		this.setState({ dis : state.value });
	};

	render() {
		var loggoed = localStorage.getItem("loggoed");
		const { options, state,dis } = this.state;
		return (


			<div className="container" >
				{this.renderRedirect()} home page {loggoed}
				<div className="row">



					<div className="col-sm-3">
						<Select
							value={state}
							onChange={this.handleChange}
							options={this.options}
						/>
					</div >

					<div className="col-sm-3">
						{dis}
						<PropData brand={dis} />
					</div >

				</div >
			</div >
		);
	}
}

export default home;