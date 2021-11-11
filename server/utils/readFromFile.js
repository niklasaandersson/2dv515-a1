'use strict'
const csv = require('csv-parser')
const fs = require('fs')
let csvData = []

const utils = {}

utils.readCsvFromFile = (path) => {
  csvData = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(path)
      .pipe(csv({}))
      .on('data', (dataRow) => {
        dataRow.id = parseInt(dataRow.id)
        csvData.push(dataRow)
      })
      .on('end', () => {
        resolve(csvData)
      })
  })
}

module.exports = utils
