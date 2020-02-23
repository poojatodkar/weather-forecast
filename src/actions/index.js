import axios from 'axios';

export const FETCH_WEATHER_DETAILS = 'FETCH_WEATHER_DETAILS';
export const FETCH_WEATHER_DETAILS_FOR_MULTIPLE_CITIES = 'FETCH_WEATHER_DETAILS_FOR_MULTIPLE_CITIES';

export const fetchWeatherData = data => {
    return {
        type: FETCH_WEATHER_DETAILS,
        data
    };
}

export const fetchWeatherDataForMultipleCities = data => {
    return {
        type: FETCH_WEATHER_DETAILS_FOR_MULTIPLE_CITIES,
        data
    };
}

export const fetchWeatherDetails = data => {
    return dispatch => {
        return axios.get(
            'http://localhost:4000/getDetailsById', {
                params: {
                    woeid: data.value
                }
            }).then(response => {
                dispatch(fetchWeatherData(response.data.data))
            }).catch(err => {
                console.log(err);
            });
    }
}

export const fetchWeatherDetailsForMultipleCities = data => {
    return dispatch => {
        return axios.get(
            'http://localhost:4000/getDetailsForMultipleCities', {
                params: {
                    woeid: data
                }
            }
        ).then(response => {
            dispatch(fetchWeatherDataForMultipleCities(response.data.data))
        }).catch(err => {
            console.log(err);
        });
    }
}