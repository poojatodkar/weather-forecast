import { FETCH_WEATHER_DETAILS, FETCH_WEATHER_DETAILS_FOR_MULTIPLE_CITIES } from '../actions';

const defaultState = {
    weatherDetails: {}
};

const weatherDetailsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_WEATHER_DETAILS:
            return {
                ...state,
                weatherDetails: action.data
            };
        case FETCH_WEATHER_DETAILS_FOR_MULTIPLE_CITIES:
            return {
                ...state,
                weatherDetails: action.data
            };
        default:
            return state;
    }
};

export {
    weatherDetailsReducer as WeatherDetailsReducer
}