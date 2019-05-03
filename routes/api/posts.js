const express = require('express')
const router = express.Router()

const passport = require('passport')

const Post = require('../../models/Post')
const validatePost = require('../../validation/post')

const User = require('../../models/User')

router.post('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { isValid, errors } = validatePost(req.body)
  if (!isValid) {
    return res.json(400, errors)
  }
  const user = await User.findById(req.params.id)

  const newPost = new Post({
    file: req.file,
    caption: req.body.caption
  })
  await user.images.push(newPost)
  await user.save()
  await newPost.save()
  await res.json(user)
})


module.exports = router