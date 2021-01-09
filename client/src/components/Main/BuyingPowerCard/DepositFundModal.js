import React from 'react';
import "./DepositFundModal.css";

const acceptableInput = [
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
]

class DepositFundModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			buyingPower: '',
			focused: false,
			error: null
		}
	}

	handleChange = e => {
		if (this.state.buyingPower === '') {
			this.setState({
				buyingPower: `$${e.target.value}`
			})
		} else {
			this.setState({
				buyingPower: `${e.target.value}`
			})
		}
	}

	buyingPowerValidation = () => {
		const { buyingPower } = this.state
		let afterDot = 0;
		let seenDot = false;
		for (let i = 1; i < buyingPower.length; i++) {
			let char = buyingPower[i];
			if (!acceptableInput.includes(char)) return false;
			if (seenDot) afterDot++;
			if (afterDot > 2) return false;
			if (seenDot && char === '.') return false;
			if (char === '.') seenDot = true;
		}
		return true;
	}
	

	handleSubmit = e => {
		e.preventDefault();
		try {	
			if (!this.buyingPowerValidation()) throw {message: 'Please enter a correct dollar amount.'}
			this.props.addBuyingPower(this.state.buyingPower.slice(1));
			this.props.handleClick();
		} catch (err) {
			this.setState({
				error: err.message
			})
		}
	}
	
	renderError = () => {
		if (this.state.error) {
			return (
				<div className="error-container">
					<span className="small-text">{this.state.error}</span>
				</div>
			)
		}
	}
	
	render(){
		const { focused } = this.state;
		return (
			<div className="modal-container">
				<div onClick={this.props.handleClick} className="x"><span>X</span></div>
				<div className="form-container">
					<form onSubmit={this.handleSubmit}>
						<div className="form-header">
							<span>Deposit Funds</span>
						</div>
						<div className="form-section">
							<div className="form-label-container">
								<span className="small-text">Amount</span>
							</div>
							<div className={focused ? "form-input-container focused" : "form-input-container"}>
								<input onFocus={() => this.setState({ focused: !focused })} onBlur={() => this.setState({focused: !focused})} type="price" step="1" placeholder="$0.00" value={this.state.buyingPower} onChange={this.handleChange} />
							</div>
						</div>
						{this.renderError()}
						<div className="submit-button" onClick={this.handleSubmit}>
							<span>Review</span>
						</div>
					</form>
				</div>
			</div>
		)
	}
}

export default DepositFundModal;