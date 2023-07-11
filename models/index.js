const Users = require('./Users');
const Posts = require('./Posts');

Users.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Posts.hasOne(Users, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

module.exports = { Users, Posts };
