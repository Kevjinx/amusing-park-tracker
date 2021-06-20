
const express = require('express');
const db = require('./db/models');
const csrf  = require('csurf');
const { response } = require('express');
const { check, validationResult } = require('express-validator');
const { next } = require('cheerio/lib/api/traversing');
const router = express.Router();

const csrfProtection = csrf({ cookie: true })
const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const startDate = new Date(1700, 01, 01)
const parkValidators = [
check("parkName")
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for Park Name')
  .isLength({ max: 255 })
  .withMessage('Park Name must not be more than 255 characters long'),
check("city")
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for City')
  .isLength({ max: 100 })
  .withMessage('City must not be more than 100 characters long'),
check("provinceState")
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for Province/State')
  .isLength({ max: 100 })
  .withMessage('Province/State must not be more than 100 characters long'),
check("country")
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for Country')
  .isLength({ max: 100 })
  .withMessage('Country must not be more than 100 characters long'),
check("opened")
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for Opened')
  .isAfter(new Date(startDate).toDateString())
  .withMessage('Please provide a valid date for Opened'),
check("size")
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for Size')
  .isLength({ max: 100 })
  .withMessage('Size must not be more than 100 characters long'),
check("description")
  .exists({ checkFalsy: true})
  .withMessage('Please provide a value for description')
]



router.get('/', (req, res) => {
  res.render('index', { title: 'An Amusing Park' })
})


router.get('/parks', asyncHandler(async (req, res) => {
  const parks = await db.Park.findAll()
  const parksDataArr = parks.map(parkData => parkData.dataValues)
  res.render('parks-list', { title: 'Parks', parksDataArr})
}))

router.get('/parks/:id(\\d+)', asyncHandler(async (req, res) => {
  const parkId = parseInt(req.params.id)
  const park = await db.Park.findByPk(parkId)
  res.render('park-details', {park})
}))


router.get('/park/add', csrfProtection, (req, res) => {
  const park = db.Park.build()

  res.render('park-add', {
    title: 'Add Park',
    csrfToken: req.csrfToken(),
    park
  })
})

router.post('/park/add', csrfProtection, parkValidators, asyncHandler(async (req, res, next) => {

  const {
    parkName,
    city,
    provinceState,
    country,
    opened,
    size,
    description
  } = req.body

  const newPark = await db.Park.build({
    parkName,
    city,
    provinceState,
    country,
    opened,
    size,
    description
  })

  const validatorErrors = validationResult(req)

  try {
    await newPark.save()
    res.redirect('/')
  } catch (err) {
    const errorsArr = validatorErrors.array().map(error => error.message)
    res.render('park-add', {
      errorsArr,
      title: 'Add Park',
      csrfToken: req.csrfToken(),
      newPark
    })
  }
}))




module.exports = router
