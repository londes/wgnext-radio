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

    async add (req, res) {
        let { artist, title, src, filename } = req.body.data
        console.log(artist, title, src)
        try {
            let match = await Tracks.find({src})
            match.length > 0 
                ? res.send({ok: true, data: `WARNING: matching track with link ${src} already exists in tracks db`})
                : (async function addTrack(){
                    try {
                        await Tracks.create({title: title, artist: artist, src: src, filename: filename})
                        res.send({ok: true, data: `track ${title} by ${artist} successfully added to WGNext radio!`})
                    } catch(e) {
                        console.log(e)
                        res.send({ok: false, data: `ERROR: could not add track due to missing required field`})
                    }
                })()
        } catch (e) {
            console.log(e)
        }
    }

    // note: not currently in use
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

    // note: not currently in use
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