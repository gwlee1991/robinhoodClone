import React from 'react'
import { connect } from 'react-redux';
import Splash from '../../images/login-splash.jpg';
import LoginForm from './LoginForm';
import './PlainLogin.css';

class PlainLogin extends React.Component {
	render(){
		return (
			<div className="plainlogin-container">
				<img src={Splash} className="plainlogin-img" />
				<div className="plainlogin-form-container">
					<div className="plainlogin-form">
						<LoginForm history={this.props.history} />
					</div>
				</div>
			</div>
		)
	}
}

export default connect(null,null)(PlainLogin);
