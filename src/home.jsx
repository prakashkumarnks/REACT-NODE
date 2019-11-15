import React from 'react';
import { Redirect } from 'react-router-dom';
import PropData from './props';
import Select from 'react-select';
import { httpverbspost, Fillddl } from './Common';
import SelectProps from './SelectProps';

class home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			bindmaster_state: [],
			redirect: false,
			statevalue: null,
			district: [],
			dis: [],
			counter: 0,
			summa: [],
			options: [],
		};
	}



	setRedirect = () => {
		this.setState({
			redirect: true
		})
	}


	componentDidMount() {
		httpverbspost('/bindmaster_state', null).then(data => {
			this.setState({ bindmaster_state: data.bindmaster_state });
		})

		//Fillddl('SELECT DataId as value ,DataName  as label FROM bind_activestatus').then(res => {
		Fillddl('SELECT DataId ,DataName FROM bind_activestatus').then(res => {
			//	console.log(data);	 
			this.setState({ summa: res.data });
		})
		//setInterval(this.getData, 0);
	}

	getData = () => {

		this.setState({ counter: this.state.counter + 1 });
		//	console.log(this.state.counter);

	}




	handleChange = statevalue => {
		this.setState({ counter: 0 });
		this.setState({ statevalue });
		this.setState({ district: [] });
		httpverbspost('/statevsdistict', { state: statevalue.value }).then(response => {
			this.setState({ dis: response.message });
		});
	};


	changedistrict = district => {
		this.setState({ district });
	};


	logout = () => {
		
		localStorage.removeItem('loggoed');
		//return <Redirect to='/target' />
		this.props.history.push('/homesss');
	}



	render() {
		var loggoed = localStorage.getItem("loggoed");
		const { bindmaster_state, statevalue, district, dd } = this.state;


		return (
			<div className="container">
				<button onClick={this.logout}>Redirect</button>
				home page {loggoed}
				<div className="row">
					<p>in    {this.state.counter}</p>;
					<div className="col-sm-3">
						<Select
							value={statevalue}
							//value={this.state.statevalue}
							//value={bindmaster_state.filter(({ value }) => value === 2)}
							onChange={this.handleChange}
							options={bindmaster_state}
						/>
					</div >
					<div className="col-sm-3">
						<Select
							value={district}
							onChange={this.changedistrict}
							options={this.state.dis}
						/>
					</div >
					<div className="col-sm-3">
						<PropData brand="2" />
					</div >

					<div className="col-sm-3">

						<Select
							value={dd}
							options={this.state.summa}
						/>
					</div >
					<div className="col-sm-3">  <SelectProps optionsdata={this.state.summa} />

						<Select
							value={dd}
							options={<SelectProps optionsdata={this.options} />}
						/>

					</div>

				</div>


			</div>

		);
	}
}
export default home;