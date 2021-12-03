const {
    string
} = require('joi')
const mongoose = require('mongoose')

const promocodeSchmea = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
    },
    avantage: {
        "percent": {
            type: Number,
            required: [true, 'Please provide a reduction'],
            default: 0,
        }
    },
    restriction: [
        [{
            "field": {
                type: String,
                enum: {
                    values: ['age', 'date', 'meteo'],
                    message: '{VALUE} is not supported',
                }
            },
            "operator": {
                type: String,
                enum: {
                    values: ['eq', 'gt', 'st'],
                    message: '{VALUE} is not supported',
                }
            },
            "value":{type:String,required:true}
        }]
    ],createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
}, {
    timestamps: true
})

module.exports = mongoose.model('Promocode', promocodeSchmea)