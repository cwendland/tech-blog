const sequelize = require('../config/connection');
const { User, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of blogData) {
    const user = users[Math.floor(Math.random() * users.length)];
    await Blog.create({
      ...post,
      creator_id: user.id,
      creator_name: user.name, 
    });
  }

  process.exit(0);
};

seedDatabase();
