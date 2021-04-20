import React from 'react'

function TimeLineBarOptions(props) {
	const containerClassname = props.selected ? "timeline-button-container selected" : "timeline-button-container";
	const buttonClassname = props.selected ? "timeline-button selected small-bold-text" : "timeline-button small-bold-text";
	return (
			<span className={containerClassname}>
				<span onClick={props.handleTimeline} className={buttonClassname}>
					{props.term}
				</span>
			</span>
	)
}

export default TimeLineBarOptions
