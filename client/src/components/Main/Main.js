import React from 'react'
import { Route } from 'react-router-dom';
import Header from './Header/Header';
import Newsfeed from './Newsfeed/Newsfeed';
import Stats from './Stats/Stats';

function Main() {
	return (
		<div className="app-main">
			<div className="app-header">
				<Route path="/" component={Header}/>
			</div>
			<div className="app-body">
				<div className="app-container">
					<Newsfeed />
					<Stats />
				</div>
			</div>
		</div>
	)
}

export default Main;