import React from 'react'
import "./Stats.css";
import StatsRow from './StatsRow/StatsRow';
import { connect } from 'react-redux';
import * as dataApi from '../../../api/dataApi';

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ownedStocks: [],
      watchlistStocks: []
    }
  }

  componentDidMount(){
    if (this.props.currentUser) {
      dataApi.getWatchlistStocksData().then(data => {
        this.setState({
            watchlistStocks: data
        });
      })
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
            <p>Lists</p>
          </div>
          <div className="stats-content">
            <div className="stats-rows">
              {this.state.watchlistStocks.map(stock => {
                return <StatsRow 
                  key={stock.name}
                  name={stock.name}
                  openPrice={stock.info.o}
                  price={stock.info.pc}
                />
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

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);