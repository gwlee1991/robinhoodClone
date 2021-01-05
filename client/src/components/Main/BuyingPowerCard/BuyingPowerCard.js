import React from 'react'
import { connect } from 'react-redux';
import "./BuyingPowerCard.css";

function BuyingPowerCard(props) {
	return (
		<div className="buying-power-card expandable">
			<div className="buying-power-card-header">
				<span>
					Buying Power
				</span>
				<span>
					${props.currentUser.buyingPower}
				</span>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	currentUser: state.currentUser.info
})

export default connect(mapStateToProps)(BuyingPowerCard);