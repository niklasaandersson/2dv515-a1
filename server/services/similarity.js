'use strict'
const csvParser = require('../utils/csvParser')
const corr = require('./correlation')
const path = require('path')

const similarity = {}

similarity.users = async (userId, method, dataSet) => {
  let filePath
  if (dataSet === 'small') filePath = path.join(__dirname, '../data/movies_small')
  if (dataSet === 'large') filePath = path.join(__dirname, '../data/movies_large')

  const allUsers = await csvParser.read(filePath + '/users.csv')
  const allRatings = await csvParser.read(filePath + '/ratings.csv')

  allUsers.forEach(user => {
    user.ratings = allRatings.filter(u => u.userId === user.id)
  })

  const userA = allUsers.filter(u => u.id === userId)
  const remainingUsers = allUsers.filter(u => u.id !== userId)
  const data = []

  if (method === 'euclidean') {
    await Promise.all(remainingUsers.map(async userB => {
      const correlation = await corr.euclidean(userA, userB, 'user')
      data.push({ name: userB.name, id: userB.id, score: correlation })
    }))
  }
  if (method === 'pearson') {
    await Promise.all(remainingUsers.map(async userB => {
      const correlation = await corr.pearson(userA, userB, 'user')
      data.push({ name: userB.name, id: userB.id, score: correlation })
    }))
  }
  data.sort((a, b) => b.score - a.score)

  return data
}

similarity.movies = async (movieId, method, dataSet) => {
  let filePath
  if (dataSet === 'small') filePath = path.join(__dirname, '../data/movies_small')
  if (dataSet === 'large') filePath = path.join(__dirname, '../data/movies_large')

  const allMovies = await csvParser.read(filePath + '/movies.csv')
  const allRatings = await csvParser.read(filePath + '/ratings.csv')

  allMovies.forEach(movie => {
    const ratings = allRatings.filter(m => m.movieId === movie.id)
    movie.ratings = ratings
  })

  const movieA = allMovies.filter(m => m.id === movieId)
  const remainingMovies = allMovies.filter(m => m.id !== movieId)
  const data = []

  if (method === 'euclidean') {
    await Promise.all(remainingMovies.map(async movieB => {
      const correlation = await corr.euclidean(movieA, movieB, 'movie')
      data.push({ movie: movieB.title, id: movieB.id, score: correlation })
    }))
  }
  if (method === 'pearson') {
    await Promise.all(remainingMovies.map(async movieB => {
      const correlation = await corr.pearson(movieA, movieB, 'movie')
      data.push({ movie: movieB.title, id: movieB.id, score: correlation })
    }))
  }
  data.sort((a, b) => b.score - a.score)

  return data
}

module.exports = similarity
