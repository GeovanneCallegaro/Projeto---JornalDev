const mongoose = require('../db/conn')
const {Schema} = require('mongoose')

const Admin = mongoose.model(
    'Admin', 
    new Schema ({
        name: {
            type: String, 
            required: true
        }, 
        age: {
            type: Number, 
            required: true
        },
        office: {
            type: String, 
            required: true
        }, 
        phone: {
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
        }
    }, {timestamp: true})
)

module.exports = Admin