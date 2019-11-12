import React from 'react';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { httpverbsInsertForm, SessionNotSet } from './Common';


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

			httpverbsInsertForm('/editupdate').then(response => {
				this.setState({ droplets: response.data.data, pages: response.data.pages });
			})
			.catch(error => {
				console.log(error);
			});
	}


	render() {
		const { droplets, pages } = this.state;

		return (
			<div className="container">
				{SessionNotSet()}
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
										<td><Link to={`/myform/${user.a}`}>Edit</Link></td>
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