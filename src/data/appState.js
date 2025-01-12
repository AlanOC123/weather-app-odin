export default (() => {
  const appData = {
    currentLocation: null,
    currentLongitude: null,
    currentLatitude: null,
    currentTemperature: null,
    currentAirCondition: null,
    currentBackground: null,
    currentTheme: null,
  };

  const setBackground = () => {
    if (!appData.currentBackground) return;

    const mainSection = document.querySelector('main');
    mainSection.style.backgroundImage = `url(${appData.currentBackground})`;
  }

  return {
    setLocation: (newLocationString) =>
    {
        if (!newLocationString || typeof newLocationString !== 'string')
        {
            console.error('Invalid Location given', newLocationString);
            return;
        };

        appData.currentLocation = newLocationString;
    },
    setLongitude: (newCoordinate) =>
    {
        if (!newCoordinate || typeof newCoordinate !== 'string')
        {
            console.error('Invalid Location given', newCoordinate);
            return;
        };

        appData.currentLongitude = newCoordinate;
    },
    setLatitude: (newCoordinate) =>
    {
        if (!newCoordinate || typeof newCoordinate !== 'string')
        {
            console.error('Invalid Location given', newCoordinate);
            return;
        };

        appData.currentLatitude = newCoordinate;
    },
    setTemperature: (newTemp) =>
    {
        if (!newTemp || typeof newTemp !== 'string')
        {
            console.error('Invalid Location given', newTemp);
            return;
        };

        appData.currentTemperature = newTemp;
    },
    setTemperature: (newTemp) =>
    {
        if (!newTemp || typeof newTemp !== 'string')
        {
            console.error('Invalid Location given', newTemp);
            return;
        };

        appData.currentTemperature = newTemp;
    },
    setBackground: (newSrc) =>
    {
        if (!newSrc || typeof newSrc !== 'string')
        {
            console.error('Invalid Location given', newSrc);
            return;
        };

        appData.currentBackground = newSrc;
        console.log(appData);
        setBackground();
    },
    setTheme: (newTheme) =>
    {
        if (!newTheme || typeof newTheme !== 'string')
        {
            console.error('Invalid Location given', newTheme);
            return;
        };

        appData.currentTheme = newTheme;
        console.log(appData);
    },
    getLocation: () => appData.currentLocation,
    getLongitude: () => appData.currentLongitude,
    getLatitude: () => appData.currentLatitude,
    getTemperature: () => appData.currentTemperature,
    getAirCondition: () => appData.currentAirCondition,
    getBackground: () => appData.currentBackground,
    getTheme: () => appData.currentTheme,
  }
})()
