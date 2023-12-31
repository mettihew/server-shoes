const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cart:{
    type: [],
    default: undefined
  }, 
  token: {
    type: String,
  }
})

module.exports = mongoose.model('User', userSchema)