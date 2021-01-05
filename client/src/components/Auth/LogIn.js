import React from 'react'
import { connect } from 'react-redux';
import { login } from '../../actions/session';
import Logo from '../../images/robinhood-green.png';
import LoginForm from './LoginForm';
import "./LogIn.css";

class LogIn extends React.Component {
	componentDidUpdate(){
		if (this.props.currentUser) {
			this.props.history.push('/');
		}
	}

	render(){
		return (
		<div className="login-container">
			<div className="login">
				<section className="login-form-section">
					<div className="login-logo-container">
						<img src={Logo} alt="logo" width={100}/>
					</div>
					<div className="login-form">
						<LoginForm history={this.props.history} />
					</div>
				</section>
				<section className="login-disclosure-section">
					<div className="signup-left-disclosure-container" style={{paddingTop: "10px"}}>
						<div style={{ lineHeight: "20px", letterSpacing: "-0.1px", marginTop: "19px", marginBottom: "19px", paddingLeft: "15px", paddingRight: "15px" }}>
							<div className="signup-left-disclosure-block">
								All investments involve risk, including the possible loss of principal. Investors should consider their investment objectives and risks carefully before investing.
							</div>
							<div className="signup-left-disclosure-block">
								Commission-free trading means $0 commission trading on self-directed individual cash or margin brokerage accounts that trade U.S. listed securities via mobile devices or web. Keep in mind, other fees such as trading (non-commission) fees, Gold subscription fees, wire transfer fees, and paper statement fees may apply to your brokerage account.
							</div>
							<div className="signup-left-disclosure-block">
								Securities trading offered through Robinhood Financial LLC. Brokerage clearing services offered through Robinhood Securities, LLC. Both are subsidiaries of Robinhood Markets, Inc.
							</div>
							<div className="signup-left-disclosure-block">
								© 2020 Robinhood. All rights reserved.
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
	}
}

const mapStateToProps = (state, props) => {
	console.log(props);
	return {
		currentUser: state.currentUser.info
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: (user) => dispatch(login(user))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
