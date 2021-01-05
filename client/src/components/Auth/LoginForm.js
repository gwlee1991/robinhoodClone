import React from 'react';
import { connect } from 'react-redux';
import { login, demoLogin } from '../../actions/session';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	componentDidUpdate(){
		if (this.props.currentUser) {
			this.props.history.push('/');
		}
	}
	
	handleSubmit = e => {
		e.preventDefault();
		this.props.login(this.state);
	}

	handleChange = field => {
		return (e) => {
			this.setState({
				[field]: e.target.value
			})
		}
	}

	handleDemoLogin = (e) => {
		e.preventDefault();
		this.props.demoLogIn();
	}
	
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<header className="login-form-header-container">
					<span className="login-form-header">Welcome to Robinhood</span>
				</header>
				<div>
					<div className="login-form-label-container">
						<span className="small-text">Email or username</span>
					</div>
					<div className="login-form-input-container">
						<input type="email" onChange={this.handleChange('email')} value={this.state.email} className="small-text" />
					</div>
					<div className="login-form-label-container">
						<span className="small-text">Password</span>
					</div>
					<div className="login-form-input-container">
						<input type="password" onChange={this.handleChange('password')} value={this.state.password} className="small-text" />
					</div>
					<div className="login-form-demo-container" onClick={this.handleDemoLogin}>
						<span className="login-form-demo-text">Log in with Demo account</span>
					</div>
				</div>
				<footer className="login-form-footer">
					<div className="login-form-sigin-button-container">
						<button className="login-form-signin-button" type="submit">Sign In</button>
					</div>
				</footer>
			</form>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		currentUser: state.currentUser.info
	}
}

const mapDispatchToProps = (dispatch) => {
 return {
	 login: (user) => dispatch(login(user)),
	 demoLogIn: () => dispatch(demoLogin())
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);