import React, { Component } from 'react';
import { connect } from 'react-redux';
import './index.css';
import { fetchWeatherDetails, fetchWeatherDetailsForMultipleCities } from '../../actions';
import WeatherDetail from '../WeatherDetail';
import WeatherDetailList from '../WeatherDetailList';
import CitiesDropdown from '../CitiesDropdown';
import { UScities } from '../../config';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css'

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			viewType: '',
			isMultiSelect: false,
			selectedValue: null,
			showDropdown: false,
			showWeatherDetail: false
		};

		toastr.options = {
			positionClass : 'toast-bottom-right',
			hideDuration: 300,
		};
	}

	handleChange = (value) => {
		this.setState({ selectedValue: value });
	};

	handleChangeWeatherView = e => {
		this.setState({
			isMultiSelect: e.target.value === 'multiple' ? true : false,
			viewType: e.target.value
		});
	};

	onClickWeatherViewNext = () => {
		if (this.state.viewType === '') {
			toastr.options = {
				positionClass : 'toast-bottom-right',
				hideDuration: 300,
			};
			toastr.error('Please select an option to view weather');
		} else {
			this.setState({
				showDropdown: true
			});
		}
	}

	onClickBackFromDropdownComponent = () => {
		this.setState({
			isMultiSelect: false,
			selectedValue: null,
			showDropdown: false,
			viewType: ''
		})
	}

	onClickBackFromDetailsComponent = () => {
		this.setState({
			showDropdown: true,
			showWeatherDetail: false,
			selectedValue: null,
			viewType: ''
		})
	}

	onClickDropdownNext = () => {
		if (this.state.selectedValue) {
			this.setState({
				showWeatherDetail: true,
				showDropdown: false
			});
			if (Array.isArray(this.state.selectedValue)) {
				const value = this.state.selectedValue.map(item => item.value);
				this.props.fetchWeatherDetailsForMultipleCities(value);
			} else {
				this.props.fetchWeatherDetails(this.state.selectedValue);
			}
		} else {
			toastr.error('Please select a city');
		}
	};

	render() {
		return (
			<div className="App">
				{
					!this.state.selectedValue && !this.state.showDropdown
					? (
						<div className="card">
							<div className="select-view">
								<h1>Welcome to Weather App!!!</h1>
								<p>Select if you wish to view weather forecast of single/multiple cities</p>
								<div>
									<div>
										<input type="radio" id="single" name="weatherView" value="single" onChange={this.handleChangeWeatherView} />
										<label htmlFor="single">Single City</label>
									</div>
									<div>
										<input type="radio" id="multiple" name="weatherView" value="multiple" onChange={this.handleChangeWeatherView} />
										<label htmlFor="multiple">Multiple Cities</label>
									</div>
								</div>
								<button onClick={this.onClickWeatherViewNext}>Next</button>
							</div>
						</div>
					)
					: null
				}
				{
					this.state.showDropdown && !this.state.showWeatherDetail
						? <CitiesDropdown 
							cities={UScities} 
							isMultiSelect={this.state.isMultiSelect} 
							onChange={this.handleChange} 
							onClick={this.onClickDropdownNext}
							onClickBack={this.onClickBackFromDropdownComponent} />
						: null
				}
				{
					this.state.showWeatherDetail && !this.state.showDropdown && this.props.weatherData.weatherDetails
						? (
							this.state.isMultiSelect
							? this.props.weatherData.weatherDetails && this.props.weatherData.weatherDetails.length ? <WeatherDetailList 
								data={this.props.weatherData.weatherDetails} 
								onClickBack={this.onClickBackFromDetailsComponent} /> : <img className="loader" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" alt="Loader" />
							: this.props.weatherData.weatherDetails && this.props.weatherData.weatherDetails.location ? <WeatherDetail 
								details={this.props.weatherData.weatherDetails} 
								onClickBack={this.onClickBackFromDetailsComponent} /> : <img className="loader" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" alt="Loader" />
						)
						: null
				}
			</div>
		);
	}
}

const mapStateToProps = ({ weatherDetails }) => ({
	weatherData: weatherDetails
});

const mapDispatchToProps = dispatch => ({
	fetchWeatherDetails: data => dispatch(fetchWeatherDetails(data)),
	fetchWeatherDetailsForMultipleCities: data => dispatch(fetchWeatherDetailsForMultipleCities(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
