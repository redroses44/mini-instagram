const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  facebookId: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  following: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  images: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      file: {
        type: String,
        required: true
      },
      caption: {
        type: String
      },
      likes: [
        {
          user: {
            type: Schema.Types.ObjectId
          }
        }
      ],
      comments: [
        {
          user: {
            type: Schema.Types.ObjectId
          },
          text: {
            type: String
          }
        }
      ]
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('users', UserSchema)