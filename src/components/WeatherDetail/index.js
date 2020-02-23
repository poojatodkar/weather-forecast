import React, { Component } from 'react';

class WeatherDetail extends Component { 
    render() {
        const { details, onClickBack } = this.props;
        const { location, current_observation, forecasts } = details;
        console.log('location', location, current_observation, forecasts);
        return (
            <div className="weather-details card">
                <button onClick={onClickBack}>Back</button>
                <div className="weather-detail-header">
                    <h2>{location.city},{location.region}</h2>
                    <p>{new Date().toDateString()}</p>
                    <p>{forecasts[0].text}</p>
                </div>
                <div className="weather-detail-body">
                    <div className="current-temperature">
                        <p>{forecasts[0].high}<sup>&#8457;</sup></p>
                    </div>
                    <div className="other-details">
                        <p><span>Pressure: </span>{current_observation.atmosphere.pressure} inchHg</p>
                        <p><span>Humidity: </span>{current_observation.atmosphere.humidity}%</p>
                        <p><span>Wind: </span>{current_observation.wind.speed} mph</p>
                    </div>
                </div>
                <div className="weather-forecast">
                    {
                        forecasts.map(value => {
                            return (
                                <div>
                                    <p>{value.day}</p>
                                    <p><span>{value.high}<sup>&#176;</sup></span><span>{value.low}<sup>&#176;</sup></span></p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
};

export default WeatherDetail;