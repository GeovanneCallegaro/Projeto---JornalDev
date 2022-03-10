const getToken = require("../helpers/getToken")
const getUserByToken = require("../helpers/getUserByToken")
const Posts = require("../models/Posts")

const ObjectId = require('mongoose').Types.ObjectId



module.exports = class PostsController {
    static async createNewNotice(req, res) {
        const {title, subtitle, theme} = req.body

        // validations 
        if(!title) {
            res.status(402).json({
                message: 'O título é obrigatório!'
            })
        }

        if(!subtitle) {
            res.status(402).json({
                message: 'O subtítulo é obrigatório!'
            })
        }

        if(!theme) {
            res.status(402).json({
                message: 'O tema da notícia é obrigatório!'
            })
        }

        // get news writer user
        const token = getToken(req)
        const user = await getUserByToken(token)

        const post = new Posts({
            title, 
            subtitle, 
            theme,
            user: {
                id: user._id,
                name: user.name, 
            }
        })

        try {
            const newPost = await post.save()
            res.status(201).json({message: 'Post criado com sucesso!', newPost})
        } catch(err) {
            res.status(402).json({ message: err})
        }
    }

    static async getPostById(req, res) {
        const id = req.params.id

        // check if id is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido!'})
            return
        }

        // check if post exists
        const post = await Posts.findOne({_id: id})

        if(!post) {
            res.status(422).json({
                message: 'Post não encontrado!'
            })
            return
        }

        res.status(200).json({
            post: post
        })

    }

    static async getAllPostUser(req, res) {
        // get user by token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const posts = await Posts.find({'user.id': user._id}).sort('-createdAt')

        res.status(200).json({
            posts: posts
        })
    }
}