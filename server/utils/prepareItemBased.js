'use strict'
const fs = require('fs')
const utils = {}
const similarity = require('../services/similarity')

utils.prepareItemBasedFiles = async pathArr => {
  for (let i = 0; i < pathArr.length; i++) {
    fs.stat(`${pathArr[i]}/itemBased.csv`, (error, stats) => {
      if (error) {
        // Create files itemBased.csv if there is a ratings.csv file
        fs.stat(`${pathArr[i]}/ratings.csv`, async (error, stats) => {
          if (!error) {
            const method = 'euclidean'
            const dataSet = pathArr[i].split('_')[1]

            // Populate files with table of movie sim
            let resultString = 'movieIdA,movieIdB,score'

            // TODO hardcoded solution cause promise.all or forEach did not work
            if (dataSet === 'small') {
              for (let i = 1; i < 7; i++) {
                const sims = await similarity.movies(i.toString(), method, dataSet)
                sims.forEach(sim => {
                  const row = `${i},${sim.id},${sim.score}`
                  resultString += `\n${row}`
                })
              }
            }

            // TODO hardcoded solution cause promise.all or forEach did not work
            if (dataSet === 'large') {
              for (let i = 1; i < 31; i++) {
                const sims = await similarity.movies(i.toString(), method, dataSet)
                sims.forEach(sim => {
                  const row = `${i},${sim.id},${sim.score}`
                  resultString += `\n${row}`
                })
              }
            }

            fs.writeFile(pathArr[i] + '/itemBased.csv', resultString, function (err) {
              if (err) throw err
              console.log('New itemBased.csv was created!')
            })
          }
        })
      }
    })
  }
}

module.exports = utils
