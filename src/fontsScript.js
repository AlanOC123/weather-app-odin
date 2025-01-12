const head = document.head;

const preConnectAPI = document.createElement('link');
const preConnectGateway = document.createElement('link');

preConnectAPI.href = 'https://fonts.googleapis.com';
preConnectGateway.href = 'https://fonts.gstatic.com';

preConnectAPI.rel = preConnectGateway.rel = 'preconnect';

preConnectGateway.crossOrigin = true;

const robotoScript = document.createElement('link');
robotoScript.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap';
robotoScript.rel = 'stylesheet';

head.append(preConnectAPI, preConnectGateway, robotoScript);