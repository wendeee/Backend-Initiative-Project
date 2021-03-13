const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/backendInitiativeProject', {useUnifiedTopology: true,  useNewUrlParser: true, useFindAndModify: false })
    .then(result => console.log('Connected to database'))
    .catch(err => console.log('Connection Failed...'))

const bodyParser = require('body-parser')

const users = require('./routes/users')

const movies = require('./routes/movies')

const rentals = require('./routes/rentals')

const app = express()

app.use(express.json())
app.use(bodyParser.json())

app.use(express.urlencoded({extended:true}))

app.use('/api/users', users)

app.use('/api/movies', movies)

app.use('/api/rentals', rentals)

const port = 4000 || process.env.port

app.listen(port, () => console.log(`App is running on Port: ${port}`))