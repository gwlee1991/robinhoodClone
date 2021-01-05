import React, { useState } from 'react'
import TimeLineBarOptions from './TimeLineBarOptions';
import './TimeLineBar.css';

function TimeLineBar() {
	return (
		<div className="timeline-bar-container">
			<TimeLineBarOptions term={"1D"} />
			<TimeLineBarOptions term={"1W"} />
			<TimeLineBarOptions term={"1M"} />
			<TimeLineBarOptions term={"3M"} />
			<TimeLineBarOptions selected term={"1Y"} />
			<TimeLineBarOptions term={"ALL"} />
		</div>
	)
}

export default TimeLineBar
