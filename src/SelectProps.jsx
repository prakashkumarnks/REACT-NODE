import React from 'react';
//import axios from 'axios';
//import Select from 'react-select';

class SelectProps extends React.Component {

	constructor(props) {
		super(props);
			 
		this.state = {
			data  : this.props.optionsdata,
		};
	}


	componentDidMount() {
		
		///console.log( this.state.data );
		this.setState({ data: this.props.optionsdata });
		//	console.log(this.state.counter);

	}

	render() {
		return <pre>{ JSON.stringify(this.props.optionsdata, null, 4)}</pre>;
	 }
}

export default SelectProps;