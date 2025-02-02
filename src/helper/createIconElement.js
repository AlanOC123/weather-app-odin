export default (iconClass) => {
    if (!iconClass) {
        console.error('No icon class given', iconClass);
    };

    const element = document.createElement('i');
    element.className = iconClass;
    return element;
}
