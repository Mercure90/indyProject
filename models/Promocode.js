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
        unique: true,
    },
    avantage: {
        "percent": {
            type: Number,
            required: [true, 'Please provide a reduction'],
            default: 0,
        }
    },
    restrictions: {},
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user'],
      },
}, {
    timestamps: true
})

module.exports = mongoose.model('Promocode', promocodeSchmea)