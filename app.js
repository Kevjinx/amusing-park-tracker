require('dotenv').config();
const express = require('express')
const app = express()
const routes = require('./routes')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')




app.set('view engine', 'pug')
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(routes)
app.use(cookieParser())

const pageNotFoundError = (req, res, next) => {
    let testError = new Error("The requests page couldn't be found");
    testError.status = 404
    next(testError)
}

const errorHandler = (err, req, res, next) => {
    if (err.status === 404) {
        res.status(404)
        res.render('page-not-found')
    } else if (err.status === 500) {
        res.status(500)
        res.render('server-error', {
            message: err.message,
            stack: err.stack
        })
    } else {
        console.error(err);
        console.error(err.stack);
        next(err)
    }
}


app.get('/', (req, res) => {
    res.render('layout')
})




app.use(pageNotFoundError)
app.use(errorHandler)

module.exports = app
