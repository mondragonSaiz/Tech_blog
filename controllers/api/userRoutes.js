const route = require('express').Router();

route.get('/', (req, res) => {
  console.log('user routes');
});

module.exports = route;
