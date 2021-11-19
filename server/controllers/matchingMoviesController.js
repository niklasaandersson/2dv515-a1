'use strict'

const similarity = require('../services/similarity')
const controller = {}

controller.getMatchingMovies = async (req, res) => {
  const { movieId, method, limit, dataSet } = req.query
  let data = await similarity.movies(movieId, method, dataSet)
  data = data.slice(0, limit)
  res.status(200).json({ data })
}

module.exports = controller
