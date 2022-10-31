const router = require('express').Router();
const { User, Blog } = require('../../models');

router.post('/', async (req,res) => {
    try{ 
        const dbBlogData = await Blog.create({
            title: req.body.title,
            post_body: req.body.post_body,
            creator_id: req.session.user_id,
        });

        res.status(200).json(dbBlogData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', (req,res) => {
  Blog.update(
    {
      // All the fields you can update and the data attached to the request body.
      title: req.body.title,
      post_body: req.body.post_body,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedBlog) => {
      // Sends the updated Blog as a json response
      res.json(updatedBlog);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req,res) => {
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedBlog) => {
      res.json(deletedBlog);
    })
    .catch((err) => res.json(err));
})

module.exports = router;