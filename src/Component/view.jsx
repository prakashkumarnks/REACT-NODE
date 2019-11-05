import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import parse from 'html-react-parser';

class view extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: '',
			droplets: [],
			pages: "",
		}
	}



	componentDidMount() {
		axios.post('http://localhost:8082/editupdate')
			.then(response => {
				this.setState({ droplets: response.data.data ,pages : response.data.pages  });
				//	console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}


	render() {
		const { droplets ,pages } = this.state;

		return (
			<div className="container">
				<table className="table">
					<thead>
						<tr>

							<th>ID</th>
							<th>b</th>
							<th>c</th>
							<th>Edit</th>
						</tr>
					</thead>
					<tbody>
						{
							droplets.map((user) => {
								return (
									<tr>
										<td> {user.a} </td>
										<td>  {user.b} </td>
										<td>  {user.c} </td>
										<li><Link  to={`/myform/${user.a}`}>Edit</Link></li>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				{parse(pages)}
			
			</div>
		)
	}
}

export default view;