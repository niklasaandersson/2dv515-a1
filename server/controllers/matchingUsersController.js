'use strict'
const csvParser = require('../utils/csvParser')
const path = require('path')
const controller = {}

controller.getMatchingUsers = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query
  let filePath
  if (dataSet === 'small') filePath = path.join(__dirname, '../data/movies_small')
  if (dataSet === 'large') filePath = path.join(__dirname, '../data/movies_large')

  const allUsers = await csvParser.read(filePath + '/users.csv')
  const allRatings = await csvParser.read(filePath + '/ratings.csv')

  const userARatings = allRatings.filter(u => u.userId === userId)
  const remainingRatings = allRatings.filter(u => u.userId !== userId)
  const uniqueUsers = [...new Set(remainingRatings.map(user => user.userId))]

  let data = []

  if (method === 'euclidean') {
    data = await getMatchingUsersAccordingEuclidean(allUsers, uniqueUsers, userARatings, remainingRatings)
  }
  if (method === 'pearson') {
    data = await getMatchingUsersAccordingPearson(allUsers, uniqueUsers, userARatings, remainingRatings)
  }
  data.sort((a, b) => b.score - a.score)
  data = data.slice(0, limit)
  res.status(200).json({ data })
}

const getMatchingUsersAccordingEuclidean = async (allUsers, uniqueUsers, userARatings, remainingRatings) => {
  const result = []
  uniqueUsers.forEach(userB => {
    var sim = 0
    let n = 0
    const userBRatings = remainingRatings.filter(u => u.userId === userB)

    userARatings.forEach(ratingA => {
      userBRatings.forEach(ratingB => {
        if (ratingA.movieId === ratingB.movieId) {
          sim += (ratingA.rating - ratingB.rating) ** 2
          n += 1
        }
      })
    })
    if (n === 0) return 0

    const inv = 1 / (1 + sim)
    const user = allUsers.filter(u => u.id === userB)
    const similarityObj = { name: user[0].name, id: userB, score: inv }
    result.push(similarityObj)
  })
  return result
}

controller.getMatchingUsers2 = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query
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
  let data = []

  if (method === 'euclidean') {
    await Promise.all(remainingUsers.map(async userB => {
      const correlation = await getMatchingUsersAccordingEuclidean2(userA, userB)
      data.push({ name: userB.name, id: userB.id, score: correlation })
    }))
  }
  if (method === 'pearson') {
    await Promise.all(remainingUsers.map(async userB => {
      const correlation = await getMatchingUsersAccordingPearson2(userA, userB)
      data.push({ name: userB.name, id: userB.id, score: correlation })
    }))
  }
  data.sort((a, b) => b.score - a.score)
  data = data.slice(0, limit)
  res.status(200).json({ data })
}

const getMatchingUsersAccordingEuclidean2 = async (userA, userB) => {
  var sim = 0
  let n = 0

  userA[0].ratings.forEach(rA => {
    userB.ratings.forEach(rB => {
      if (rA.movieId === rB.movieId) {
        sim += (rA.rating - rB.rating) ** 2
        n += 1
      }
    })
  })
  if (n === 0) return 0

  const inv = 1 / (1 + sim)
  return inv
}

const getMatchingUsersAccordingPearson2 = async (userA, userB) => {
  let sum1 = 0
  let sum2 = 0
  let sum1sq = 0
  let sum2sq = 0
  let pSum = 0
  let n = 0

  userA[0].ratings.forEach(rA => {
    userB.ratings.forEach(rB => {
      if (rA.movieId === rB.movieId) {
        sum1 += parseFloat(rA.rating)
        sum2 += parseFloat(rB.rating)
        sum1sq += parseFloat(rA.rating) ** 2
        sum2sq += parseFloat(rB.rating) ** 2
        pSum += parseFloat(rA.rating) * parseFloat(rB.rating)
        n += 1
      }
    })
  })

  // No ratings in common - return 0

  if (n === 0) return null
  else {
    // Calculate Pearson
    const num = pSum - (sum1 * sum2 / n)
    const den = Math.sqrt((sum1sq - Math.pow(sum1, 2) / n) * (sum2sq - Math.pow(sum2, 2) / n))
    return num / den
  }
}

const getMatchingUsersAccordingPearson = async (allUsers, uniqueUsers, userARatings, remainingRatings) => {
  const result = []

  uniqueUsers.forEach(userB => {
    let sum1 = 0
    let sum2 = 0
    let sum1sq = 0
    let sum2sq = 0
    let pSum = 0
    let n = 0
    const userBRatings = remainingRatings.filter(u => u.userId === userB)
    userARatings.forEach(rA => {
      userBRatings.forEach(rB => {
        if (rA.movieId === rB.movieId) {
          sum1 += parseFloat(rA.rating)
          sum2 += parseFloat(rB.rating)
          sum1sq += parseFloat(rA.rating) ** 2
          sum2sq += parseFloat(rB.rating) ** 2
          pSum += parseFloat(rA.rating) * parseFloat(rB.rating)
          n += 1
        }
      })
    })

    // No ratings in common - return 0
    const user = allUsers.filter(u => u.id === userB)
    let pearsonObj = {}
    if (n === 0) {
      pearsonObj = { name: user[0].name, id: userB, score: 0 }
    } else {
      // Calculate Pearson
      const num = pSum - (sum1 * sum2 / n)
      const den = Math.sqrt((sum1sq - Math.pow(sum1, 2) / n) * (sum2sq - Math.pow(sum2, 2) / n))
      pearsonObj = { name: user[0].name, id: userB, score: num / den }
    }
    result.push(pearsonObj)
  })
  return result
}

module.exports = controller
