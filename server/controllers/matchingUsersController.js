'use strict'
const csvParser = require('../utils/csvParser')
const path = require('path')
const userController = require('./usersController')
const { response } = require('express')

const controller = {}

controller.getMatchingUsers = async (req, res) => {
  const { userId, method, limit, dataSet } = req.query
  let filePath
  if (dataSet === 'small') filePath = path.join(__dirname, '../data/movies_small')
  if (dataSet === 'large') filePath = path.join(__dirname, '../data/movies_large')

  const allRatings = await csvParser.read(filePath + '/ratings.csv')
  const userARatings = allRatings.filter(u => u.userId === userId)
  const remainingRatings = allRatings.filter(u => u.userId !== userId)
  const uniqueUsers = [...new Set(remainingRatings.map(user => user.userId))]
  const allUsers = await csvParser.read(filePath + '/users.csv')
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
    const userBRatings = remainingRatings.filter(u => u.userId === userB)
    var sim = 0
    let n = 0
    userARatings.forEach(ratingA => {
      userBRatings.forEach(ratingB => {
        if (ratingA.movieId === ratingB.movieId) {
          sim += (ratingA.rating - ratingB.rating) ** 2
          n += 1
        }
      })
    })
    if (n === 0) return 0

    const user = allUsers.filter(u => u.id === userB)
    const similarityObj = { name: user[0].name, id: userB, score: sim }
    result.push(similarityObj)
  })
  return result
}

const getMatchingUsersAccordingPearson = async (allUsers, uniqueUsers, userARatings, remainingRatings) => {
  const result = []
  let sum1 = 0
  let sum2 = 0
  let sum1sq = 0
  let sum2sq = 0
  let pSum = 0
  let n = 0
  let num = 0
  let den = 0
  uniqueUsers.forEach(userB => {
    const userBRatings = remainingRatings.filter(u => u.userId === userB)

    userARatings.forEach(ratingA => {
      userBRatings.forEach(ratingB => {
        if (ratingA.rating === ratingB.rating) {
          sum1 += parseFloat(ratingA.rating)
          sum2 += parseFloat(ratingB.rating)
          sum1sq += parseFloat(ratingA.rating) ** 2
          sum2sq += parseFloat(ratingB.rating) ** 2
          pSum += parseFloat(ratingA.rating) * parseFloat(ratingB.rating)
          n += 1
        }
      })
    })
    // No ratings in common - return 0
    if (n === 0) return 0

    // Calculate Pearson
    num = pSum - (sum1 * sum2 / n)
    console.log('pSum ', pSum)
    console.log('sum1 ', sum1)
    console.log('sum2 ', sum2)
    console.log('n ', n)

    den = Math.sqrt((sum1sq - sum1 ** 2 / n) * sum2sq - sum2 ** 2 / n)
    console.log(num / den)

    const pearsonObj = { name: 'userName', id: userB, score: num / den }
    result.push(pearsonObj)
  })
  return result
}

module.exports = controller
