import React from 'react';
import $ from 'jquery';
///login only logs someone in

const Login = React.createClass({
	getInitialState(){
		return{
			username: '', password: ''
		}
	},
		//ajax post which is trigged by submit

		//if conditional checking against info database
		//if correct adds the user name to the req.session
		//automatically creates a cookie and saves the username


		//when app opens trigger the auth route ajax req to see if we have saved user info on req .session
		submitLoginInfo() {
		$.ajax({
            type: "POST",
            url: '/login',
            data: this.state
            })
        .done(function(data) {
        	console.log(data)
        })
	},

	updateUsername(event) {
		this.setState({username: event.target.value})
	},

	updatePassword(event) {
		this.setState({password: event.target.value})
	},



	// handelChange(eventType, event){
	// 	this.setState({ [eventType]: event.target.value })
	// },
	render(){
		return(
			<div>

			Username:
				<input onChange={this.updateUsername} type="text" name="username" />
			Password
				<input onChange={this.updatePassword} type="text" name="password" />
				<button onClick={this.submitLoginInfo}>Login</button>
			</div>
		)
	}
})

export default Login