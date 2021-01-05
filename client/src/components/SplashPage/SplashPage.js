import React from 'react'
import Header from './Header';
import Introduction from './Introduction';
import Footer from './Footer';
import "./SplashPage.css";

function SplashPage() {
	return (
		<div className="splash-page-container">
				<section className="splash-page-header">
					<Header />
				</section>
				<section className="splash-page-intro">
					<Introduction />
				</section>
				<section className="splash-page-footer">
					<Footer />
				</section>
		</div>
	)
}

export default SplashPage
