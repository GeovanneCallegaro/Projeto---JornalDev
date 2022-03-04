const User = require('../models/User')
const bycrpt = require('bcrypt')
const createUserToken = require('../helpers/createUserToken')


module.exports = class UserController {
    static async register(req, res) {
        const {name, age, email, password, confirmPassword} = req.body
        
        // validations 
        if(!name) {
            res.status(422).json({
                message: 'O nome é obrigatório'
            })
            return
        }

        if(!age) {
            res.status(422).json({
                message: 'A idade é obrigatória'
            })
            return
        }

        if(!email) {
            res.status(422).json({
                message: 'O email é obrigatório'
            })
            return
        }

        if(!password) {
            res.status(422).json({
                message: 'A senha é obrigatória'
            })
            return
        }

        if(!confirmPassword) {
            res.status(422).json({
                message: 'A confirmação de senha é obrigatória'
            })
            return
        }

        if(password !== confirmPassword) {
            res.status(422).json({
                message: 'As senhas devem ser iguais!'
            })
            return
        }

        // check if user exists
        const userExists = await User.findOne({ email: email })

        if(userExists) {
            res.status(422).json({
                message: 'O email já esta cadastrado'
            })
            return
        }        

        //create a password 
        const salt = await bycrpt.genSalt(12)
        const passwordHash = await bycrpt.hash(password, salt)

        // create a user
        const user = new User({
            name, 
            age, 
            email, 
            password: passwordHash
        })

        try {
            await user.save()

        } catch (error) {
            res.status(500).json({
                message: error
            })
        }
    }

    static async login(req, res) {
        const {email, password} = req.body

        // validation
        if(!email) {
            res.status(422).json({
                message: 'O email é obrigatório'
            })
            return
        }

        if(!password) {
            res.status(422).json({
                message: 'A senha é obrigatória'
            })
            return
        }

        // check if user email exists in database
        const user = await User.findOne({ email: email })

        if(!user) {
            res.status(422).json({
                message: 'Não existe usuário com esse email!'
            })
            return
        }

        // check if password match with db
        const checkPassword = await bycrpt.compare(password, user.password)

        if(!checkPassword) {
            res.status(422).json({
                message: 'A senha esta incorreta'
            })
            return
        }

        await createUserToken(user, req, res)
    }
}