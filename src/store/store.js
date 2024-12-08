// Import necessary functions from Redux
import { createStore } from 'redux';
import rootReducer from './reducers';

// Configure the Redux store with the root reducer
const store = createStore(rootReducer);

// Export the configured store
export default store;