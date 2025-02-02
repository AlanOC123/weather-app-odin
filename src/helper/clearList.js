export default (parentElement) => {
    if (!parentElement) {
        console.error('No list element given', parentElement);
        return;
    };

    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    };
}
