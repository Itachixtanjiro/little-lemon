// webpack.config.js
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets/'),
        },
    },
    // ... other config
};
