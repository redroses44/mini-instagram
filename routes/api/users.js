const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

const validateRegister = require('../../validation/register')

const User = require('../../models/User')


router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegister(req.body)
  const { name, username, email, password } = req.body

  if (!isValid) {
    return res.json(400, errors)
  }

  User.findOne({ username: req.body.username })
    .then(user => {
      if (user) {
        errors.username = 'Username already exists.'
        return res.json(400, errors)
      }
      else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        })

        const newUser = new User({
          name,
          username,
          email,
          password
        })

        bcrypt.genSalt(15, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err
            newUser.password = hash
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err))
          })
        })
      }
    })
})

module.exports = router