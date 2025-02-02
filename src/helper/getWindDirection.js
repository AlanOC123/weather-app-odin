export default (windDirection) => {
    if (!windDirection) {
        console.error('No wind direction value given', windDirection);
        return null;
    };

    if (typeof windDirection !== 'number') {
        console.error('Invalid wind direction value given', windDirection);
        return null;
    };

    const dirValues = [
        'North', 'North North-East', 'North-East', 'East North-East',
        'East', 'East South-East', 'South-East', 'South South-East',
        'South', 'South South-West', 'South-West', 'West South-West',
        'West', 'West North-West', 'North-West', 'North North-West',
    ];

    return dirValues[Math.floor(((windDirection + 11.25) % 360) / 22.5)]
}
