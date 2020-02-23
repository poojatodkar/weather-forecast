import React from 'react';
import WeatherDetail from '../WeatherDetail';

const WeatherDetailList = ({ data , onClickBack}) => {
    return (
        <div className="weather-detail-list card">
            <button onClick={onClickBack}>Back</button>
            {
                data && data.map(details => {
                    return (
                        <div className="weather-details">
                            <div className="weather-detail-header">
                                <h2>{details.location.city},{details.location.region}</h2>
                                <p>{new Date().toDateString()}</p>
                                <p>{details.forecasts[0].text}</p>
                            </div>
                            <div className="weather-detail-body">
                                <div className="current-temperature">
                                    <p>{details.forecasts[0].high}<sup>&#8457;</sup></p>
                                </div>
                                <div className="other-details">
                                    <p><span>Pressure: </span>{details.current_observation.atmosphere.pressure} inchHg</p>
                                    <p><span>Humidity: </span>{details.current_observation.atmosphere.humidity}%</p>
                                    <p><span>Wind: </span>{details.current_observation.wind.speed} mph</p>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default WeatherDetailList;