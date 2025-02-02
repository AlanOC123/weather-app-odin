import clearList from "../helper/clearList";
import convertToCelsius from "../helper/convertToCelsius";
import getWeatherIcon from "../helper/getWeatherIcon";
import { appEventsManager, appEvents } from "../events/appEventsManager";
import appState from "../data/appState";

export default (() => {
    const _sectionElement = document.querySelector('.hourly-forecast');
    const hourlyList = _sectionElement.querySelector('.hourly-forecast-list');

    const forecastCard = ({ conditions, temp, time }) => {
        const element = document.createElement('div');
        const timeElement = document.createElement('p');
        const wrapperElement = document.createElement('div');
        const iconElement = document.createElement('div');
        const icon = document.createElement('i');
        const tempElement = document.createElement('p');

        element.classList.add('hourly-forecast-card');
        timeElement.classList.add('hourly-forecast-time');
        wrapperElement.classList.add('hourly-forecast-weather-data');
        iconElement.classList.add('icon');
        icon.className = getWeatherIcon(conditions);
        tempElement.classList.add('hourly-forecast-temp');

        timeElement.textContent = time;
        iconElement.append(icon);
        tempElement.textContent = `${convertToCelsius(temp).toFixed(0)}°`;

        wrapperElement.append(tempElement, iconElement);
        element.append(timeElement, wrapperElement);

        return element;
    };

    const renderState = () => {
        clearList(hourlyList);
        const forecastData = appState.getHourlyForecast();

        for (let i = 0; i < forecastData.length; i++) {
            const hourData = forecastData[i];
            const forecastCardElement = forecastCard(hourData);
            hourlyList.append(forecastCardElement);
        }
    };

    appEventsManager.on(appEvents.hourlyForecastLoaded, renderState);
})()
