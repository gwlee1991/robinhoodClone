import React from 'react';
import { connect } from 'react-redux';
import { fetchStockInfo} from '../../actions/stock';
import StockInfo from './StockInfo/StockInfo';
import PurchaseCard from './PurchaseCard/PurchaseCard';
import LoadScreen from '../LoadScreen/LoadScreen';

class Stock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            load: 'none'
        }
    }

    componentDidMount =() => {
        if (this.props.stockInfo.name !== this.props.stock) {
            this.props.fetchStockInfo(this.props.stock).then(() => {
                this.setState({ load: 'done' });
            })
        }
    }

    render(){
        switch(this.state.load) {
            case 'none':
                return <LoadScreen />
            case 'done':
                return (
                    <>
                        <StockInfo currentUser={this.props.currentUser} stockInfo={this.props.stockInfo} />
                        <PurchaseCard currentUser={this.props.currentUser} stock={this.props.stock} stockInfo={this.props.stockInfo} />
                    </>
                )
            default:
                return <></>
        }
    }
}

const mapStateToProps = (state, props) => {
    return {
        currentUser: state.currentUser.info,
        stock: props.match.params.stock,
        stockInfo: state.stockInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchStockInfo: ticker => dispatch(fetchStockInfo(ticker))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);