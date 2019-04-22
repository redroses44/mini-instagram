const Validator = require('validator')
const isEmpty = require('../utils/is-empty')

const validateLogin = data => {
  let errors = {}

  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''

  if (Validator.isEmpty(data.username) || Validator.isEmpty(data.password)) {
    errors.fields = 'All fields are required.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateLogin
