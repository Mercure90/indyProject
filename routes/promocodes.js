const express = require('express')

const router = express.Router()
const {
  createPromocode,
  deletePromocode,
  getAllPromocode,
  updatePromocode,
  getPromocode,
  checkPromocodeValidity,
} = require('../controllers/promocodes')
const { route } = require('./auth')

router.route('/').post(createPromocode).get(getAllPromocode)
router.route('/checkPromocodeValidity').put(checkPromocodeValidity)
router.route('/:id').get(getPromocode).delete(deletePromocode).patch(updatePromocode)

module.exports = router