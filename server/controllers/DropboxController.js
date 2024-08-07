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
                return data
              } else {
                let errorResponse = await response.text()
                console.error('failed to upload file to dropbox', response.status, response.statusText, errorResponse);
              }
        } catch (e) {
            console.log(e)
        }
    }

    async getLink (req, res) {
        try {
        } catch(e) {
            console.log(e)
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