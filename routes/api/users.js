const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport');

const validateRegister = require('../../validation/register')
const validateLogin = require('../../validation/login')

const User = require('../../models/User')

const keys = require('../../config/keys')


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

router.post('/login', ((req, res) => {
  const { errors, isValid } = validateLogin(req.body)
  const { username, password } = req.body

  if (!isValid) {
    return res.json(400, errors)
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        errors.username = 'Username does not exist.'
        return res.json(404, errors)
      }

      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              username: user.username
            }

            jwt
              .sign(payload,
                keys.secretOrKey, {
                  expiresIn: 3600
                }, (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  })
                })
          } else {
            errors.password = 'Invalid password.'
            return res.json(400, errors)
          }
        })
    })
}))

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log(req.user)
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      username: req.user.username
    })
  }
)

module.exports = router