const router = require('express').Router();
const { Users } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage');
});

router.post('/signup', async (req, res) => {
  try {
    const newUserDB = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = newUserDB.username;
      req.session.user_id = newUserDB.id;

      res.status(200).json(newUserDB);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const existingUserDB = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!existingUserDB) {
      res.status(400).json({
        message: 'Sorry could not find a user with the email provided',
      });
    }

    const validPassword = existingUserDB.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    }
    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user = existingUserDB.username;
      req.session.user_id = existingUserDB.id;

      res
        .status(200)
        .json({ user: existingUserDB, message: 'You are now logged in' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
