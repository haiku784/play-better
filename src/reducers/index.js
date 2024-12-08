// Import combineReducers from Redux
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import productReducer from './productReducer';

// Combine individual reducers into a root reducer
const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer
});

// Export the root reducer
export default rootReducer;