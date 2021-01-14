import React from 'react';
import { connect } from 'react-redux';
import LineGraph from './LineGraph/LineGraph';
import TimeLineBar from './TimeLineBar/TimeLineBar';

class Graph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeline: '1Y'
		}
	}

	handleTimeline = (e) => {
		e.preventDefault();
		const term = e.target.innerText;
		this.setState({
			timeline: term
		})
	}

	renderTimelineState = () => {
		switch(this.state.timeline) {
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

	render(){
		return (
			<>
				<section className="newsfeed-portfolio">
					<h1>${this.props.currentUser.buyingPower}</h1>
					<div className="newsfeed-portfolio-status">
						<span className="dollar-gain">+$44.63</span>
						<span className="percentage-gain">(+0.4%)</span>
						<span className="text light normal">{this.renderTimelineState()}</span>
					</div>
				</section>
				<div className="newsfeed-chart">
					<LineGraph timeline={this.state.timeline} />
				</div>
				<div className="newsfeed-timeline-bar">
					<TimeLineBar handleTimeline={this.handleTimeline} select={this.state.timeline} />
				</div>
			</>
		)
	}
}

const mapStateToProps = state => ({
	currentUser: state.currentUser.info
})


export default connect(mapStateToProps)(Graph);