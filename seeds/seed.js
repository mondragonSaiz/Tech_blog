const usersData = require('./usersData.json');

// Function to seed db
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
