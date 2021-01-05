import React from 'react'
import Github from '../../images/GitHub-Mark-Light-32px.png';
import Linkedin from '../../images/linkedin.png';
import "./Footer.css";

function Footer() {
	return (
		<div className="footer-container">
			<div className="footer-disclosure-container">
				<p className="footer-disclosure-text">
					This is a Robinhood clone app and will not make actual transaction to purchase or sell stocks. Card information will not be asked and will use fake credits for making mock purchases. If you would like to simply try testing out the app, instead of creating a new account, please use the demo account. The demo account can be accessed with the <strong>Log in with Demo Account</strong> button while trying to sign up or trying to log in.
				</p>
			</div>
			<div className="footer-disclosure-container">
				<div className="footer-contact-info">
					<span>Geewon Lee</span>
				</div>
				<div className="footer-contact-info">
					<span>650-815-8619</span>
				</div>
				<div className="footer-contact-info">
					<span>gwlee1991@gmail.com</span>
				</div>
				<div className="footer-contact-info">
					<span><a href="https://github.com/gwlee1991"><img src={Github} style={{ height: "24px", width: "24px" }} alt="github" /></a></span>
					<span><a href="https://linkedin.com/in/gee-won-lee"><img style={{ height: "24px", width: "24px"}} src={Linkedin} alt="linkedin" /></a></span>
				</div>
				<div className="footer-contact-info">
					
				</div>
			</div>
		</div>
	)
}

export default Footer
