import { appEventsManager, appEvents } from "../events/appEventsManager";
import { addHours } from "date-fns";
import getWeatherIcon from '../helper/getWeatherIcon';
import convertToCelsius from "../helper/convertToCelsius";
import getHumidityText from '../helper/getHumidityText';
import getWindDirection from "../helper/getWindDirection";
import convertWindSpeed from "../helper/convertWindSpeed";

export default (() => {

    const _TODAY = new Date();

    const appData = {
        location: {
            name: null,
            coordinates: { longitude: null, latitude: null },
        },
        currentWeatherInfo: {
            conditions: '',
            precipprob: 0,
            temp: 0,
        },
        currentAirConditions: {
            feelslike: 0,
            humidity: 0,
            windspeed: 0,
            winddir: 0,
        },
        hourlyForecastData: [],
        weekForecast: [],
        imageData: [],
    };

    const setLocation = (locationData) => {
        if (!locationData || Object.keys(locationData).length === 0) {
            throw new Error("Invalid Location Data", locationData);
        };

        appData.location = { ...locationData };
        appEventsManager.emit(appEvents.locationDataLoaded);
    };

    const setCurrentWeatherData = ({ latitude, longitude, currentConditions }) => {
        if (!latitude || !longitude || Object.keys(currentConditions).length === 0) {
            console.error('Invalid weather data provided', latitude, longitude, currentConditions);
        };

        appData.location.coordinates.latitude = latitude;
        appData.location.coordinates.longitude = longitude;
        const { conditions, precipprob, temp } = currentConditions;
        const { currentWeatherInfo } = appData;
        currentWeatherInfo.conditions = conditions;
        currentWeatherInfo.precipprob = precipprob;
        currentWeatherInfo.temp = temp;
        appEventsManager.emit(appEvents.currentWeatherDataLoaded);
    };

    const setImageSrc = ({ photos }) => {
        if (!photos) {
            console.error('Not photos provided', photos);
            return;
        }
        appData.imageData = photos.map(photo => ({ source: photo.src.original, theme: photo.avg_color }));
        appEventsManager.emit(appEvents.imageDataLoaded);
    }

    const setWeeklyForecast = ({ days }) => {
        appData.weekForecast = [];
        const { weekForecast } = appData;
        for (let i = 1; i < days.length; i++) {
            const currentDay = days[i];
            const { conditions, tempmin, tempmax, datetime } = currentDay;
            const dayWeatherInfo = {
                conditions,
                tempmin,
                tempmax,
                datetime
            };
            weekForecast.push(dayWeatherInfo);
        }

        appEventsManager.emit(appEvents.weeklyForecastLoaded);
    }

    const setAirConditions = ({ currentConditions }) => {
        const { feelslike, humidity, winddir, windspeed } = currentConditions;
        const { currentAirConditions } = appData;
        currentAirConditions.feelslike = feelslike;
        currentAirConditions.humidity = humidity;
        currentAirConditions.winddir = winddir;
        currentAirConditions.windspeed = windspeed;
        console.log(1);
        appEventsManager.emit(appEvents.airConditionsLoaded);
    }

    const setHourlyForecast = ({ days }) => {
        const [ today ] = days;
        const { hours } = today;
        const start = _TODAY.getHours();
        const end = addHours(_TODAY, 6).getHours();

        appData.hourlyForecastData = hours.filter(({ datetime }) => {
            const hourValue = Number(datetime.split(':')[0]);
            return hourValue > start && hourValue <= end;
        }).map(({ conditions, temp, datetime }) =>
            ({ conditions, temp, time: datetime.split(':').splice(0, 2).join(':') })
        );
        appEventsManager.emit(appEvents.hourlyForecastLoaded);
    }

    appEventsManager.on(appEvents.locationUpdated, setLocation);
    appEventsManager.on(appEvents.weatherDataUpdated, setCurrentWeatherData);
    appEventsManager.on(appEvents.weatherDataUpdated, setWeeklyForecast);
    appEventsManager.on(appEvents.weatherDataUpdated, setAirConditions);
    appEventsManager.on(appEvents.weatherDataUpdated, setHourlyForecast);
    appEventsManager.on(appEvents.imageUpdated, setImageSrc);

    return {
        getLocation: () => appData.location,
        getCurrentWeather: () => {
            const { temp, conditions, precipprob } = appData.currentWeatherInfo;
            return {
                convertedTemp: convertToCelsius(temp).toFixed(0),
                weatherIcon: getWeatherIcon(conditions),
                chanceOfRain: precipprob.toFixed(0),
                conditions
            }
        },
        getBackgroundImage: () => {
            const { imageData } = appData
            const i = Math.floor(Math.random() * imageData.length);
            return imageData[i];
        },
        getAirConditions: () => {
            const { feelslike, humidity, winddir, windspeed } = appData.currentAirConditions;
            return {
                convertedFeelsLike: convertToCelsius(feelslike).toFixed(0),
                convertedHumidity: getHumidityText(humidity),
                convertedWindDirection: getWindDirection(winddir),
                convertedWindSpeed: convertWindSpeed(windspeed).toFixed(1),
            }
        },
        getHourlyForecast: () => appData.hourlyForecastData,
        getWeeklyForecast: () => appData.weekForecast,
    }
})()
