const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const passport = require('passport')


const app = express()

const users = require('./routes/api/users')

app.use(express.urlencoded({ extended: false }))
app.use(cors())

const PORT = process.env.PORT || 5500

const db = require('./config/keys').mongoURI

app.use('/api/users', users)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

app.use(passport.initialize())
require('./config/passport')(passport)



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))