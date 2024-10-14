const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    _id: false,
    timestamps: true,
  },
)

// Add plugin
mongoose.plugin(slug)
Course.plugin(AutoIncrement);//Mặc định là áp dụng cho trường id
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true })

module.exports = mongoose.model('Course', Course)
