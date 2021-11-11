'use strict'
const reader = require('../utils/readFromFile')
const path = require('path')
const controller = {}

controller.getUsers = async (req, res) => {
  if (req.query.dataSet === 'small') {
    const users = await reader.readCsvFromFile(path.join(__dirname, '../data/movies_small/users.csv'))
    res.status(200).json(users)
  } else if (req.query.dataSet === 'large') {
    const users = await reader.readCsvFromFile(path.join(__dirname, '../data/movies_large/users.csv'))
    res.status(200).json(users)
  } else {
    res.status(400).json({ message: 'Dataset must be included.' })
  }
}

module.exports = controller
