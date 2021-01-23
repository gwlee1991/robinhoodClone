import React from 'react';
import './AnalystRating.css';

const Bar = ({ title, percent}) => {
	const titleStyle = title === 'Buy' ? { color: 'rgb(0,200,5)' } : { color: 'white' };
	const leftBarStyle = title === 'Buy' ? { backgroundColor: 'rgb(0,200,5)', width: `${percent}%` } : { backgroundColor: 'white', width: `${percent}%`};
	const rightBarStyle = title === 'Buy' ? { backgroundColor: 'rgba(0,200,5,0.2)', width: `${100 - percent}%` } : {backgroundColor: 'rgb(48,54,58)', width: `${100 - percent}%`};
	return (
		<div className={ title === "Buy" ? "bar-container buy" : "bar-container"}>
			<div className="bar-title" style={titleStyle}>
				<span>{title}</span>
			</div>
			<div className="bars">
				<div className="bar-left" style={leftBarStyle}></div>
				<div>
					<span className="bar-title" style={titleStyle}>{percent}%</span>
				</div>
				<div className="bar-right" style={rightBarStyle}></div>
			</div>
		</div>
	)
}

const AnalystRating = ({ rating }) => {
	const totalRating = () => {
		return rating.buy + rating.hold + rating.sell;
	}

	const getPercent = (type) => {
		const percent = rating[type]/totalRating() * 100;
		const percentString = percent.toString();
		return percentString.split('.')[0];
	}

	return (
		<section className="section-container">
			<header className="section-header-container">
				<div className="section-header">
					<h2><span>Analyst Ratings</span></h2>
				</div>
			</header>
			<div className="rating-body-container">
				<div className="rating-summary-circle-container">
					<div className="rating-summary-circle">
						<h2>{getPercent('buy')}%</h2>
						<p>of {totalRating()} ratings</p>
					</div>
				</div>
				<div className="rating-chart-container">
					<Bar title="Buy" percent={getPercent('buy')} />
					<Bar title="Hold" percent={getPercent('hold')} />
					<Bar title="Sell" percent={getPercent('sell')} />
				</div>
			</div>
		</section>
	)
}


export default AnalystRating;