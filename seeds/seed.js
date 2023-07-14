const sequelize = require('../config/connection');
const usersData = require('./userData.json');
const postsData = require('./postData.json');
const commentData = require('./commentData.json');
const { Users, Posts, Comments } = require('../models');

// Function to seed db
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Posts.bulkCreate(postsData, {
    individualHooks: true,
    returning: true,
  });
  const comments = await Comments.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
