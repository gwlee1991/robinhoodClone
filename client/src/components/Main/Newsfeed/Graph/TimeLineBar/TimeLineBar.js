import React from 'react'
import TimeLineBarOptions from './TimeLineBarOptions';
import './TimeLineBar.css';

function TimeLineBar(props) {
	const timelineOptions = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];
	
	return (
		<div className="timeline-bar-container">
			{timelineOptions.map(option => {
				return <TimeLineBarOptions key={option} selected={props.select === option ? true : false} handleTimeline={props.handleTimeline} term={option} />
			})}
		</div>
	)
}

export default TimeLineBar
