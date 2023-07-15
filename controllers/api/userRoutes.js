const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postDataDB = await Posts.findAll({
      attributes: ['content', 'id'],
      include: [
        {
          model: Users,
          attributes: ['username', 'email', 'id'],
        },
        {
          model: Comments,
          attributes: ['content', 'date'],
        },
      ],
    });
    const posts = postDataDB.map((post) => post.get({ plain: true }));
    const userID = req.session.user_id;
    console.log('USER ID', userID);

    console.log('POST', posts);
    res.render('userhomepage', {
      posts,
      logged_in: req.session.logged_in,
      userID,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/addPost', withAuth, async (req, res) => {
  try {
    const date = '30/08/98';
    console.log('IN ADDPOST ENDPOINT');
    console.log(req.body);

    const newPostDB = await Posts.create({
      content: req.body.content,
      date: date,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    console.log('dashboard routes');
    console.log(req.session.user_id);
    const postDataDB = await Posts.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Comments,
          attributes: ['content', 'date'],
        },
      ],
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

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postsDataDB = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postsDataDB) {
      res.status(404).json({ message: 'No posts found with this id!' });
      return;
    }

    res.status(200).json(postsDataDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
