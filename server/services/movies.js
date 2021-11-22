'use strict'

const movies = {}

// TODO remove dry code

movies.notSeenForUser = async (userId, allMovies, allRatings) => {
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

movies.seenForUser = async (userId, allMovies, allRatings) => {
  const userRatings = allRatings.filter(r => r.userId === userId)
  allMovies.forEach(m => { m.seen = false })

  userRatings.forEach(r => {
    allMovies.forEach(m => {
      if (r.movieId === m.id) {
        m.seen = true
        m.rating = r.rating
      }
    })
  })

  const seenMovies = allMovies.filter(m => m.seen === true)
  return seenMovies
}

module.exports = movies
