import React from 'react';
import Select from 'react-select';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Button } from 'react-bootstrap';
//import TextField, { HelperText, Input } from '@material/react-text-field';


class dropdown extends React.Component {


	options = [
		{ value: 1, label: 'Chocolate' },
		{ value: 2, label: 'Strawberry' },
		{ value: 3, label: 'Vanilla' },
	];


	state = {
		statedata: null,
		disdata: null,
		disv: [],
	};

	handleChange = statedata => {
		this.setState({ statedata });
		this.setState({ disdata: null });
		axios.post('http://localhost:8082/statevsdistict', { state: statedata.value })
			.then(response => {
				this.setState({ disv: response.data.message });
			})
			.catch(error => {
				console.log(error);
			});

	};


	handleChangesss = disdata => {
		console.log(disdata.value);
		this.setState({ disdata });
	};


	render() {
		const {  disdata } = this.state;
		const selectedValue = 1;
		return (
			<div>
				<div className="container" >
					<div className="row">
						<div className="col-sm-3">
						
							<Select className="form-control"
								//value={statedata}
								value={this.options.filter(({ value }) => value === selectedValue)}
								onChange={this.handleChange}
								options={this.options}

							/>
						</div>


						<div className="col-sm-3">
							
							<Select className="form-control"
								value={disdata}
								onChange={this.handleChangesss}
								options={this.state.disv}
							/>
						</div>

						<div className="col-sm-3">
							
							<select>
								{this.options.map((team) => <option key={team.value} value={team.value}>{team.label}</option>)}
							</select>
						</div>

						<div className="col-sm-3">
						
							<select>
								{this.options.map((team) => <option key={team.value} value={team.value}>{team.label}</option>)}
							</select>
						</div>

						</div></div>





				</div>
				);
			}
		
		
		}
export default dropdown;