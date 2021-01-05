import React from 'react'
import Logo from '../../images/robinhood-vector-logo.svg';
import Arrow from '../../images/angle-arrow-down.svg';
import { Link } from 'react-router-dom';

function Header() {

	const handleMenuClick = (e) => {
		e.preventDefault();
		window.alert('this function is not support yet');
	}
	
	return (
		<div className="splash-header-container">
			<div className="splash-header-left">
				<div className="splash-header-logo-container">
					<Link to="/">
						<img className="splash-logo" src={Logo} alt="robinhood-logo" />
					</Link>
				</div>
				<div className="splash-header-menu-container">
					<div className="splash-header-menu-item" onClick={handleMenuClick}>
						<span>
							Products
						</span>
						<span className="margin-left-small">
							<img className="down-arrow" src={Arrow} alt="arrow-down" />
						</span>
					</div>
					<div className="splash-header-menu-item" onClick={handleMenuClick}>
						<span>
							Learn
						</span>
						<span className="margin-left-small">
							<img className="down-arrow" src={Arrow} alt="arrow-down" />
						</span>
					</div>
					<div className="splash-header-menu-item" onClick={handleMenuClick}>
						<span>
							Support
						</span>
					</div>
					<div className="splash-header-menu-item" onClick={handleMenuClick}>
						<span>
							Who we are
						</span>
						<span className="margin-left-small">
							<img className="down-arrow" src={Arrow} alt="arrow-down" />
						</span>
					</div>
				</div>
			</div>
			<div className="splash-header-buttons-container">
				<Link to="/login">
					<div className="splash-header-login-button-container text-color-black">
						<span className="login-button">Log In</span>
					</div>
				</Link>
				<Link to="/signup">
					<div className="splash-header-signup-button-container text-color-black">
						<span className="signup-button">Sign Up</span>
					</div>
				</Link>
			</div>
		</div>
	)
}

export default Header
