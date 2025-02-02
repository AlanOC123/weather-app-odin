export default (windValue) => {
    if (!windValue) {
        console.log('No value given for conversion', windValue);
        return null;
    };

    if (typeof windValue !== 'number') {
        console.log('Invalid value given for conversion', windValue);
        return null;
    };

    return windValue * 1.61034;
}
