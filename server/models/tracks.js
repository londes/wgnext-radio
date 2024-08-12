const mongoose = require('mongoose')

const tracksSchema = new mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    src: {type: String, required: true},
    filename: {type: String, required: true},
    thumbnail: {type: String, required: false}
})

module.exports = mongoose.model('track', tracksSchema)