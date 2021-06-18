const express = require('express')
const app = express()
const routes = require('./routes')
const port = 8080
const morgan = require('morgan')

app.set('view engine', 'pug')
app.use(morgan('dev'))

app.use(routes)





app.listen(port, console.log(`listening to port ${port}`))

module.exports = app