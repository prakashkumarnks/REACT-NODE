import React from 'react';
import axios from 'axios';
import Select from 'react-select';




class PropData extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Psend: '',
			imageURL: '',
			dis: '',
			selectedOption: null,
		}
	}


	handleChange = selectedOption => {
		this.setState({ selectedOption });
		console.log(`Option selected:`, selectedOption);
	};

	componentDidMount() {


		//axios.get('https://dog.ceo/api/breeds/image/random')
		axios.post('http://localhost:8082/statevsdistict', { state: this.props.brand })
			.then(response => {
				console.log(response.data);
				//this.setState({ imageURL: response.data });
				this.setState({ Psend: this.props.brand, imageURL: response.data.message , dis : response.data.message });
			})
			.catch(error => {
				console.log(error);
			});


	}

	render() {
		const { imageURL, Psend, selectedOption,dis } = this.state;
		return (
			<div className="App">
				<h2>I am a {Psend}!</h2>
				
				
				
				<Select
					value={selectedOption}
					onChange={this.handleChange}
					options={dis}
				/>
				
				
				<div><pre>{JSON.stringify(imageURL, null, 1)}</pre></div>




			</div>
		);
		/*return (
				<h2>I am a {Psend};!</h2>	
     			 <h2>{ imageURL }</h2>
   				 );*/

	}
}

export default PropData;