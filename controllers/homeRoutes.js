const route = require('express').Router();

route.get('/', (req, res) => {
  res.render('homepage');
});



module.exports = route;
