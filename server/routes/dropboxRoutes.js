const express = require('express')
const multer = require('multer')
// const { model } = require('mongoose')
const controller = require('../controllers/DropboxController')

const router = express.Router()
const upload = multer()

router.get('/', controller.getAll)

router.post('/add', upload.single('file'), controller.add)

router.post('/getlink', controller.getLink)

router.post('/remove', controller.remove)

module.exports = router