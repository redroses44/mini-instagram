const Validator = require('validator')
const isEmpty = require('../utils/is-empty')

const validatePost = data => {
  let errors = {}

  data.file = !isEmpty(data.file) ? data.file : ''


  if (Validator.isEmpty(data.file)) {
    errors.file = 'File is required.'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validatePost
