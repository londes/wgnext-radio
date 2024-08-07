// const ObjectId = require('mongoose').Types.ObjectId
// const Tracks = require('../models/tracks')

const multer = require('multer')
const bodyParser = require('body-parser')

const upload = multer();
// app.use(bodyParser.json());


class DropboxController {

    async getAll (req, res) {
        try {
        } catch(e) {
            console.log(e)
        }
    }

    async add (req, res) {
        console.log(req.file)
        let { file } = req
        try {
            let response = await fetch ('https://content.dropboxapi.com/2/files/upload', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
                  'Dropbox-API-Arg': JSON.stringify({
                    path: `/${file.originalname}`,
                    mode: 'add',
                    autorename: true,
                    mute: false
                  }),
                  'Content-Type': 'application/octet-stream'
                },
                body: file.buffer
              })
          
              if (response.ok) {
                let data = await response.json()
                console.log('file uploaded to dropbox successfully', data)
                res.status(200).json(data)
              } else {
                let errorResponse = await response.text()
                console.error('failed to upload file to dropbox', response.status, response.statusText, errorResponse);
                res.status(response.status).send(errorResponse)
              }
        } catch (e) {
            console.log(e)
            res.status(500).send(`server error ${e}`)
        }
    }

    async getLink (req, res) {
        console.log(req)
        let song = req.body
        try {
            let response = await fetch ('https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings', {
                method: 'POST',
                headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_DROPBOX_TOKEN}`,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                path: song.path_lower,
                settings: {
                    access: "viewer",
                    allow_download: true,
                    audience: "public",
                    requested_visibility: "public"
                }
                }),
            })
        
            if (response.ok) {
                let data = await response.json()
                console.log('shareable link generated successfully', data)
                res.status(200).json(data)
            } else {
                let errorResponse = await response.text()
                console.error('shareable link failed to generate', response.status, response.statusText, errorResponse)
                res.status(response.status).send(errorResponse)
            }
        } catch(e) {
            console.log(e)
            res.status(500).send(`server error ${e}`)
        }
    }

    async remove (req, res) {
        try {
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new DropboxController()