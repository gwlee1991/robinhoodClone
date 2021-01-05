import React from 'react'
import "./PopularLists.css";

function PopularListsItem(props) {
	const randomRgbGenerator = () => {
		return `rgb(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255 * 10)},${Math.floor(Math.random() * 255 * 10)})`
	}
	return (
		<div className="popular-lists-item">
			<div className="popular-lists-item-img" style={{"backgroundColor": `${randomRgbGenerator()}`}}>

			</div>
			<div>
				{props.tag}
			</div>
		</div>
	)
}

export default PopularListsItem;
