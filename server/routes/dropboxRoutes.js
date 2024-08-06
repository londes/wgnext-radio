const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const controller = require('../controllers/DropboxController')

router.get('/', controller.getAll)

router.post('/add', controller.add)

// router.post('/delete', controller.remove)

// router.post('/update', controller.update)

module.exports = router