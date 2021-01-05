import React from 'react'
import Search from '../../../../images/search.svg';

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchText: ''
		}
	}

	renderSearchResults = () => {

	}

	handleChange = e => {
		this.setState({
			searchText: e.target.value
		})
	}
	
	render(){
		return (
			<div className="header-search-container">
				<div className="header-search-input-container">
					<img src={Search} alt="search-vector" width="20px" />
					<input onFocus={e => {}} onChange={this.handleChange} value={this.state.searchText} placeholder="Search" type="text" />
				</div>
				{this.renderSearchResults()}
			</div>
		)
	}
}

export default SearchBar;
