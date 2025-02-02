export default (humidityValue) => {
    if (!humidityValue) {
        console.error('No humidity value given', humidityValue);
        return null;
    };

    if (typeof humidityValue !== 'number') {
        console.error('Invalid humidity value given', humidityValue);
        return null;
    };

    const testValue = Math.floor(humidityValue);

    const map = {
        'None': () => testValue === 0,
        'Very Low': () => testValue <= 20,
        'Low': () => testValue > 20 && testValue <= 40,
        'Medium': () => testValue > 40 && testValue <= 60,
        'High': () => testValue > 60 && testValue <= 80,
        'Very High': () => testValue > 80
    };

    for (const key in map) {
        if (map[key]()) return key
    };
}
