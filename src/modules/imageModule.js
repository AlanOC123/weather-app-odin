import getImageSearchRequest from '../helper/getImageSearchQuery';
import { appEventsManager, appEvents } from '../events/appEventsManager';
import appState from '../data/appState';
import { createClient } from 'pexels';

export default (() => {
    const _KEY = process.env.PEXELS;
    const PER_PAGE = 5;
    const _ORIENTATION = 'landscape';
    const _SIZE = 'large';
    const _CLIENT = createClient(_KEY);

    const _getImageSearch = () => {
        const { conditions } = appState.getCurrentWeather();
        if (!conditions) {
            console.error('Invalid weather condition', conditions);
            return;
        };

        return getImageSearchRequest(conditions);
    };

    const setImageData = async () => {
        try {
            const imageQuery = _getImageSearch();
            const imageData = await _CLIENT.photos.search({ query: imageQuery, per_page: PER_PAGE, size: _SIZE, orientation: _ORIENTATION});
            if (imageData.error) {
                throw new Error(imageData.error);
            };
            appEventsManager.emit(appEvents.imageUpdated, imageData);
        } catch (error) {
            console.error("Error getting data from image API", error);
        }
    };

    appEventsManager.on(appEvents.currentWeatherDataLoaded, setImageData);
})()
