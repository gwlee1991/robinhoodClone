import React from 'react'
import SplashImage from '../../images/splash-image.jpg';
import InfoMark from '../../images/information-mark.svg';
import { Link } from 'react-router-dom'
import "./Introduction.css";

function Introduction() {
	return (
		<div className="introduction-container">
			<section className="intro-container">
			<div className="intro-text-container">
				<div className="intro-text-title-container">
					<h1>Investing for Everyone</h1>
				</div>
				<div className="intro-text-body-container">
					<p>
						Commission-free investing, plust the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations apply.
					</p>
				</div>
				<div className="intro-text-button-container">
					<div className="intro-signup-button">
						<Link to="/signup">
							<span className="signup-button">Sign Up</span>
						</Link>
					</div>
				</div>
					<div className="intro-disclosure-button">
							<img src={InfoMark} className="info-mark" alt="info-mark" />
							<span>
								Free Stock disclosure
							</span>
					</div>
			</div>
			<div className="intro-image-container">
				<img src={SplashImage} alt="splash" />
			</div>
			</section>
			<section className="intro-fee-container">
				<div className="intro-fee">
					<div className="intro-fee-title-container">
						<h1 className="intro-fee-title">Break Free from Commission Fees</h1>
					</div>
					<div className="intro-fee-body-container">
						<p className="intro-fee-body">
							Make unlimited commission-free trades in stocks, ETFs, and options with Robinhood Financial, as well as buy and sell cryptocurrencies with Robinhood Crypto. See our <span style={{ fontWeight: 500}} className="hover-cursor underline">fee sechedule</span> to learn more about costs.
						</p>
					</div>
					<div className="intro-disclosure-button center">
						<img src={InfoMark} className="info-mark" alt="info-mark" />
						<span>
							Commissions Disclosure
						</span>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Introduction
