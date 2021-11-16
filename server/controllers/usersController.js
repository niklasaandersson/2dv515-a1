'use strict'
const csvParser = require('../utils/csvParser')
const path = require('path')
const controller = {}

controller.getUsers = async (req, res) => {
  if (req.query.dataSet === 'small') {
    const users = await csvParser.read(path.join(__dirname, '../data/movies_small/users.csv'))
    res.status(200).json(users)
  } else if (req.query.dataSet === 'large') {
    const users = await csvParser.read(path.join(__dirname, '../data/movies_large/users.csv'))
    res.status(200).json(users)
  } else {
    res.status(400).json({ message: 'Dataset must be included.' })
  }
}

controller.getUserNameFromID = async (pathFile, userId) => {
  const users = await csvParser.read(path.join(__dirname, pathFile))
  const user = users.map(u => u.id === userId)
  return user.name
}

module.exports = controller
