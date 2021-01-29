import React from 'react';
import Summary from '../Newsfeed/Graph/Summary/Summary';
import LineGraph from '../Newsfeed/Graph/LineGraph/LineGraph';
import TimeLineBar from '../Newsfeed/Graph/TimeLineBar/TimeLineBar';
import AnalystRating from './AnalystRating/AnalystRating';
import Earnings from './Earnings/Earnings';
import News from './News/News';
import "./StockInfo.css";

const timelineOptions = ['1D', '1W', '1M', '3M', '1Y'];

class StockInfo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timeline: '1Y'
		}
	}

	handleTimeline = (e) => {
		e.preventDefault();
		const term = e.target.innerText;
		this.setState({
			timeline: term
		})
	}

	renderSummary = () => {
		if (this.props.stockInfo.name) {
			return <Summary timeline={this.state.timeline} price={this.props.stockInfo.info.quote.c} />
		}
	}

	renderStockName = () => {
		if (this.props.stockInfo.name) {
			return <h1>{this.props.stockInfo.info.profile.name}</h1>
		}
	}
	
	render(){
		return (
			<div className="main-left">
				{this.renderStockName()}
				<section className="portfolio">
					{this.renderSummary()}
				</section>
				<section className="stockinfo-chart">
					<LineGraph timeline={this.state.timeline} />
				</section>
				<section>
					<TimeLineBar timelineOptions={timelineOptions} handleTimeline={this.handleTimeline} select={this.state.timeline} />
				</section>
				<section>
					About section
				</section>
				<section>
					<News name={this.props.stock} news={this.props.stockInfo.name? this.props.stockInfo.news : [] } /> 
				</section>
				<section>
					<AnalystRating rating={this.props.stockInfo.name ? this.props.stockInfo.info.recommendation[0] : {}} />
				</section>
				{/* <section>
					<Earnings earning={this.props.stockInfo.name ? this.props.stockInfo.info.earnings : null } />
				</section> */}
				<section>
					History section
				</section>
				<section>
					Peer section
				</section>
				<footer style={{ marginTop: "32px"}}>
					<p className="small-text" style={{ color: "rgb(121,133,139"}}>All investments involve risks, including the loss of principal. Securities trading offered through Robinhood Financial LLC, a registered broker-dealer and Member SIPC.</p>
				</footer>
			</div>
		)
	}
}

export default StockInfo;