import React from 'react';
import Modal from '../../Modal';
import TransactionForm from './TransactionForm';
import {connect} from 'react-redux';
import { addStockToWatchList, removeStockFromWatchList, addWatchList } from '../../../actions/portfolio';
import Github from '../../../images/GitHub-Mark-Light-32px.png';
import "./PurchaseCard.css";

class PurchaseCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showWatchListModal: false,
			showWatchListForm: false,
			inputFocused: false,
			watchListName: '',
		}
	}

	renderWatchListModal = () => {
		if (this.state.showWatchListModal) {
			return <Modal>
				<div className="watchlist-modal-container">
					<div className="watchlist-modal-form">
						<div className="modal-header">
							<div className="modal-header-title">
								<span className="large-bold-text">Add {this.props.stock} to Lists</span>
							</div>
							<div onClick={() => this.setState({ showWatchListModal: false })} className="hover">
								<span className="large-text" style={{ color: 'grey'}}>X</span>
							</div>
						</div>
						<div onClick={() => this.setState({ showWatchListForm: true })} className={ this.state.showWatchListForm ? "watchlist-modal-row hover hidden" : "watchlist-modal-row hover"}>
							<div className="watchlist-form-plus">
								<span className="large-bold-text">+</span>
							</div>
							<div>
								<span className="medium-body-text">Create New List</span>
							</div>
						</div>
						<div className={this.state.showWatchListForm ? 'watchlist-form' : 'watchlist-form hidden'}>
							<form className="watchlist-modal-form-container" onSubmit={e => {
								e.preventDefault();
								this.props.addWatchList(this.state.watchListName);
								this.setState({ showWatchListForm: false })
							}}>
								<div className={this.state.inputFocused ? "modal-input-container focused" : "modal-input-container"}>
									<input type="text" onBlur={() => this.setState({ inputFocused: false })} onFocus={() => this.setState({ inputFocused: true })} placeholder="List Name" value={this.state.watchListName} onChange={(e) => this.setState({ watchListName: e.target.value })} />
								</div>
								<div className="buttons-container">
									<div className="hover cancel-button" onClick={() => this.setState({ showWatchListForm: false })}>
										<span className="small-bold-text">Cancel</span>
									</div>
									<div className="create-list-button" onClick={() => {
										this.props.addWatchList(this.state.watchListName);
										this.setState({ showWatchListForm: false })
									}}>
										<span className="small-bold-text">Create List</span>
									</div>
								</div>
							</form>
						</div>
						{this.props.currentUser.watchLists.map(watchlist => {
							let exists = false;
							watchlist.stocks.forEach(stock => {
								if (stock === this.props.stock) exists = true;
							});
							return (
								<div key={watchlist.name} onClick={() => {
									if (exists) {
										this.props.removeStockFromWatchList({ stock: this.props.stock, watchListName: watchlist.name});
									}
									if (!exists) {
										this.props.addStockToWatchList({ stock: this.props.stock, watchListName: watchlist.name})
									}
									this.setState({ showWatchListModal: false });
								}}>
									<div className="watchlist-modal-row hover">
										<div className="watchlist-form-image">
											<img src={Github} style={{ height: "24px", width: "24px" }} alt="github" />
										</div>
										<div className="watchlist-body-text">
											<span className="medium-body-text">{watchlist.name}</span>
											<span className="watchlist-summary-text">{exists ? `${this.props.stock} is already in this list` : `${watchlist.stocks.length} items` }</span>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</Modal>
		}
	}
	
	renderPurchaseCard = () => {

	}
	
	render() {
		return (
			<div className="main-right">
				<div className="transaction-card-container">
					<TransactionForm stock={this.props.stock} currentUser={this.props.currentUser} />
				</div>
				<div className="purchase-card-watchlist-button-container">
					<div onClick={() => this.setState({ showWatchListModal: true })} className="purchase-card-watchlist-button">
						<span className="small-bold-text">Add to Lists</span>
					</div>
				</div>
				{this.renderWatchListModal()}
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	return {
		currentUser: state.currentUser.info,
		stock: props.match.params.stock
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addStockToWatchList: payload => dispatch(addStockToWatchList(payload)),
		removeStockFromWatchList: payload => dispatch(removeStockFromWatchList(payload)),
		addWatchList: watchListName => dispatch(addWatchList(watchListName))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseCard);