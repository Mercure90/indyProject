const express = require('express')

const router = express.Router()
const {
  createPromocode,
  deletePromocode,
  getAllPromocode,
  updatePromocode,
  getPromocode,
} = require('../controllers/promocodes')

router.route('/').post(createPromocode).get(getAllPromocode)

router.route('/:id').get(getPromocode).delete(deletePromocode).patch(updatePromocode)

module.exports = router