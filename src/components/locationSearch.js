import { appEventsManager, appEvents } from "../events/appEventsManager";

export default (() => {
    const _sectionElement = document.querySelector('.location-search');
    const _searchBar = _sectionElement.querySelector('#location-search-input');
    const _searchButton = _sectionElement.querySelector('#search-button');
    const _currentLocationButton = _sectionElement.querySelector('#current-location');

    const searchLocation = () => {
        const dataPayload = {
            source: 'default',
            locationText: null,
        };

        if (!_searchBar) {
            console.error('Input not found', _searchBar);
        } else if (!_searchBar.value) {
            console.error('No input given, reverting to machine loaded coordinates', target.value);
        } else {
            dataPayload.source = 'user';
            dataPayload.locationText = _searchBar.value;
        };

        appEventsManager.emit(appEvents.locationSelected, dataPayload);
        _searchBar.value = '';
    };

    _searchButton.onclick = searchLocation;
    _currentLocationButton.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        appEventsManager.emit(appEvents.locationSelected, {
            source: 'default',
            locationText: null,
    })
    }
})()
