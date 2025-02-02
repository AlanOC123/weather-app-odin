import appState from '../data/appState';
import { format, addDays } from 'date-fns';
import { appEventsManager, appEvents } from '../events/appEventsManager';

export default (() => {
    const _KEY = process.env.VISUAL_WEATHER;
    const _TODAY = new Date();
    const _DATE_FORMAT = 'yyyy-MM-dd';
    const _FORECAST_LENGTH = 7;
    const _URL_BASE = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'

    const _getURL = () => {
        const { name, coordinates } = appState.getLocation();
        const location = name !== 'Current Location' ? name : `${coordinates.latitude},${coordinates.longitude}`;
        const startDate = format(_TODAY, _DATE_FORMAT);
        const endDate = format(addDays(_TODAY, _FORECAST_LENGTH), _DATE_FORMAT);

        return `${_URL_BASE}/${location}/${startDate}/${endDate}?key=${_KEY}`;
    };

    const getWeatherData = async () => {
        const response = await fetch(_getURL(), { mode: 'cors' });
        if (response.ok) return response.json();
        const error = new Error(`Invalid request to weather API: ${response.status}`);
        error.status = response.status;
        throw error;
    };

    const setWeatherData = async () => {
        try {
            const weatherData = await getWeatherData();
            appEventsManager.emit(appEvents.weatherDataUpdated, weatherData);
        } catch (error) {
            console.error("Error getting data from weather API", error);
            const dataPayload = {
                source: 'default',
                locationText: null,
            };
            appEventsManager.emit(appEvents.locationSelected, dataPayload);
        }
    }

    appEventsManager.on(appEvents.locationDataLoaded, setWeatherData);
})()
