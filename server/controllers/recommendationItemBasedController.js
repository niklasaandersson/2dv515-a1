'use strict'

const movies = require('../services/movies')
const csvParser = require('../utils/csvParser')
const path = require('path')
const controller = {}

controller.getRecommendationsItemBased = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query

  let filePath
  if (dataSet === 'small') filePath = path.join(__dirname, '../data/movies_small')
  if (dataSet === 'large') filePath = path.join(__dirname, '../data/movies_large')

  const allSims = await csvParser.read(filePath + '/itemBased.csv')

  // Unseen movies
  const allMovies = await csvParser.read(filePath + '/movies.csv')
  const allRatings = await csvParser.read(filePath + '/ratings.csv')
  const unSeenMovies = await movies.notSeenForUser(userId, allMovies, allRatings)

  // Seen movies and rating
  const seenMovies = await movies.seenForUser(userId, allMovies, allRatings)

  const test = []
  // Add unseen movies with sim and weighted rating
  seenMovies.forEach(m => {
    m.unSeenMovies = []
    unSeenMovies.forEach(u => {
      const sim = allSims.filter(obj => obj.movieIdA === m.id && obj.movieIdB === u.id)
      test.push({ id: u.id, title: u.title, sim: parseFloat(sim[0].score), wR: parseFloat(sim[0].score) * parseFloat(m.rating) })
    })
  })

  // Sums

  unSeenMovies.forEach(m => {
    const arr = test.filter(obj => obj.id === m.id)
    m.sumWR = arr.map(obj => obj.wR).reduce((prev, next) => prev + next)
    m.sumSim = arr.map(obj => obj.sim).reduce((prev, next) => prev + next)
    m.score = m.sumWR / m.sumSim
  })

  let data = []
  unSeenMovies.forEach(m => data.push({ movie: m.title, id: m.id, score: m.score }))
  data = data.sort((a, b) => b.score - a.score)
  data = data.slice(0, limit)

  res.status(200).json({ data })
}

module.exports = controller
