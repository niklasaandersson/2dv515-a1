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
      const correlation = await corr.euclidean(userA, userB)
      data.push({ name: userB.name, id: userB.id, score: correlation })
    }))
  }
  if (method === 'pearson') {
    await Promise.all(remainingUsers.map(async userB => {
      const correlation = await corr.pearson(userA, userB)
      data.push({ name: userB.name, id: userB.id, score: correlation })
    }))
  }
  data.sort((a, b) => b.score - a.score)

  return data
}

module.exports = similarity
