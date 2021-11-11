'use strict'

const controller = {}

controller.getRecommendedMovies = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query

  console.log(userId)
  console.log(method)
  console.log(limit)
  console.log(dataSet)
  res.sendStatus(200)
}

module.exports = controller
