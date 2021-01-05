import React from 'react'
import Logo from '../../images/robinhood-green.png';

const style = {
	width: "100%",
	height: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center"
}

function LoadScreen() {
	return (
		<div style={style}>
			<img src={Logo} alt="logo" width="100px" />
		</div>
	)
}

export default LoadScreen
