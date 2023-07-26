const router = require('express').Router();
const { Posts, Users, Comments } = require('../../models');
const dayjs = require('dayjs');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postDataDB = await Posts.findAll({
      include: [
        {
          model: Users,
          attributes: ['username', 'email', 'id'],
        },
        {
          model: Comments,
          attributes: ['content', 'dateOfCreation'],
          include: [
            {
              model: Users, // Include the Users model again for the referenced user
              attributes: ['username'], // Include only the 'username' attribute
            },
          ],
        },
      ],
    });
    const posts = postDataDB.map((post) => post.get({ plain: true }));
    const userID = req.session.user_id;

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
    const now = dayjs().format('MM/DD/YYYY');

    const date = '30/08/98';

    const titulo = 'titulo 1';
    const newPostDB = await Posts.create({
      title: req.body.title,
      content: req.body.content,
      dateOfCreation: now,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPostDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postDataDB = await Posts.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: Users,
          attributes: ['username', 'email', 'id'],
        },
        {
          model: Comments,
          attributes: ['content', 'dateOfCreation'],
          include: [
            {
              model: Users, // Include the Users model again for the referenced user
              attributes: ['username'], // Include only the 'username' attribute
            },
          ],
        },
      ],
    });

    const posts = postDataDB.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: req.session.logged_in });
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

router.post('/addComment', withAuth, async (req, res) => {
  try {
    const now = dayjs().format('MM-DD-YYYY');

    const commentDataDB = await Comments.create({
      content: req.body.content,
      dateOfCreation: now,
      post_id: req.body.post_id,
      user_id: req.session.user_id,
    });

    res.status(200).json(commentDataDB);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;

  try {
    const post = await Posts.findByPk(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update the post's title and content
    await post.update({
      title: title,
      content: content,
    });

    return res.status(200).json({ message: 'Post updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
