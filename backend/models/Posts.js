const mongoose = require('../db/conn')
const { Schema } = require('mongoose')

const Posts = mongoose.model(
    'Posts', 
    new Schema({
        title: {
            type: String, 
            required: true
        }, 
        subtitle: {
            type: String, 
            required: true
        }, 
        theme: {
            type: String, 
            required: true
        }, 
        user: Object
    }, {timestamps: true})
)

module.exports = Posts