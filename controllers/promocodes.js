const Promocode = require('../models/Promocode')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const createPromocode = async (req,res) =>{    
    req.body.createdBy = req.user.userId
    const promocode = await Promocode.create(req.body)
    res.status(StatusCodes.CREATED).json({ promocode })
}
const deletePromocode = async (req,res) =>{
    const {
        user: { userId },
        params: { id: promocodeId },
      } = req
    
      const promocode = await Promocode.findByIdAndRemove({
        _id: promocodeId,
        createdBy: userId,
      })
      if (!promocode) {
        throw new NotFoundError(`No promocode with id ${promocodeId}`)
      }
    res.status(StatusCodes.OK).send()
}
const getAllPromocode = async (req,res) =>{
    const promocode = await Promocode.find({ createdBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ promocode, count: promocode.length })
}
const updatePromocode = async (req,res) =>{
    const {
        body: { name, avantage },
        user: { userId },
        params: { id: promocodeId },
      } = req
    
      if (name === '' || avantage === '') {
        throw new BadRequestError('name and avantage fields cannot be empty')
      }
      const promocode = await Promocode.findByIdAndUpdate(
        { _id: promocodeId, createdBy: userId },
        req.body,
        { new: true, runValidators: true }
      )
      if (!promocode) {
        throw new NotFoundError(`No promocode with id ${promocodeId}`)
      }
      res.status(StatusCodes.OK).json({ job })
}
const getPromocode = async (req,res) =>{    
    const {
        user: { userId },
        params: { id: promocodeId },
      } = req
    
      const promocode = await Promocode.findOne({
        _id: promocodeId,
        createdBy: userId,
      })
      if (!promocode) {
        throw new NotFoundError(`No promocode with id ${promocodeId}`)
      }
      res.status(StatusCodes.OK).json({ promocode })
}

module.exports = {
    createPromocode,
    deletePromocode,
    getAllPromocode,
    updatePromocode,
    getPromocode,
  }