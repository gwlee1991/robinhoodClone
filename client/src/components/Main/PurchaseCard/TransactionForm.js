import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal';

const acceptableInput = [
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
]

class TransactionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			investType: 'dollar',
			shares: 0,
			dollar: "",
			buy: true,
			showInvestOption: false,
			inputFocused: false
		};
	}

	renderHeader = () => {
		if (
			this.props.currentUser.ownedStocks.filter((stocks) => stocks.name === this.props.stock)
				.length > 0
		) {
			return (
				<>
					<div onClick={() => this.setState({ buy: true })}>
						<span>Buy {this.props.stock}</span>
					</div>
					<div onClick={() => this.setState({ buy: false })}>
						<span>Sell {this.props.stock}</span>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div>
						<span className="medium-title-text">Buy {this.props.stock}</span>
					</div>
				</>
			);
		}
	};

	renderInvestType = () => {
		const renderOptions = () => {
			if (this.state.showInvestOption) {
				return (
					<>
						<div className="option-box">
							<span className="small-text">Shares</span>
						</div>
						<div className="option-box">
							<span className="small-text">Dollars</span>
						</div>
					</>
				)
			}
		}
		return (
			<div className="invest-type-option-container">
				<div className="option-box" onClick={() => this.setState({ showInvestOption: !this.state.showInvestOption })}>
					<span className="small-text">
						{this.state.investType === 'dollar' ? 'Dollars' : 'Shares'}
					</span>
				</div>
				{renderOptions()}
			</div>
		);
	};

	handleDollarInputChange = e => {
		this.setState(prevState => {
			console.log(e.target.value);
			if (e.target.value === '$') {
				return {
					dollar: ''
				}
			} else if (!acceptableInput.includes(e.target.value[e.target.value.length - 1])) {
				return {
					dollar: this.state.dollar
				}
			} else if (this.state.dollar.length > 0) {
				return {
					dollar: e.target.value
				}
			} else {
				return {
					dollar:  `$${e.target.value}`
				}
			}
		});
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
	
	normalizeDollarInput = () => {
		this.setState({ inputFocused: false });
	}

	renderDollarForm = () => {
		const calculateQuantity = () => {
			if (this.state.dollar === "" || this.state.dollar === '$') return 0;
			let quantity = parseFloat(this.state.dollar.slice(1)) / this.props.stockInfo.quote.c;
			let quantityString = quantity.toString();
			if (quantityString.split('.')[1] && quantityString.split('.')[1].length > 6) return quantity.toFixed(6);
			return quantity;
		};

		return (
			<>
				<div className="labels-container">
					<div>
						<span className="small-text">Amount</span>
					</div>
					<div className={this.state.inputFocused ? "input-box focused" : "input-box"}>
						<input onFocus={() => this.setState({ inputFocused: true })} onBlur={this.normalizeDollarInput} value={this.state.dollar} onChange={this.handleDollarInputChange}className="" placeholder="$0.00" />
					</div>
				</div>
				<div className="estimate-container">
					<div>
						<span className="small-bold-text">Est. Quantity</span>
					</div>
					<div>
						<span className="small-bold-text">{calculateQuantity()}</span>
					</div>
				</div>
			</>
		);
	};

	renderShareForm = () => {
		const calculateCost = () => {
			return this.state.shares * this.props.stockInfo.quote.c;
		};
		return (
			<>
				<div className="labels-container">
					<div>
						<span>Shares</span>
					</div>
					<div>
						<input />
					</div>
				</div>
				<div className="labels-container">
					<div>
						<span>Market Price</span>
					</div>
					<div>
						<span>$234</span>
					</div>
				</div>
				<div className="estimate-container">
					<div>
						<span>Estimated Cost</span>
					</div>
					<div>
						<span>{calculateCost()}</span>
					</div>
				</div>
			</>
		);
	};

	renderFooter = () => {
		if (this.state.buy) {
			return (
				<span className="small-text">
					${this.props.currentUser.buyingPower} Buying Power Available
				</span>
			);
		} else {
			if (this.state.investType === 'dollar') {
				return (
					<span className="small-text">
						${this.props.currentUser.buyingPower} Buying Power Available
					</span>
				);
			} else {
				return (
					<span className="small-text">
						${this.props.currentUser.buyingPower} Buying Power Available
					</span>
				);
			}
		}
	};

	render() {
		return (
			<div className="transaction-card">
				<form className="transaction-form">
					<header className="transaction-form-header-container">{this.renderHeader()}</header>
					<div className="transaction-form-body">
						<div className="transaction-input-container">
							<div className="labels-container">
								<div>
									<span className="small-text">Invest In</span>
								</div>
								{this.renderInvestType()}
							</div>
							{this.state.investType === 'dollar'
								? this.renderDollarForm()
								: this.renderShareForm()}
						</div>
					</div>
					<div className="transaction-form-body">
						<div className="confirmation-button">
							<span className="small-bold-text">Review Order</span>
						</div>
					</div>
					<div className="transaction-footer">{this.renderFooter()}</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser.info,
		stockInfo: state.stockInfo.info,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {

	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
