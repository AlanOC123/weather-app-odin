import { appEventsManager, appEvents } from "../events/appEventsManager";
import appState from "../data/appState";

export default (() => {
    const _backgroundElement = document.querySelector('.current-weather-information-container');
    const _root = document.documentElement;

    const renderElement = () => {
        const { source, theme } = appState.getBackgroundImage();
        _backgroundElement.style.backgroundImage = `url(${source})`;
        _root.style.setProperty('--contrast-clr-2', theme);
    };

    appEventsManager.on(appEvents.imageDataLoaded, renderElement);
})();
