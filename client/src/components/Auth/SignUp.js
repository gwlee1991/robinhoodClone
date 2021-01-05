import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '../../images/robinhood-vector-logo.svg';
import { signup, clearSessionError } from '../../actions/session';
import "./SignUp.css";

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: ""
		}
	}

	componentDidMount() {
		if (this.props.currentUser) {
			this.props.history.push('/');
		}
	}
	
	componentDidUpdate() {
		if (this.props.currentUser) {
			this.props.history.push('/');
		}
	}

	componentWillUnmount() {
		this.props.clearSessionError();
	}
	
	handleChange = (field) => {
		return (e) => {
			this.setState({
				[field]: e.target.value
			})
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const userInfo = this.state;
		this.props.signUp(userInfo);
	}

	renderError = () => {
		if (this.props.errors.length > 0) {
			return (
				<ul className="signup-error-container">
					{this.props.errors.map(err => {
						return <li key={err}>{err}</li>
					})}
				</ul>
			)
		}
	}
	
	render(){
		return <div className="signup-container">
			<section className="signup-left">
				<div className="signup-left-container">
					<div className="signup-left-logo-container">
						<img src={Logo} alt="robinhood-logo" style={{ width: "180px"}} />
					</div>
					<div className="signup-left-header-container">
						<div>
							<span className="signup-left-header-title">Make Your Money Move</span>
						</div>
						<div style={{ marginTop: "17px" }}>
							<span className="signup-left-header-body">Robinhood lets you invest in companies you love, commission-free.</span>
						</div>
					</div>
					<div className="signup-left-form-container">
						<form onSubmit={this.handleSubmit}>
							<div style={{ display: "flex" , justifyContent: "space-between", width: "100%"}}>
								<div className="signup-form-name-container" style={{ marginRight: "12px"}}>
									<div className="signup-form-name">
										<input autoComplete="true" className="signup-form-input" onChange={this.handleChange('firstName')} type="text" value={this.state.firstName} placeholder="First name" />
									</div>
								</div>
								<div className="signup-form-name-container" style={{ marginLeft: "12px"}}>
									<div className="signup-form-name">
										<input autoComplete="true" className="signup-form-input" onChange={this.handleChange('lastName')} type="text" value={this.state.lastName} placeholder="Last name" />
									</div>
								</div>
							</div>
							<div className="signup-form-max-width-field-container">
								<div className="signup-form-max-width-field">
									<input autoComplete="true" className="signup-form-input" onChange={this.handleChange('email')} type="email" value={this.state.email} placeholder="Email" />
								</div>
							</div>
							<div className="signup-form-max-width-field-container">
								<div className="signup-form-max-width-field">
									<input className="signup-form-input" onChange={this.handleChange('password')} type="password" value={this.state.password} placeholder="Password (min. 10 characters)" />
								</div>
							</div>
							<div style={{ width: "100%", marginTop: "40px", display: "flex", alignItems: "center"}}>
								<div style={{ paddingRight: "24px"}}>
									<button className="signup-form-submit-button" type="submit">Continue</button>
								</div>
								<div>
									<div>
										<span className="small-text">Already started?</span>
									</div>
									<div>
										<Link to="/signup/login">
											<span className="small-text green-link">
												Log in to complete your application
											</span>
										</Link>
									</div>
								</div>
							</div>
						</form>
						{this.renderError()}
					</div>
					<div className="signup-left-disclosure-container">
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
				</div>
			</section>
			<section className="signup-right">
				<div className="signup-right-content-container">
					<div className="signup-right-content-card">
						<div className="signup-right-content-title-container">
							<span className="medium-title-text">Commission-free trading</span>
						</div>
						<div className="signup-right-content-body-container">
							<span className="medium-body-text">Break free from commission-fees and make unlimited commission-free trades in stocks, funds, and options with Robinhood Financial. Other fees may apply.</span>
						</div>
					</div>
				<div className="signup-right-content-card">
					<div className="signup-right-content-title-container">
						<span className="medium-title-text">Account Protection</span>
					</div>
					<div className="signup-right-content-body-container">
						<span className="medium-body-text">Robinhood Financial is a member of SIPC. Securities in your account protected up to $500,000.</span>
					</div>
				</div>
				<div className="signup-right-content-card">
					<div className="signup-right-content-title-container">
						<span className="medium-title-text">Stay on top of your portfolio</span>
					</div>
					<div className="signup-right-content-body-container">
						<span className="medium-body-text">Set up customized news and notifications to stay on top of your assets as casually or as relentlessly as you like. Controlling the flow of info is up to you.</span>							
					</div>
				</div>
				</div>
			</section>
		</div>	
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.info,
		errors: state.currentUser.errors
	}
};
const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (user) => dispatch(signup(user)),
		clearSessionError: () => dispatch(clearSessionError())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);