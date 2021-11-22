'use strict'
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')

const usersRouter = require('./routes/usersRouter')
const moviesRouter = require('./routes/moviesRouter')
const matchingUsersRouter = require('./routes/matchingUsersRouter')
const recommendedMoviesRouter = require('./routes/recommendedMoviesRouter')
const recommendationsItemBasedRouter = require('./routes/recommendationsItemBasedRouter')
const matchingMoviesRouter = require('./routes/matchingMoviesRouter')

const utils = require('./utils/prepareItemBased')
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

app.use(express.static(path.join(__dirname, 'public')))

app.use(helmet())
app.use(logger('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' }))

// Check for item-based file

utils.prepareItemBasedFiles(['./data/movies_small', './data/movies_large'])

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

app.get('/', (req, res) => {
  res.status(200).json('Hello World!')
})

app.use(`/api/${process.env.API_VERSION}/users`, usersRouter)
app.use(`/api/${process.env.API_VERSION}/movies`, moviesRouter)
app.use(`/api/${process.env.API_VERSION}/matching-users`, matchingUsersRouter)
app.use(`/api/${process.env.API_VERSION}/recommended-movies`, recommendedMoviesRouter)
app.use(`/api/${process.env.API_VERSION}/recommendations-item-based`, recommendationsItemBasedRouter)
app.use(`/api/${process.env.API_VERSION}/matching-movies`, matchingMoviesRouter)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  })
}

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
