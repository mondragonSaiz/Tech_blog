const router = require('express').Router();
const { Posts, Users } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const { user } = req.session;
    console.log('user routes');
    const postDataDB = await Posts.findAll({
      attributes: ['content'],
      include: [
        {
          model: Users,
          attributes: ['username', 'email'],
        },
      ],
    });
    console.log('POST1', postDataDB);
    const posts = postDataDB.map((post) => post.get({ plain: true }));
    console.log('POST', posts);
    res.render('userhomepage', {
      posts,
      logged_in: req.session.logged_in,
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
