'use strict'
const csvParser = require('../utils/csvParser')
const path = require('path')
const controller = {}

controller.getMovies = async (req, res) => {
  if (req.query.dataSet === 'small') {
    const movies = await csvParser.read(path.join(__dirname, '../data/movies_small/movies.csv'))
    res.status(200).json(movies)
  } else if (req.query.dataSet === 'large') {
    const movies = await csvParser.read(path.join(__dirname, '../data/movies_large/movies.csv'))
    res.status(200).json(movies)
  } else {
    res.status(400).json({ message: 'Dataset must be included.' })
  }
}

module.exports = controller
