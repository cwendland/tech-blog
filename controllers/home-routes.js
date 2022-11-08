const router = require('express').Router();
const { User, Comment, Blog } = require('../models');

//GET all blog route for the homepage
router.get('/', async (req,res) => {
    try {
    const dbBlogData = await Blog.findAll();

    const blogPosts = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.loggedIn 
    });
    //res.json(blogPosts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET one blog post
router.get('/posts/:id', async (req, res) => {
  try {
    const dbPostData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
        },
      ],
    });

    const post = dbPostData.get({ plain: true });
    res.render('single-post', {
      post,
      logged_in: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//GET one user
router.get('/dashboard', async(req,res) => {
    try{
        const dbUserData = await User.findByPk(req.session.user_id, {
            include: [
                {
                    model: Blog,
                    include: [Comment],
                },
            ],
        });

        const user = dbUserData.get({plain:true});
        console.log(user);
        res.render('dashboard', user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;