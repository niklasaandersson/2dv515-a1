const express = require('express')
const router = express.Router()

const controller = require('../controllers/recommendationItemBasedController')

router.get('/', controller.getRecommendationsItemBased)

module.exports = router
