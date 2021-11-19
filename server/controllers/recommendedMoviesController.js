'use strict'

const similarity = require('../services/similarity')
const movies = require('../services/movies')
const csvParser = require('../utils/csvParser')
const path = require('path')
const controller = {}

controller.getRecommendedMovies = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query
  let similaritiesUser = await similarity.users(userId, method, dataSet)

  let filePath
  if (dataSet === 'small') filePath = path.join(__dirname, '../data/movies_small')
  if (dataSet === 'large') filePath = path.join(__dirname, '../data/movies_large')

  const allMovies = await csvParser.read(filePath + '/movies.csv')
  const allRatings = await csvParser.read(filePath + '/ratings.csv')

  // remove users with similarity score below 0
  similaritiesUser = similaritiesUser.filter(u => u.score > 0)
  const unSeenMovies = await movies.notSeenForUser(userId, dataSet, allMovies, allRatings)

  const table = []

  similaritiesUser.forEach(user => {
    const userObj = { userId: user.id, userName: user.name, userSim: user.score, movies: [] }

    unSeenMovies.forEach(async unSeenMovie => {
      let rating = allRatings.filter(r => (r.userId === user.id & r.movieId === unSeenMovie.id))
      if (rating.length === 0) rating = ''
      else rating = parseFloat(rating[0].rating)

      const movie = ({ id: unSeenMovie.id, title: unSeenMovie.title, rating: rating, wScore: user.score * rating })
      userObj.movies.push(movie)
    })
    table.push(userObj)
  })

  unSeenMovies.forEach(m => {
    let sumWSum = 0
    let sumSim = 0
    table.forEach(u => {
      u.movies.forEach(um => {
        if (m.id === um.id) {
          sumWSum += um.wScore
          if (um.rating !== '') sumSim += u.userSim
        }
      })
    })
    m.sumWSum = sumWSum
    m.sumSim = sumSim
    m.wSumSim = sumWSum / sumSim
  })

  let data = []
  unSeenMovies.forEach(m => data.push({ movie: m.title, id: m.id, score: m.wSumSim }))
  data = data.sort((a, b) => b.score - a.score)
  data = data.slice(0, limit)
  console.log(data)
  res.status(200).json({ data })
}

module.exports = controller
