import { 
	RECEIVE_STOCKINFO, 
	RECEIVE_STOCKINFO_ERROR, 
	CLEAR_STOCKINFO_ERROR, 
	CLEAR_STOCKINFO
} from '../actions/types';

const defaultStockInfo = {
	name: null,
	info: {},
	news: [],
	errors: [],
}

const stockReducer = (state = defaultStockInfo, action) => {
	switch(action.type) {
		case RECEIVE_STOCKINFO:
			return { ...state, ...action.payload };
		case RECEIVE_STOCKINFO_ERROR:
			return { ...state, errors: [ ...action.payload.response.data ] }
		case CLEAR_STOCKINFO:
			return { ...state, name: null, info: {}, news: [] };
		case CLEAR_STOCKINFO_ERROR:
			return { ...state, errors: [] };
		default:
			return state;
	}
}

export default stockReducer;