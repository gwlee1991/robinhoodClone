import React from 'react'
import "./PopularLists.css";
import PopularListsItem from './PopularListsItem';

function PopularLists() {
	const tags = ["100 Most Popular", "Top Movers", "Upcoming Earnings", "Crypto", "Cannabis", "Healthcare Supplies", "Index ETFs", "Technology", "China", "Pharma", "Consumer Goods", "Food & Drink", "Energy & Water"];
	return (
		<div className="popular-lists-container">
			<div className="popular-lists-header">
				<span>
					Popular Lists
				</span>
			</div>
			<div className="popular-lists-body">
				{tags.map(tag => {
					return <div key={tag} className="popular-lists-item-container">
						<PopularListsItem tag={tag} />
					</div>
				})}
			</div>
		</div>
	)
}

export default PopularLists
