'use strict'

const similarity = require('../services/similarity')

const controller = {}

controller.getMatchingUsers = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query
  let data = await similarity.users(userId, method, dataSet)
  data = data.slice(0, limit)
  res.status(200).json({ data })
}

module.exports = controller
