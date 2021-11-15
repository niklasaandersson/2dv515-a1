'use strict'

const controller = {}

controller.getRecommendedMovies = async (req, res) => {
  const { movieId, limit, dataSet } = req.query

  console.log(movieId)
  console.log(limit)
  console.log(dataSet)

  const data = [{ movie: 'Terminator', id: 1, score: 2.24 }]
  console.log(data)
  res.status(200).json({ data })
}

module.exports = controller
