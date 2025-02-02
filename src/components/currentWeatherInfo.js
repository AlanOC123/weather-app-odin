import appState from "../data/appState";
import { appEventsManager, appEvents } from "../events/appEventsManager";
import createIconElement from '../helper/createIconElement';

export default (() => {
    const _sectionElement = document.querySelector('.current-weather-overview');
    const _currentWeatherContainer = _sectionElement.querySelector('.current-weather-information-container');
    const _currentLocationName = _currentWeatherContainer.querySelector('.current-location-name');
    const _currentRainChance = _currentWeatherContainer.querySelector('.precip-chance-data');
    const _currentTemperatureReading = _currentWeatherContainer.querySelector('.current-temperature-reading');
    const _weatherIcon = _currentWeatherContainer.querySelector('.icon');

    const renderState = () => {
        const { name } = appState.getLocation();
        const { convertedTemp, weatherIcon, chanceOfRain } = appState.getCurrentWeather();
        _currentLocationName.textContent = name;
        _currentRainChance.textContent = chanceOfRain;
        _currentTemperatureReading.textContent = convertedTemp;
        const currentIcon = _weatherIcon.querySelector('i');
        if (currentIcon) currentIcon.replaceWith(createIconElement(weatherIcon));
    }

    appEventsManager.on(appEvents.currentWeatherDataLoaded, renderState);
})()
