const express = require('express')
const router = express.Router()

const controller = require('../controllers/matchingMoviesController')

router.get('/', controller.getMatchingMovies)

module.exports = router
