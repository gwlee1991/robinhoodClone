import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal';
import DepositFundModal from '../BuyingPowerCard/DepositFundModal';
import { addBuyingPower } from '../../../actions/portfolio';

const acceptableInput = [
	'1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'
]

class TransactionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			investType: 'dollar',
			shares: "",
			dollar: "",
			buy: true,
			showInvestOption: false,
			inputDollarFocused: false,
			inputShareFocused: false,
			x: null,
			y: null,
			error: null,
			estQuantity: 0,
			estimateCost: 0,
			openDepositModal: false
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

	renderModal = () => {
		if (this.state.openDepositModal) {
			return( 
				<Modal>
					<DepositFundModal addBuyingPower={this.props.addBuyingPower} handleClick={() => this.setState({ openDepositModal: false })} />
				</Modal>
			)
		}
	}

	renderInvestType = () => {
		const renderOptions = () => {
			if (this.state.showInvestOption) {
				return (
					<>
						<div onClick={() => this.setState({ investType: 'share', showInvestOption: false})} className={this.state.investType === "share" ? "option-box selected" : "option-box hoverable"} >
							<span className="small-text">Shares</span>
						</div>
						<div onClick={() => this.setState({ investType: 'dollar', showInvestOption: false})} className={this.state.investType==='dollar' ? "option-box selected" : "option-box hoverable"}>
							<span className="small-text">Dollars</span>
						</div>
					</>
				)
			}
		}
		return (
			<div tabIndex="1" onBlur={() => this.setState({ showInvestOption: false })} className="invest-type-option-container">
				<div className="option-box" onClick={(e) => this.setState({ showInvestOption: !this.state.showInvestOption, x: e.clientX, y: e.clientY })}>
					<span className="small-text">
						{this.state.investType === 'dollar' ? 'Dollars' : 'Shares'}
					</span>
				</div>
				{renderOptions()}
			</div>
		);
	};

	calculateQuantity = (value) => {
		if (value === "" || value === '$') return 0;
		let quantity;
		if (value.includes('$')) {
			quantity = parseFloat(value.slice(1))/this.props.stockInfo.quote.c;
		} else {
			quantity = parseFloat(value)/this.props.stockInfo.quote.c;
		}
		let quantityString = quantity.toString();
		if (quantityString.split('.')[1] && quantityString.split('.')[1].length > 6) return quantity.toFixed(6);
		return quantity;
	};

	handleDollarInputChange = e => {
		this.setState(prevState => {
			if (e.target.value === '$') {
				return {
					dollar: '',
					estQuantity: 0
				}
			} else if (!acceptableInput.includes(e.target.value[e.target.value.length - 1])) {
				return {
					dollar: this.state.dollar
				}
			} else if (this.state.dollar.includes('.') && this.state.dollar.split('.')[1].length === 2 && (e.target.value.length > this.state.dollar.length)) {
				return {
					dollar: this.state.dollar
				}
			} else if (this.state.dollar.length > 0) {
				return {
					dollar: e.target.value,
					estQuantity: this.calculateQuantity(e.target.value)
				}
			} else {
				return {
					dollar:  `$${e.target.value}`,
					estQuantity: this.calculateQuantity(e.target.value)
				}
			}
		});
	}
	
	normalizeDollarInput = () => {
		this.setState(state => { 
			if (state.dollar === '' || state.dollar === '$') {
				return {
					dollar: '',
					inputDollarFocused: false
				}
			}
			else if (this.state.dollar.split('.').length === 1) {
				return {
					dollar: `${state.dollar}.00`,
					inputDollarFocused: false
				}
			} else if (state.dollar.split('.').length > 2) {
				return {
					dollar: '',
					inputDollarFocused: false,
					estQuantity: 0
				}
			} else if (state.dollar.split('.')[1].length < 2) {
				return {
					dollar: `${state.dollar}0`,
					inputDollarFocused: false
				}
			} else {
				return {
					dollar: `${state.dollar}`,
					inputDollarFocused: false
				}
			}
		});
	}

	renderDollarForm = () => {
		return (
			<>
				<div className="labels-container">
					<div>
						<span className="small-text">Amount</span>
					</div>
					<div className={this.state.inputDollarFocused ? "input-box focused" : "input-box"}>
						<input onFocus={() => this.setState({ inputDollarFocused: true })} onBlur={this.normalizeDollarInput} value={this.state.dollar} onKeyDown={this.handleDollarInputKeyDown} onChange={this.handleDollarInputChange} placeholder="$0.00" />
					</div>
				</div>
				<div className="estimate-container">
					<div>
						<span className="small-bold-text">Est. Quantity</span>
					</div>
					<div>
						<span className="small-bold-text">{this.state.estQuantity}</span>
					</div>
				</div>
			</>
		);
	};

	calculateCost = (shares) => {
		let calculation = parseFloat(shares) * this.props.stockInfo.quote.c;
		let calculationString = calculation.toString();
		if (calculationString.split('.')[1] && calculationString.split('.')[1].length > 6) return calculation.toFixed(6).toString();
		if (!calculation) return 0;
		return calculation.toFixed(2);
	}

	handleSharesInput = e => {
		if (e.target.value === '') {
			this.setState({
				shares: '',
				estimateCost: 0
			})
		}

		if (acceptableInput.includes(e.target.value[e.target.value.length - 1])) {
			this.setState({
				shares: e.target.value,
				estimateCost: this.calculateCost(e.target.value)
			})
		}
	}

	renderShareForm = () => {
		return (
			<>
				<div className="labels-container">
					<div>
						<span className="small-text">Shares</span>
					</div>
					<div className={this.state.inputShareFocused ? "input-box focused" : "input-box"}>
						<input placeholder="0" onBlur={() => this.setState({inputShareFocused: false})} onFocus={() => this.setState({ inputShareFocused: true })} onChange={this.handleSharesInput} value={this.state.shares} />
					</div>
				</div>
				<div className="labels-container">
					<div>
						<span style={{ color: 'rgb(0,200,5)'}} className="small-text">Market Price</span>
					</div>
					<div>
						<span className="small-text">${this.props.stockInfo.quote.c}</span>
					</div>
				</div>
				<div className="estimate-container">
					<div>
						<span className="small-bold-text">Estimated Cost</span>
					</div>
					<div>
						<span className="small-bold-text">${this.state.estimateCost}</span>
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

	renderButton = () => {
		if (this.state.error) {
			if (this.state.error === "INSUFFICIENT FUNDS") {
				return (
					<div className="purchase-error-container">
						<div>
							<span className="small-bold-text">Not Enough Buying Power</span>
						</div>
						<div>
							<span className="small-text">You don't have enough buying power for this order.</span>
						</div>
						<div onClick={() => this.setState({ openDepositModal: true })} className="deposit-funds-button">
							<span className="small-bold-text">Deposit Funds</span>
						</div>
						<div onClick={() => this.setState({ error: null })} className="dismiss-button">
							<span className="small-bold-text">Dismiss</span>
						</div>
					</div>
				)
			}
		} else {
			return (
				<div onClick={this.handleSubmit} className="confirmation-button">
					<span className="small-bold-text">Review Order</span>
				</div>
			)
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		if (this.state.investType === 'dollar' && this.state.buy) {
			if (parseFloat(this.state.dollar.slice(1)) > parseFloat(this.props.currentUser.buyingPower)) {
				this.setState({ error: "INSUFFICIENT FUNDS"});
			}
		} else if (this.state.investType === 'share' && this.state.buy) {
			if (parseFloat(this.state.estimateCost) > parseFloat(this.props.currentUser.buyingPower)) {
				this.setState({ error: "INSUFFICIENT FUNDS"});
			}
		}
	}

	render() {
		return (
			<div className="transaction-card">
				<form className="transaction-form" onSubmit={this.handleSubmit}>
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
						{this.renderButton()}
					</div>
					<div className="transaction-footer">{this.renderFooter()}</div>
				</form>
				{this.renderModal()}
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
		addBuyingPower: buyingPower => dispatch(addBuyingPower(buyingPower))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
	