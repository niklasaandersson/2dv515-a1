const express = require('express')
const router = express.Router()

const controller = require('../controllers/matchingUsersController')

router.get('/', controller.getMatchingUsers)

module.exports = router
