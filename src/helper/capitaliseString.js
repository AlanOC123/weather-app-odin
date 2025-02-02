export default (stringValue) => {
    if (!stringValue) {
        console.error('No string given', stringValue);
        return null;
    };

    if (typeof stringValue !== 'string') {
        console.error('Invalid type', stringValue);
        return null;
    }
    return stringValue.charAt(0).toUpperCase() + stringValue.substring(1);
}
