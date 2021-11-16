const express = require('express')
const router = express.Router()

const controller = require('../controllers/matchingUsersController')

router.get('/', controller.getMatchingUsers2)

module.exports = router
