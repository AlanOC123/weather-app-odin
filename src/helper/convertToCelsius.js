export default (farenheitValue) => {
    if (!farenheitValue || typeof farenheitValue !== 'number') {
        console.error('Invalid value for conversion');
        return null;
    };

    return (farenheitValue - 32) * 5/9;
}
