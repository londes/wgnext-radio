const multer = require('multer')
const bodyParser = require('body-parser')
const dropboxService = require('../services/dropboxServices')

const upload = multer();

class DropboxController {

    async add (req, res) {
        try {
            let { file } = req
            if (!file) {
                return res.status(400).send('no file uploaded in request')
            }
            let uploadData = await dropboxService.uploadToDropbox(file.buffer, file.originalname)
            res.status(200).json(uploadData)
        } catch (error) {
            console.error('ADD ERROR:', error)
            res.status(500).send(`server error: ${error.message}`)
        }
    }

    async getLink (req, res) {
        try {
            const { path_lower } = req.body.song;
            const shareData = await dropboxService.createShareableLink(path_lower);
            res.status(200).json(shareData);
        } catch (error) {
            console.error('error getting link:', error);
            res.status(500).send(`server error: ${error.message}`);
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