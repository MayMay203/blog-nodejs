const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Test = new Schema({
  name: { type: String, default: '', maxLength: 255 },
  number: { type: Number, default: 0 },
})

module.exports = mongoose.model('Test', Test, 'test')
