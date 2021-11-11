const express = require('express')
const router = express.Router()

const controller = require('../controllers/recommendedMoviesController')

router.get('/', controller.getRecommendedMovies)

module.exports = router
