const mongoose = require('../db/conn')
const { Schema } = require('mongoose')

const User = mongoose.model(
    'User', 
    new Schema({
        name: {
            type: String, 
            required: true
        },
        age: {
            type: Number, 
            required: true
        }, 
        email: {
            type: String, 
            required: true
        },
        password: {
            type: String, 
            required: true
        },
        admin: {
            type: Boolean, 
            required: true
        },
        occupation: {
            type: String, 
            required: true
        }, 
        posts: Object
    }, {timestamps: true})
)

module.exports = User