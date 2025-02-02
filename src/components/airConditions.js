import { appEventsManager, appEvents } from "../events/appEventsManager";
import appState from "../data/appState";

export default (() => {
    const _sectionElement = document.querySelector('.current-air-conditions');
    const feelsLikeReading = _sectionElement.querySelector('#feels-like-temperature-data');
    const humidityReading = _sectionElement.querySelector('#humidity-data');
    const windSpeedReading = _sectionElement.querySelector('#wind-speed-data');
    const windDirectionReading = _sectionElement.querySelector('#wind-direction-data');

    const renderState = () => {
        const {
            convertedFeelsLike,
            convertedHumidity,
            convertedWindDirection,
            convertedWindSpeed
        } = appState.getAirConditions();

        feelsLikeReading.textContent = convertedFeelsLike;
        humidityReading.textContent = convertedHumidity;
        windSpeedReading.textContent = convertedWindSpeed;
        windDirectionReading.textContent = convertedWindDirection;
    };

    appEventsManager.on(appEvents.airConditionsLoaded, renderState);
})()
