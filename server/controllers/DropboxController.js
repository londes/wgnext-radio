const ObjectId = require('mongoose').Types.ObjectId
const Tracks = require('../models/tracks')

class DropboxController {

    async getAll (req, res) {
        try {
            let tracks = await Tracks.find({})
            res.send(tracks)
        } catch(e) {
            console.log(e)
        }
    }

    async add ({artist, title, src}, res) {
        console.log(req)
        try {
            let match = await Tracks.find({title})
            match.length > 0 
                ? res.send({ok: true, data: `WARNING: matching track with title ${req.body.title} already exists in tracks db`})
                : (async function addTrack(){
                    try {
                        let {title, artist, src} = req.body
                        await Tracks.create({title: title, artist: artist, src: src})
                        res.send({ok: true, data: `track ${title} by ${artist} successfully added`})
                    } catch(e) {
                        console.log(e)
                        res.send({ok: true, data: `ERROR: could not add track due to missing required field`})
                    }
                })()
        } catch (e) {
            console.log(e)
        }
    }

    async update (req, res) {
        try {
            let { old_track, new_track } = req.body
            let match = await Tracks.findOneAndUpdate({title: old_track.title}, {$set: new_track})
            !!match
                ? res.send({ok: true, data: `track ${new_track.title} successfully updated`})
                : res.send({ok: true, data: `WARNING: track ${old_track.title} not found in tracks db`})
        } catch (e) {
            console.log(e)
            res.send({ok: false, data: `ERROR: incorrect request. please send update with { old_track }, { new_track } payload`})
        }
    }

    async remove (req, res) {
        try {
            let match = await Tracks.find({title: req.body.title})
            match.length > 0 
                ? (async function removeTrack(){
                    try {
                        await Tracks.deleteOne({title: req.body.title})
                        res.send({ok: true, data: `track ${req.body.title} successfully deleted`})
                    } catch (e) {
                        console.log(e)
                    }
                })()
                : res.send({ok: true, data: `WARNING: matching track with title ${req.body.title} could not be found in tracks db`})
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new TracksController()