import React from 'react';
import PropData from './props';
import Select from 'react-select';
import { httpverbspost, SessionNotSet } from './Common';


class home extends React.Component {

	state = {
		bindmaster_state: [],
		redirect: false,
		statevalue: null,
		district: [],
		dis: [],
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
	}


	handleChange = statevalue => {
		this.setState({ statevalue });
		this.setState({ district: [] });
		httpverbspost('/statevsdistict', { state: statevalue.value }).then(response => {
			this.setState({ dis: response.message });
		});
	};


	changedistrict = district => {
		this.setState({ district });
	};


	render() {
		var loggoed = localStorage.getItem("loggoed");
		const { bindmaster_state, statevalue, district } = this.state;
		return (


			<div className="container" >
				{SessionNotSet()} home page {loggoed}

				<div className="row">

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



				</div >
			</div >
		);
	}
}
export default home;