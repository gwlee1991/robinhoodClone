import React from 'react'

function TimeLineBarOptions(props) {
	const containerClassname = props.selected ? "timeline-button-container selected" : "timeline-button-container";
	const buttonClassname = props.selected ? "timeline-button selected" : "timeline-button";
	return (
			<span className={containerClassname}>
				<span onClick={props.handleTimeline} className={buttonClassname}>
					{props.term}
				</span>
			</span>
	)
}

export default TimeLineBarOptions
