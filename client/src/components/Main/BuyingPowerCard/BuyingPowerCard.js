import React from 'react'
import { connect } from 'react-redux';
import "./BuyingPowerCard.css";
import { addBuyingPower } from '../../../actions/portfolio';
import Modal from '../../Modal';
import DepositFundModal from './DepositFundModal';

class BuyingPowerCard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			expand: false,
			openModal: false
		}
	}

	toggleModal = () => {
		this.setState({ openModal: true });
	}

	renderModal = () => {
		if (this.state.openModal) {
			return <Modal>
				<DepositFundModal addBuyingPower={this.props.addBuyingPower} handleClick={() => { this.setState({ openModal: false})}} />
			</Modal>
		}
	}

	renderFullBox = () => {
		if (this.state.expand) {
			return <div className="buying-power-expand">
					<div className="buying-power-expand-section left">
						<div className="buying-power-expand-label border-bottom">
							<div className="label-title"><span>Brokerage Cash</span></div>
							<div className="label-value"><span>${this.props.currentUser.buyingPower}</span></div>
						</div>
						<div className="buying-power-expand-label">
							<div className="label-title"><span>Buying Power</span></div>
							<div className="label-value"><span>${this.props.currentUser.buyingPower}</span></div>
						</div>
						<div className="buying-power-expand-label more">
							<span className="buying-power-more">Get More Buying Power</span>
						</div>
						<div className="deposit-funds-button-container" onClick={this.toggleModal}>
							<span>Deposit Funds</span>
						</div>
					</div>
					<div className="buying-power-expand-section right">
						<span>Buying Power represents the total value of stocks you can purchase.</span>
					</div>
			</div>
		}
	}

	render(){
		return (
			<div className="buying-power-card">
				<div onClick={() => this.setState({expand: !this.state.expand})} className={this.state.expand ? "buying-power-card-header expand" : "buying-power-card-header"}>
					<div className="buying-power-header-container">
						<span>
							Buying Power
						</span>
						<span>
							${this.props.currentUser.buyingPower}
						</span>
					</div>
				</div>
				{this.renderFullBox()}
				{this.renderModal()}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	currentUser: state.currentUser.info
});

const mapDispatchToProps = dispatch => ({
	addBuyingPower: buyingPower => dispatch(addBuyingPower(buyingPower))
})

export default connect(mapStateToProps, mapDispatchToProps)(BuyingPowerCard);