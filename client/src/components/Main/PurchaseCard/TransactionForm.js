import React from 'react';
import { connect } from 'react-redux';
import Modal from '../../Modal';

class TransactionForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			investType: 'dollar',
			shares: 0,
			dollar: 0,
			buy: true,
			showInvestOption: false
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
					<div>options</div>
				)
			}
		}
		return (
			<div>
				<div onClick={() => this.setState({ showInvestOption: !this.state.showInvestOption })}>
					<span className="small-text">
						{this.state.investType === 'dollar' ? 'Dollars' : 'Shares'}
					</span>
				</div>
				{renderOptions()}
			</div>
		);
	};

	renderDollarForm = () => {
		const calculateQuantity = () => {
			return this.state.dollar / this.props.stockInfo.quote.c;
		};

		return (
			<>
				<div className="labels-container">
					<div>
						<span className="small-text">Amount</span>
					</div>
					<div>
						<input />
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

const mapDispatchToProps = (dispatch) => {};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionForm);
