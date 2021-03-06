import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "./StatsRow.css";
import StockChart from '../../../../images/stock.svg';
import NegStockChart from '../../../../images/negStock.svg';
import { fetchStockInfo } from '../../../../actions/stock';

function StatsRow(props) {
    const percentage = ((props.price - props.openPrice) / props.openPrice) * 100;
    const [dollar, cent] = props.price.toString().split('.');
    const fixedPrice = `${dollar}.${cent && cent.length > 1 ? cent.slice(0,2) : '00'}`;
    let classname = "statsrow-percentage";
    if (percentage < 0) {
         classname += ' down';
    }
    
    return (
        <Link onClick={() => props.fetchStockInfo(props.name)} to={`/stock/${props.name}`} style={{ textDecoration: 'none' }}>
            <div className="statsrow">
                <div className="statsrow-intro">
                    <h1>{props.name}</h1>
                    {
                        props.shares ? <p>{props.shares} Shares</p> : ''
                    }
                    
                </div>
                <div className="statsrow-chart">
                    <img src={percentage > 0 ? StockChart : NegStockChart} height={16} alt="StockChartImg" />
                </div>
                <div className="statsrow-numbers">
                    <p className="statsrow-price">${fixedPrice}</p>
                    <p className={classname}>{percentage.toFixed(2)}%</p>
                </div>
            </div>
        </Link>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStockInfo: ticker => dispatch(fetchStockInfo(ticker))
    }
}

export default connect(null, mapDispatchToProps)(StatsRow);
