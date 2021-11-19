'use strict'

const corr = {}

corr.euclidean = async (itemA, itemB, type) => {
  var sim = 0
  let n = 0

  itemA[0].ratings.forEach(rA => {
    itemB.ratings.forEach(rB => {
      if (type === 'user') {
        if (rA.movieId === rB.movieId) {
          sim += (parseFloat(rA.rating) - parseFloat(rB.rating)) ** 2
          n += 1
        }
      }
      if (type === 'movie') {
        if (rA.userId === rB.userId) {
          sim += (parseFloat(rA.rating) - parseFloat(rB.rating)) ** 2
          n += 1
        }
      }
    })
  })
  if (n === 0) return 0

  const inv = 1 / (1 + sim)
  return inv
}

corr.pearson = async (itemA, itemB, type) => {
  let sum1 = 0
  let sum2 = 0
  let sum1sq = 0
  let sum2sq = 0
  let pSum = 0
  let n = 0

  itemA[0].ratings.forEach(rA => {
    itemB.ratings.forEach(rB => {
      if (type === 'user') {
        if (rA.movieId === rB.movieId) {
          sum1 += parseFloat(rA.rating)
          sum2 += parseFloat(rB.rating)
          sum1sq += parseFloat(rA.rating) ** 2
          sum2sq += parseFloat(rB.rating) ** 2
          pSum += parseFloat(rA.rating) * parseFloat(rB.rating)
          n += 1
        }
      }

      if (type === 'movie') {
        if (rA.userId === rB.userId) {
          sum1 += parseFloat(rA.rating)
          sum2 += parseFloat(rB.rating)
          sum1sq += parseFloat(rA.rating) ** 2
          sum2sq += parseFloat(rB.rating) ** 2
          pSum += parseFloat(rA.rating) * parseFloat(rB.rating)
          n += 1
        }
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

module.exports = corr
