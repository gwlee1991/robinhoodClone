import React from 'react';
import './WatchList.css';
import StatsRow from '../StatsRow/StatsRow';
import * as dataApi from '../../../../api/dataApi';
import { connect } from 'react-redux';
import { editWatchList, deleteWatchList } from '../../../../actions/portfolio';
import Modal from '../../../Modal';
import DeleteIcon from '../../../../images/delete.svg';
import EditIcon from '../../../../images/edit-button.svg';
import DownArrow from '../../../../images/down-arrow.svg';

class WatchList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: [],
			showMenu: false,
			x: null,
			y: null,
			showEditModal: false,
			showDeleteModal: false,
			editModalFocused: false,
			newWatchlistName: this.props.watchlist.name
		}
	}
	
	renderStocks = () => {
		if (this.state.show) {
			return <div>
				{this.state.data.map(stock => {
					return <StatsRow key={stock.name} name={stock.name} openPrice={stock.info.o} price={stock.info.pc} />
				}) }
			</div>
		}
	}
	
	toggleInfo = async e => {
		e.preventDefault();
		e.stopPropagation();
		if (!this.state.show) {
			dataApi.getWatchlistStocksData(this.props.watchlist.name).then(data => {
				this.setState({
					data: data,
					show: !this.state.show
				})
			})
		} else {
			this.setState({
				show: !this.state.show,
				data: []
			})
		}
	}

	toggleMenu = (e) => {
		e.stopPropagation();
		this.setState({
			showMenu: !this.state.showMenu,
			x: e.clientX,
			y: e.clientY
		})
	}

	renderMenu = () => {
		if (this.state.showMenu) {
			return (
				<Modal>
					<div className="watchlist-menu" style={{ top: `${this.state.y + 20}px`, left: `${this.state.x - 120}px`}}>
						<div className="watchlist-menu-option" onMouseDown={() => this.setState({ showEditModal: true })}>
							<img src={EditIcon} height="25" width="25" alt="edit"/><span>Edit list</span>
						</div>
						<div className="watchlist-menu-option" onMouseDown={() => this.setState({ showDeleteModal: true })}>
							<img src={DeleteIcon} alt="delete" height="25" width="25"/><span>Delete list</span>
						</div>
					</div>
				</Modal>
			)
		}
	}


	handleEditWatchlistSubmit = e => {
		const payload = {
			watchlistName: this.props.watchlist.name,
			newWatchlistName: this.state.newWatchlistName
		};

		this.props.editWatchList(payload);
		this.setState({ showEditModal: false });
	}
	
	renderEditModal = () => {
		if (this.state.showEditModal) {
			return (
				<Modal>
					<div className="watchlist-modal-container">
						<div className="modal-box">
							<form onSubmit={this.handleEditWatchlistSubmit}>
								<div className="modal-header">
									<div className="modal-header-title"><span style={{ fontWeight: "700"}}>Edit List</span></div>
									<div className="hover" onClick={() => this.setState({ showEditModal: false })}><span style={{ color: 'grey'}}>X</span></div>
								</div>
								<div className={this.state.editModalFocused ? "input-container focused" : "input-container"}>
									<input onFocus={() => this.setState({ editModalFocused: true })} onBlur={() => this.setState({ editModalFocused: false })} onChange={e => this.setState({ newWatchlistName: e.target.value })} type="text" placeholder="List Name" value={this.state.newWatchlistName} />
								</div>
								<div className="save-button-container">
									<div onClick={this.handleEditWatchlistSubmit} className="save-button">
										<span>Save</span>
									</div>
								</div>
							</form>
						</div>
					</div>
				</Modal>
			)
		}
	}

	handleDelete = e => {
		this.props.deleteWatchList(this.props.watchlist.name);
		this.setState({ showDeleteModal: false });
	}

	renderDeleteModal = () => {
		if (this.state.showDeleteModal) {
			return (
				<Modal>
					<div className="watchlist-modal-container">
						<div className="modal-box">
							<div className="modal-header">
								<div className="modal-header-title"><span style={{ fontWeight: "700" }}>Are you sure you want to delete "{this.props.watchlist.name}"?</span></div>
								<div className="hover" onClick={() => this.setState({ showDeleteModal: false})}><span style={{ color: 'grey' }}>X</span></div>
							</div>
							<div style={{ marginBottom: "24px"}}>
								<span className="medium-body-text">If you delete this and its {this.props.watchlist.stocks.length} items, it'll be gone forever!</span>
							</div>
							<div>
								<div onClick={this.handleDelete} className="delete-button">
									<span className="small-bold-text">Delete {this.props.watchlist.name}</span>
								</div>
							</div>
						</div>
						Delete
					</div>
				</Modal>
			)
		}
	}

	render() {
		return (
			<div className="watchlist-section">
				{this.renderMenu()}
				{this.renderDeleteModal()}
				{this.renderEditModal()}
				<div className="watchlist-container" onClick={this.toggleInfo}>
					<div className="watchlist-name">
						<span className="small-text">{this.props.watchlist.name}</span>
					</div>
					<div className="watchlist-buttons">
						<div tabIndex="1" onClick={this.toggleMenu} onBlur={this.toggleMenu} className={this.state.showMenu ? "watchlist-more-button green-hover clicked" : "watchlist-more-button green-hover"}>
							<span>...</span>
						</div>
						<div className={this.state.show ? "watchlist-expand-button flip" : "watchlist-expand-button"}>
							<span className="medium-body-text green-hover"><img src={DownArrow} alt='down-arrow' width="15" height="15"/></span>
						</div>
					</div>
				</div>
				{this.renderStocks()}
			</div>
		)
	}
}

// const mapStateToProps = (state) => {

// }

const mapDispatchToProps = dispatch => {
	return {
		editWatchList: payload => dispatch(editWatchList(payload)),
		deleteWatchList: watchlistName => dispatch(deleteWatchList(watchlistName))
	}
}

export default connect(null, mapDispatchToProps)(WatchList);