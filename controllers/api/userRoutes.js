const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    //console.log('user routes');
    const postDataDB = await Posts.findAll({
      attributes: ['content'],
      include: [
        {
          model: Users,
          attributes: ['username', 'email'],
        },
        {
          model: Comments,
          attributes: ['content', 'date'],
        },
      ],
    });
    console.log('POST1', postDataDB);
    const posts = postDataDB.map((post) => post.get({ plain: true }));

    posts.forEach((post) => {
      console.log('Post:', post.content);
      console.log('User:', post.user.username, post.user.email);

      console.log('Comments:');
      post.comments.forEach((comment) => {
        console.log(comment.content);
      });

      console.log('-----------------------');
    });

    console.log('POST', posts);
    res.render('userhomepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log('dashboard routes');
    const postDataDB = await Posts.findAll({
      where: { user_id: req.session.user_id },
    });
    // // let bully = true;
    // // if (!postDataDB) {
    // //   bully = false;

    // //   res.render('dashboard', { bully });
    // // }
    const posts = postDataDB.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
    // console.log(postDataDB);
    console.log('SEQUALIZED', postDataDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
