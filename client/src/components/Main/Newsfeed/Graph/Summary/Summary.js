import React from 'react';

const Summary = props => {
	const renderTimelineState = () => {
		switch(props.timeline) {
			case '1D':
				return 'Today';
			case '1W':
				return 'Past Week';
			case '1M':
				return 'Past Month';
			case '3M': 
				return 'Past 3 Months';
			case '1Y':
				return 'Past Year';
			case 'ALL':
				return 'All Time';
			default:
				return '';
		}
	}

	const renderPrice = () => {
		const [dollar, cent] = props.price.toString().split(".");
		if (cent.length < 2) {
			return `$${dollar}.00`;
		} else if (cent.length > 2) {
			return `$${dollar}.${cent.slice(0, 2)}`;
		}
		return `$${props.price}`
	}
	
	return (
		<>
			{props.name ? <h1>{props.name}</h1> : ""}
			<h1>{renderPrice()}</h1>
			<div className="newsfeed-portfolio-status">
				<span className="dollar-gain">+$44.63</span>
				<span className="percentage-gain">(+0.4%)</span>
				<span className="text light normal">{renderTimelineState()}</span>
			</div>
		</>
	)
}

export default Summary;