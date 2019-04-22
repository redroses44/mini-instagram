const Validator = require('validator')
const isEmpty = require('../utils/is-empty')

const validateRegister = data => {
  let errors = {}

  data.name = !isEmpty(data.name) ? data.name : ''
  data.username = !isEmpty(data.username) ? data.username : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''
  data.email = !isEmpty(data.email) ? data.email : ''


  if (Validator.isEmpty(data.name) || Validator.isEmpty(data.username) || Validator.isEmpty(data.password) || Validator.isEmpty(data.password2) || Validator.isEmpty(data.email)) {
    errors.fields = 'All fields are required.'
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid email.'
  }

  if (!Validator.isLength(data.password, { min: 6, max: 50 })) {
    errors.password = 'Password needs to be between 6 and 50 characters long.'
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password are not matching.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateRegister
