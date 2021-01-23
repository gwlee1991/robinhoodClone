import React from 'react';
import { connect } from 'react-redux';
import LineGraph from './LineGraph/LineGraph';
import TimeLineBar from './TimeLineBar/TimeLineBar';
import Summary from './Summary/Summary';

const timelineOptions = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

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

	render(){
		return (
			<>
				<section className="portfolio">
					<Summary price={this.props.currentUser.buyingPower} timeline={this.state.timeline} />
				</section>
				<div className="newsfeed-chart">
					<LineGraph timeline={this.state.timeline} />
				</div>
				<div className="newsfeed-timeline-bar">
					<TimeLineBar timelineOptions={timelineOptions} handleTimeline={this.handleTimeline} select={this.state.timeline} />
				</div>
			</>
		)
	}
}

const mapStateToProps = state => ({
	currentUser: state.currentUser.info
})


export default connect(mapStateToProps)(Graph);