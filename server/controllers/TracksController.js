const ObjectId = require('mongoose').Types.ObjectId
const Tracks = require('../models/tracks')

class TracksController {
    async getAll (req, res) {
        try {
            let tracks = await Tracks.find({})
            res.send(tracks)
        } catch(e) {
            console.log(e)
        }
    }
}

module.exports = new TracksController()