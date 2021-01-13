import React from 'react';
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

	render(){
		return (
			<section>
				<div className="newsfeed-chart">
					<LineGraph timeline={this.state.timeline} />
				</div>
				<div className="newsfeed-timeline-bar">
					<TimeLineBar handleTimeline={this.handleTimeline} select={this.state.timeline} />
				</div>
			</section>
		)
	}
}


export default Graph;