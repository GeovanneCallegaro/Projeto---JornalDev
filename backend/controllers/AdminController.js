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

    static async deleteUserById(req, res) {
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
            return
        }

        // check if user is not a admin
        if(user.admin === true) {
            res.status(402).json({
                message: 'Não é possível excluir outro admin!'
            })
            return
        }

        await User.findByIdAndDelete(id)

        res.status(200).json({
            message: 'O usuário foi deletado com sucesso!'
        })
    }

    static async editUser(req, res) {
        const id = req.params.id 

        // check if id is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({
                message: 'ID inválido!'
            })
            return
        }

        const { admin, occupation } = req.body
        const uptadedData = {}

        // check if user exists
        const user = await User.findOne({_id: id})

        if(!user) {
            res.status(404).json({
                message: 'Usuário não existe!'
            })
        }

        // validations
        if(!admin) {
            res.status(402).json({
                message: 'O atributo admin é obrigatório'
            })
            return
        } else {
            uptadedData.admin = admin
        }

        if(!occupation) {
            res.status(402).json({
                message: 'A ocupação é obrigatória!'
            })
            return
        } else {
            uptadedData.occupation = occupation
        }

        await User.findByIdAndUpdate(id, uptadedData)

        res.status(200).json({
            message: 'Usuário atualizado com sucesso',
            user: user
        })
    }
}