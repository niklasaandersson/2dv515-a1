'use strict'

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
const usersRouter = require('./routes/usersRouter')
const matchingUsersRouter = require('./routes/matchingUsersRouter')
const recommendedMoviesRouter = require('./routes/recommendedMoviesRouter')
const recommendationsItemBasedRouter = require('./routes/recommendationsItemBasedRouter')
require('dotenv').config()

// ----------------- End of Import-----------------
const app = express()

// Middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(helmet())
app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.get('/', (req, res) => {
  res.status(200).json('Hello World!')
})

app.use(`/api/${process.env.API_VERSION}/users`, usersRouter)
app.use(`/api/${process.env.API_VERSION}/matching-users`, matchingUsersRouter)
app.use(`/api/${process.env.API_VERSION}/recommended-movies`, recommendedMoviesRouter)
app.use(`/api/${process.env.API_VERSION}/recommendations-item-based`, recommendationsItemBasedRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
  console.log('Press Ctrl-C to terminate...')
})
