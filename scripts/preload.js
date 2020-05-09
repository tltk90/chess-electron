// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
    const path = require('path');
    const head = document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = path.join(__dirname, '..', 'styles', 'main.css');
    link.media = 'all';
    head.appendChild(link);
});

process.once('loaded', () => {
    global.requireValidator = require('./validator').default;
    global.requireUtils = require('./utils');
    global.requirePieces = require('./pieces');
});
