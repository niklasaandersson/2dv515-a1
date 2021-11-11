'use strict'

const controller = {}

controller.getRecommendationsItemBased = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query
  if (method === 'euclidean') {
    console.log('-------euclidean')
  }
  if (method === 'pearson') {
    console.log('-------pearson')
  }
  console.log(userId)
  console.log(method)
  console.log(limit)
  console.log(dataSet)

  res.sendStatus(200)
}

module.exports = controller
