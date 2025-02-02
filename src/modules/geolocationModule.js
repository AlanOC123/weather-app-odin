import { appEventsManager, appEvents } from "../events/appEventsManager";
import capitaliseString from "../helper/capitaliseString";

export default (() => {

    const setDefaultLocation = () => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
            const dataPayload = {
                name: 'Current Location',
                coordinates: {
                    longitude: coords.longitude,
                    latitude: coords.latitude
                }
            };
            console.log(dataPayload);
            appEventsManager.emit(appEvents.locationUpdated, dataPayload);
        },
        error => { throw new Error("Error setting location", error) });
    };

    const setUserGivenLocation = (locationData) => {

        if (!locationData) {
            console.error('Location Data not given', locationData);
            setDefaultLocation();
            return;
        };

        if (locationData.source === 'default') {
            setDefaultLocation();
            return;
        };

        const { locationText } = locationData;

        const tokenArray = locationText.split(' ');

        for (let i = 0; i < tokenArray.length; i++) {
            const token = tokenArray[i];
            tokenArray[i] = capitaliseString(token);
        }

        const newToken = tokenArray.join(' ');
        const dataPayload = {
            name: newToken,
            coordinates: {
                longitude: null,
                latitude: null
            }
        }
        appEventsManager.emit(appEvents.locationUpdated, dataPayload);
    }

    setDefaultLocation();
    appEventsManager.on(appEvents.locationSelected, setUserGivenLocation);
})();
