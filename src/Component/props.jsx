import React from 'react';
import axios from 'axios';
import Select from 'react-select';




class PropData extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dis: '',
		}
	}


	handleChange = selectedOption => {
		this.setState({ selectedOption });
	};

	componentDidMount() {
		//axios.get('https://dog.ceo/api/breeds/image/random')
		axios.post('http://localhost:8082/statevsdistict', { state: this.props.brand })
			.then(response => {
				this.setState({  dis: response.data.message });
			})
			.catch(error => {
				console.log(error);
			});


	}

	render() {
		const { selectedOption, dis } = this.state;
		return (
			<div className="App">
				<label>I am a {this.props.brand}!</label>
				<Select
					value={selectedOption}
					onChange={this.handleChange}
					options={dis}
				/>
			</div>
		);

	}
}

export default PropData;