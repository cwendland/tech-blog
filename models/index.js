const User = require('./User');
const Comment = require('./Comment');
const Blog = require('./Blog');

Blog.belongsTo(User, {
  foreignKey: 'creator_id',
});

User.hasMany(Blog, {
  foreignKey: 'creator_id',
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});


module.exports = { User, Blog, Comment };
