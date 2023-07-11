const route = require('express').Router();
const userRoutes = require('./userRoutes');

route.use('/user', userRoutes);

module.exports = route;
