'use strict'

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
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

app.get(`/${process.env.API_VERSION}/users`, (req, res) => {
  const users = [
    { id: 1, name: 'Lisa' },
    { id: 2, name: 'Gene' },
    { id: 3, name: 'Mike' },
    { id: 4, name: 'Claudia' },
    { id: 5, name: 'Mick' },
    { id: 6, name: 'Jack' },
    { id: 7, name: 'Toby' }
  ]

  console.log(req.query)
  res.status(200).json(users)
})

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
