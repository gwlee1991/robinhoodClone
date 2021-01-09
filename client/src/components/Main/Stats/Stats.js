import React from 'react'
import "./Stats.css";
import StatsRow from './StatsRow/StatsRow';
import { connect } from 'react-redux';
import WatchList from './WatchList/WatchList';
import { addWatchList } from '../../../actions/portfolio';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedStocks: [],
      showForm: false,
      watchListName: '',
      inputFocused: false
    }
  }

  renderForm = () => {
    if (this.state.showForm) {
      return (
        <div className="watchlist-form-container">
          <div className={this.state.inputFocused ? "input-container focused" : "input-container"}>
            <input onBlur={() => this.setState({ inputFocused: false })} onFocus={() => this.setState({ inputFocused: true })} onChange={e => this.setState({ watchListName: e.target.value })} type="text" placeholder="List Name" value={this.state.watchListName} />
          </div>
          <div className="buttons-container">
            <div className="cancel-button small-text" onClick={e => this.setState({ showForm: false, watchListName: ''})}>Cancel</div>
            <div className="create-list-button small-text" onClick={() => this.props.addWatchList(this.state.watchListName)}>Create List</div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="stats">
        <div className="stats-container">
          <div className="stats-header">
            <p>Stocks</p>
          </div>
          <div className="stats-content">
            <div className="stats-rows">
              {this.state.ownedStocks.map((stock) => {
                return <StatsRow 
                  key={stock.name}
                  name={stock.name}
                  openPrice={stock.info.o}
                  shares={stock.data.shares}
                  price={stock.info.c}
                />
              })}
            </div>
          </div>
          <div className="stats-header">
            <span>Lists</span>
            <span className="green-hover" style={{ fontWeight: '700', fontSize: '20px'}} onClick={e => { this.setState({showForm: true})}}>+</span>
          </div>
          {this.renderForm()}
          <div className="stats-content">
            <div className="stats-rows">
              {this.props.currentUser.watchLists.map(watchlist => {
                return <WatchList key={watchlist.name} watchlist={watchlist} />
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.info
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addWatchList: watchListName => dispatch(addWatchList(watchListName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);