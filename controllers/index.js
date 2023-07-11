const route = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
route.use('/', homeRoutes);
route.use('/api', apiRoutes);

module.exports = route;
