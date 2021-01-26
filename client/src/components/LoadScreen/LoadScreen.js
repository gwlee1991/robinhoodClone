import React from 'react'
import Loader from 'react-loader-spinner'
import "./LoadScreen.css";

function LoadScreen() {
	return (
		<div className="loadscreen">
			<Loader 
				type="Rings"
				color="rgb(0,200,5)"
				height={100}
				width={100}
			/>
		</div>
	)
}

export default LoadScreen
