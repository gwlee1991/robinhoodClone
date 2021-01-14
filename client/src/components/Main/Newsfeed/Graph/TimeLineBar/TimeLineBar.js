import React from 'react'
import TimeLineBarOptions from './TimeLineBarOptions';
import './TimeLineBar.css';

function TimeLineBar(props) {
	return (
		<div className="timeline-bar-container">
			{props.timelineOptions.map(option => {
				return <TimeLineBarOptions key={option} selected={props.select === option ? true : false} handleTimeline={props.handleTimeline} term={option} />
			})}
		</div>
	)
}

export default TimeLineBar
