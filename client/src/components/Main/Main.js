import React from 'react'
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Newsfeed from './Newsfeed/Newsfeed';
import Stats from './Stats/Stats';
import StockInfo from './StockInfo/StockInfo';
import PurchaseCard from './PurchaseCard/PurchaseCard';

function Main() {
	return (
		<div className="app-main">
			<div className="app-header">
				<Route path="/" component={Header}/>
			</div>
			<div className="app-body">
				<div className="app-container">
					<Route path="/" exact component={Newsfeed} />
					<Route path="/" exact component={Stats} />
					<Route path="/stock/:stock" component={StockInfo} />
					<Route path="/stock/:stock" component={PurchaseCard} />
				</div>
			</div>
		</div>
	)
}

export default Main;