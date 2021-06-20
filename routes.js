const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler')
const db = require('./db/models')
const csrf = require('csurf')

const csrfProtection = csrf({ cookie: true })

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

router.post('/park/add', csrfProtection, asyncHandler(async (req, res) => {


  const newPark = await db.Park.build(

  )
}))




module.exports = router
