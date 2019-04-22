const express = require('express')
const mongoose = require('mongoose')

const app = express()

const users = require('./routes/api/users')

const PORT = process.env.PORT || 5500

const db = require('./config/keys').mongoURI

app.use('/api/users', users)

mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))