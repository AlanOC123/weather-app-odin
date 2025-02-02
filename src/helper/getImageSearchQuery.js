const conditionsMap = {
    sunny: ['sunny', 'clear', 'hot'],
    cloudy: ['cloudy', 'overcast', 'partly cloudy'],
    rainy: ['rainy', 'showers', 'drizzle'],
    snowy: ['snowy', 'blizzard', 'flurries'],
    stormy: ['stormy', 'thunderstorm', 'lightning'],
}

const queryMap = {
    cloudy: 'mountain range under overcast sky',
    rainy: 'rain drops',
    sunny: 'field under sunny sky',
    snowy: 'landscape photography of snow pathway between trees during winter',
    stormy: 'lightning and gray clouds',
}

const getImageSearchQuery = (testString) => {
    if (!testString) throw new Error("String not provided", testString);
    if (typeof testString !== 'string') throw new Error("Invalid type provided", typeof testString);
    const query = testString.toLowerCase();

    for (const [ key, conditions ] of Object.entries(conditionsMap)) {
        if (conditions.some(keyword => query.includes(keyword.toLowerCase()))) {
            return queryMap[key]
        }
    }

    return null
};

export default getImageSearchQuery;
