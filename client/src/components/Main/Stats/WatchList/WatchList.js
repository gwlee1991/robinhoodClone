import React from 'react';
import './WatchList.css';
import StatsRow from '../StatsRow/StatsRow';
import * as dataApi from '../../../../api/dataApi';

class WatchList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: []
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

	render() {
		return (
			<div className="watchlist-section">
				<div className="watchlist-container" onClick={this.toggleInfo}>
					<div className="watchlist-name">
						<span className="small-text">{this.props.watchlist.name}</span>
					</div>
					<div className="watchlist-buttons">
						<div className="watchlist-more-button green-hover">
							<span>...</span>
						</div>
						<div className={this.state.show ? "watchlist-expand-button flip" : "watchlist-expand-button"}>
							<span className="medium-body-text green-hover">v</span>
						</div>
					</div>
				</div>
				{this.renderStocks()}
			</div>
		)
	}
}

export default WatchList;