import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class lifecycle extends React.Component {
	constructor(props) {
		console.log('constructor');
		super(props);
		this.state = {
			RfId: ""
		};
	}

	/*componentDidMount() {
		console.log('Component DID MOUNT!');
	}*/
	/*componentWillReceiveProps(props) {    
      console.log('Component WILL RECIEVE PROPS!')
   }*/
	

	 componentWillMount() {
		console.log('Component WILL MOUNT!');
		this.setState({ RfId: "1000000000000000000000" }); 
   } 
/*
	componentDidUpdate(prevProps, prevState) {
      console.log('Component DID UPDATE!')
   }
*/
	render() {
		console.log('render');
         const { RfId } = this.state;
		return (
			<div>
				<div className="container" >
					<div className="row">
						life cycle { RfId } 
						</div></div>
			</div>
		);
	}


}
export default lifecycle;