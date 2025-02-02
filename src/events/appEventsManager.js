const appEventsManager = (() => {
    const events = {};

    const on = (event, fn) => {
        if (!events[event]) {
            events[event] = [];
        };

        events[event].push(fn);
    };

    const off = (event, fn) => {
        const currEvent = events[event];
        if (currEvent) {
            const i = currEvent.findIndex(currFn => currFn === fn);
            if (i !== -1) currEvent.splice(i, 1);
        };
    };

    const emit = (event, ...arg) => {
        const currEvent = events[event];
        if (currEvent && currEvent.length > 0) {
            currEvent.forEach(fn => fn(...arg));
        };
    };

    return {
        on,
        off,
        emit,
    }
})();

const appEvents = {
    imageUpdated: 'rwetgergfsdfsdf',
    imageDataLoaded: 'daegdfsgdsfdsfs',
    weatherDataUpdated: 'gergvverfsdfdsvc',
    currentWeatherDataLoaded: 'refadscasfdasd',
    weeklyForecastLoaded: 'eterhgfsdfwefcwefc',
    hourlyForecastLoaded: 'tergvsdcdsfsdfvdcsdc',
    locationSelected: 'ewrtwefewfwefw',
    locationUpdated: 'terutyfwcsadwdcwc',
    locationDataLoaded: 'fsdfsdfdsfgsdgvsdcsdc',
    airConditionsLoaded: 'fsdfsdfsdfdsfsdhrturtyh',
}

export { appEvents, appEventsManager };
