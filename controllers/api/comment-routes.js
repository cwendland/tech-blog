const router = require('express').Router();
const { Comment, User } = require('../../models');

router.post('/', async (req,res) => {
    try{ 
        const dbUserData = await User.findOne({
          where: {
            id: req.session.user_id,
          },
        });
        const dbCommentData = await Comment.create({
            comment_body: req.body.comment_body,
            blog_id: req.body.blog_id,
            creator_name: dbUserData.name,
        });

        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put('/:id', (req,res) => {
  Comment.update(
    {
      // All the fields you can update and the data attached to the request body.
      comment_body: req.body.comment_body,
    },
    {
      // Gets the books based on the isbn given in the request parameters
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedComment) => {
      // Sends the updated Comment as a json response
      res.json(updatedComment);
    })
    .catch((err) => res.json(err));
});

router.delete('/:id', (req,res) => {
  Comment.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedComment) => {
      res.json(deletedComment);
    })
    .catch((err) => res.json(err));
})

module.exports = router;