import React from 'react';
import { connect } from 'react-redux';
import { fetchStockInfo } from '../../../actions/stock';
import LineGraph from '../Newsfeed/Graph/LineGraph/LineGraph';
import TimeLineBar from '../Newsfeed/Graph/TimeLineBar/TimeLineBar';

const timelineOptions = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

class StockInfo extends React.Component {

	// componentDidMount = () => {
	// 	this.props.fetchStockInfo(this.props.stock);
	// }
	
	render(){
		return (
			<div className="stockinfo-container">
				<section>
					
				</section>
				<section>

				</section>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	console.log(props);
	return {
		currentUser: state.currentUser.info,
		stock: props.match.params.stock
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStockInfo: ticker => dispatch(fetchStockInfo(ticker))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StockInfo);