'use strict'

const movies = {}

movies.notSeenForUser = async (userId, dataSet, allMovies, allRatings) => {
  const userRatings = allRatings.filter(r => r.userId === userId)
  allMovies.forEach(m => { m.seen = false })

  userRatings.forEach(r => {
    allMovies.forEach(m => {
      if (r.movieId === m.id) m.seen = true
    })
  })

  const unsSeenMovies = allMovies.filter(m => m.seen === false)

  return unsSeenMovies
}

module.exports = movies
