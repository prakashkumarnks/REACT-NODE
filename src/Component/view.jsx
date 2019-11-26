import React from 'react';
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import { httpverbspost,httpverbsInsertForm,paginationlink,PerPagelimit } from './Common';
class view extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			data: '',
			droplets: [],
			pages: "",
			totalCount : "",
			start : 0,
		}
	}
	
	
	componentDidMount() {
	  //  console.log(PerPagelimit);
		/*httpverbsInsertForm('/editupdate').then(response => {
			this.setState({ droplets: response.data.data, pages: response.data.pages });
		})
			.catch(error => {
				console.log(error);
			});*/
	}


	 handlePageClick = data => {
	     //alert(data.selected);
	     console.log(data.selected);
	     
	     httpverbspost('/editupdate',{ start : data.selected }).then(response => {
	         
	       //  console.log(response.totalCount);
	       var   start =   (data.selected) * 10;
	         if (start < 0)
	             start = 0;
	            this.setState({ droplets: response.data , totalCount : response.totalCount , start : data.selected * 10 + 1 });
	        })
	            .catch(error => {
	                console.log(error);
	            });
	   };
	   



	render() {
		const { droplets, pages , getresult ,totalCount} = this.state;
		 
      var i = this.state.start;
      console.log(i);
		return (
			<div className="container">
		        { paginationlink(this.handlePageClick,totalCount) }
				<table className="table">
					<thead>
						<tr>
		                    <th>S.No</th>
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
										<td>  { i++ } </td>
										<td>  {user.a} </td>
										<td>  {user.b} </td>
										<td>  {user.c} </td>
										<td><Link to={`/myform/${user.a}/${user.b}`}>Edit</Link></td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
							
			</div>
		)
	}
}

export default view;