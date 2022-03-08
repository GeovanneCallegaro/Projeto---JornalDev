const User = require("../models/User")
const ObjectId = require('mongoose').Types.ObjectId


module.exports = class AdminController {
    static async getAllUsers( res) {
        // select users who are not admins
        const users = await User.find({'admin': false}).sort('-createdAt')
        
        res.status(200).json({
            users: users
        })
    }

    static async getUserById(req, res) {
        const id = req.params.id

        // check if id is valid 
        if(!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido!'
            })
            return
        }

        // check if user exists
        const user = await User.findOne({_id: id})

        if(!user) {
            res.status(404).json({
                message: 'Usuário não existe!'
            })
        }

        res.status(200).json({
            user: user
        })
    }
}