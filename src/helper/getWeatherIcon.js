const conditionsMap = {
    sunny: ['sunny', 'clear', 'hot'],
    cloudy: ['overcast', 'partly cloudy'],
    rainy: ['rain', 'rainy', 'showers', 'drizzle'],
    snowy: ['snowy', 'blizzard', 'flurries'],
    stormy: ['stormy', 'thunderstorm', 'lightning'],
    partiallyCloudy: ['partially', 'part cloud', 'mostly dry'],
}

const iconMap = {
    cloudy: 'fa-solid fa-cloud',
    rainy: 'fa-solid fa-cloud-rain',
    sunny: 'fa-solid fa-sun',
    snowy: 'fa-solid fa-snowflake',
    stormy: 'fa-solid fa-cloud-showers-heavy',
    partiallyCloudy: 'fa-solid fa-cloud-sun'
}

const getWeatherIcon = (testString) => {
    if (!testString) throw new Error("String not provided", testString);
    if (typeof testString !== 'string') throw new Error("Invalid type provided", typeof testString);

    const query = testString.toLowerCase();

    for (const [ key, conditions ] of Object.entries(conditionsMap)) {
        if (conditions.some(condition => query.includes(condition.toLowerCase()))) {
            return iconMap[key];
        }
    }
}

export default getWeatherIcon;
