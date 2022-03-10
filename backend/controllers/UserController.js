const User = require('../models/User')
const bycrpt = require('bcrypt')
const createUserToken = require('../helpers/createUserToken')
const getToken = require('../helpers/getToken')
const getUserByToken = require('../helpers/getUserBytoken')
const jwt = require('jsonwebtoken')
const { mongoose } = require('mongoose')


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
            password: passwordHash, 
            admin: false, 
            occupation: 'usuário',
            posts: [
                {
                    title: '', 
                    subtitle: '', 
                    theme: '', 
                    imageThumb: ''
                },
            ]
        })

        try {
            await user.save()
            
        } catch (error) {
            res.status(500).json({
                message: error
            })
        }

        res.status(200).json({
            message: 'O usuário foi cadastrado com sucesso!'
        })
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

    static async checkUser(req, res) {
        let currentUser 

        if(req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, "secret")

            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }
        
        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const id = mongoose.Types.ObjectId(req.params.id)
        const findIdUser = await User.findById(id).select('-password')

        if(!findIdUser) {
            res.status(402).json({
                message: 'Usuário não encontrado!'
            })
            return
        }

        res.status(200).json({ findIdUser })
    }

    static async editUser(req, res) {
        const id = mongoose.Types.ObjectId(req.params.id)

        // check if users exists 
        const token = getToken(req)
        const user = await getUserByToken(token)

        const {name, age, email, password, confirmPassword} = req.body

        // validations 

        if(!name) {
            res.status(402).json({
                message: 'O nome é obrigatório!'
            })
        }

        user.name = name

        if(!age) {
            res.status(402).json({
                message: 'A idade é obrigatória!'
            })
        }

        user.age = age

        if(!email) {
            res.status(402).json({
                message: 'o email é obrigatório'
            })
        }

        // check if email has already taken
        const userExists = await User.findOne({email: email})

        if(user.email != email && userExists) {
            res.status(402).json({
                message: 'O email já esta cadastrado!'
            })
            return
        }

        user.email = email

        if(password !== confirmPassword) {
            res.status(422).json({ message: 'As senhas devem ser iguais' })
            return
            } else if(password === confirmPassword &&password != null) {
            //creating a password
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            user.password = passwordHash
        }

        try {
            // return user updated data
            await User.findOneAndUpdate(
                {_id: user._id},
                {$set: user},
                {new: true}
            )

            res.status(200).json({
                message: 'Usuário atualizado com sucesso'
            })
        } catch(error) {
            res.status(500).json({message: 'Não foi possível atualizar o usuário!'})
        }
    }
}