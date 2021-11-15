'use strict'

const controller = {}

controller.getRecommendationsItemBased = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query
  let data = []
  if (method === 'euclidean') {
    data.push({ name: 'testEuc', id: 9, score: 9.99 })
    data.push({ name: 'testEuc', id: 9, score: 9.99 })
  }
  if (method === 'pearson') {
    data.push({ name: 'testPer', id: 9, score: 9.99 })
    data.push({ name: 'testPer', id: 9, score: 9.99 })
  }
  data.sort((a, b) => b.score - a.score)
  data = data.slice(0, limit)
  res.status(200).json({ data })
}

module.exports = controller
