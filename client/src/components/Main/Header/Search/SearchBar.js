import React from 'react'
import Search from '../../../../images/search.svg';
import "./SearchBar.css";
import { fetchSearchResults, clearSearchResults } from '../../../../actions/data';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchTerm: '',
			focused: false,
		}
	}

	componentDidMount = () => {
		let search = document.getElementById('search');
		const handlePosition = () => {
			let left = window.innerWidth * 0.1;
			if (left < 85) {
				search.style.left = `85px`;
			}
		}
		handlePosition();
		window.addEventListener('resize', handlePosition);
	}
	
	renderList = () => {
		return this.props.searchResults.map((result, i) => {
			const { symbol, description} = result;
			return (
				<div onMouseDown={(e) => {
					e.preventDefault();
					this.setState({ focused: false })
					this.props.history.push(`/stock/${symbol}`);
				}} key={symbol} >
					<div className="header-search-result-items" key={description + i}>
						<span className="header-search-header-text search-symbol">{symbol}</span>
						<span className="header-search-header-text search description">{description}</span>
					</div>
				</div>
			)
		})
	}
	
	renderSearchResults = () => {
		if (this.state.focused) {
			if (this.props.searchResults.length > 0 && this.state.searchTerm) {
				return (
				<div className="header-search-results-container">
					<div className="header-search-results">
						<div className="header-search-header">
							<span className="header-search-header-text" style={{ color: '#a9a9a9'}}>Stocks</span>
						</div>
						<div className="header-search-result-items-container">
							{this.renderList()}
						</div>
					</div>
				</div>
				)
			} 
		}
	}

	handleChange = async e => {
		await this.setState({
			searchTerm: e.target.value
		});
		this.props.fetchSearchResults(this.state.searchTerm);
	}

	turnOnFocus = e => {
		e.preventDefault();
		console.log('turn on focus')
		this.setState({ focused: true });
	}

	turnOffFocus = e => {
		e.preventDefault();
		console.log('turn off focus')
		this.setState({ focused: false });
	}
	
	render(){
		return (
			<div id="search" className={this.state.focused ? 'header-search-section focus' : "header-search-section"}>
				<div tabIndex="0" onBlur={this.turnOffFocus} className="header-search-container">
					<div className="header-search">
						<img src={Search} alt="search-vector" width="20px" style={{ marginLeft: "20px" }} />
						<input onFocus={this.turnOnFocus} placeholder="Search" onChange={this.handleChange} type="text" />
					</div>
					{this.renderSearchResults()}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		searchResults: state.searchResults.data,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchSearchResults: (searchTerm) => dispatch(fetchSearchResults(searchTerm)),
		clearSearchResults: () => dispatch(clearSearchResults())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
