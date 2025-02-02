import appState from '../data/appState';
import { appEventsManager, appEvents } from '../events/appEventsManager';
import convertToCelsius from '../helper/convertToCelsius';
import { format } from 'date-fns';
import clearList from '../helper/clearList';
import getWeatherIcon from '../helper/getWeatherIcon';

export default (() => {
    const _sectionElement = document.querySelector('.weekly-forecast');
    const weeklyList = document.querySelector('.weekly-forecast-list');

    const forecastCard = ({ conditions, tempmin, tempmax, datetime }) => {
        const element = document.createElement('div');
        const timeElement = document.createElement('p');
        const wrapperElement = document.createElement('div');
        const iconElement = document.createElement('div');
        const icon = document.createElement('i');
        const tempElement = document.createElement('div');

        element.classList.add('weekly-forecast-card');
        timeElement.classList.add('weekly-forecast-time');
        wrapperElement.classList.add('weekly-forecast-weather-data');
        iconElement.classList.add('icon');
        icon.className = getWeatherIcon(conditions);
        tempElement.classList.add('weekly-forecast-temp');

        timeElement.textContent = format(new Date(datetime), 'EEE');
        iconElement.append(icon);
        tempElement.textContent = `${convertToCelsius(tempmin).toFixed(0)}° / ${convertToCelsius(tempmax).toFixed(0)}°`;

        wrapperElement.append(tempElement, iconElement);
        element.append(timeElement, wrapperElement);

        return element;
    };

    const renderState = () => {
        const weatherData = appState.getWeeklyForecast();
        console.log(weatherData);
        clearList(weeklyList);
        for (let i = 0; i < weatherData.length; i++) {
            const day = weatherData[i];
            const forecastCardElement = forecastCard(day);
            weeklyList.append(forecastCardElement);
        }
    };

    appEventsManager.on(appEvents.weeklyForecastLoaded, renderState);
})()
