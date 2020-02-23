import { combineReducers, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { WeatherDetailsReducer } from './reducers';

const combinedReducers = combineReducers({
	weatherDetails: WeatherDetailsReducer
});

const store = createStore(
	combinedReducers,
	composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;
