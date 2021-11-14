'use strict'
const csv = require('csv-parser')
const fs = require('fs')
let csvData = []

const utils = {}

utils.read = (path) => {
  csvData = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv({}))
      .on('data', (dataRow) => {
        csvData.push(dataRow)
      })
      .on('end', () => {
        resolve(csvData)
      })
  })
}

module.exports = utils
