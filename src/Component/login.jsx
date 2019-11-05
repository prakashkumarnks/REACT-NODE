import React from 'react';

class login extends React.Component {


	constructor(props) {
		super(props);

		this.state = {
			username: "",
			password: "",
			sess: ""
		};
	}

	validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	}


	handleSubmit = event => {

		if (this.state.username === 'admin' && this.state.password === "12345") {
			localStorage.setItem("loggoed", this.state.username);
			alert("sucess");
		}
		else {
			alert("fail");
		}

		event.preventDefault();

	}



	render() {
		return (
			<div className="Appss" >
			<div className="container" >
			<div className="col-sm-6" >
				<form onSubmit={this.handleSubmit} method="POST">
					login page
					<input type="text" name="username" id="username" className="form-control"
						value={this.state.username} onChange={this.handleChange}></input>
						<p></p>
					<input type="text" name="password" id="password" className="form-control"
						value={this.state.password} onChange={this.handleChange}  ></input>
						<p></p>
					<input type="submit" name="submit" className="btn btn-info btn-md" value="login"
						block disabled={!this.validateForm()}   ></input>
				</form>
			</div></div>
			</div>
		);
	}
}

export default login;