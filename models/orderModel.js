const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  user: {
    type: Object,
    required: true
  },
  items: {
    type: Object,
    required: true
  }

}, { timestamps: true })

module.exports = mongoose.model("Order", orderSchema)