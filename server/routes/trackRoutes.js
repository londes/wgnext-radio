const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const controller = require('../controllers/TracksController')

router.get('/', controller.getAll)

module.exports = router