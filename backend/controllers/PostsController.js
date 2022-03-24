const getToken = require("../helpers/getToken")
const getUserByToken = require("../helpers/getUserByToken")
const Posts = require("../models/Posts")

const ObjectId = require('mongoose').Types.ObjectId



module.exports = class PostsController {
    static async createNewNotice(req, res) {
        const {title, subtitle, theme} = req.body

        // validations 
        if(!title) {
            res.status(422).json({
                message: 'O título é obrigatório!'
            })
            return
        }

        if(!subtitle) {
            res.status(422).json({
                message: 'O subtítulo é obrigatório!'
            })
            return
        }

        if(!theme) {
            res.status(422).json({
                message: 'O tema da notícia é obrigatório!'
            })
            return
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

    static async getAllPostsUser(req, res) {
        // get user by token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const posts = await Posts.find({'user.id': user._id}).sort('-createdAt')

        res.status(200).json({
            posts: posts
        })
    }

    static async getAllPosts(req, res) {
        const posts = await Posts.find().sort('-createdAt')

        res.status(200).json({
            posts: posts
        })
    }

    static async editPosts(req, res) {
        const id = req.params.id 

        // check if id is valid
        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido!'})
            return
        }

        const {title, subtitle, theme} = req.body
        const updatedNotice = {}

        // check if posts exist
        const post = await Posts.findOne({'_id': id})

        if(!post) {
            res.status(422).json({
                message: 'Post não encontrado!'
            })
            return
        }

        // checking if the logged in user registered the post
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(post.user.id.toString() !== user._id.toString()) {
            res.status(402).json({
                message: 'O usuário não cadastrou esse post!'
            })
            return
        }

        // validations
        if(!title) {
            res.status(402).json({
                message: 'O título é obrigatório!'
            })
            return
        } else {
            updatedNotice.title = title
        }

        if(!subtitle) {
            res.status(402).json({
                message: 'O subtítulo é obrigatório!'
            })
            return
        } else {
            updatedNotice.subtitle = subtitle
        }

        if(!theme) {
            res.status(402).json({
                message: 'O tema é obrigatório!'
            })
            return
        } else {
            updatedNotice.theme = theme
        }

        await Posts.findByIdAndUpdate(id, updatedNotice)
        
        res.status(200).json({message: 'Post atualizado com sucesso!'})
    }

    static async deletePostById(req, res) {
        const id = req.params.id

        // check if id is valid 
        if(!ObjectId.isValid(id)) {
            res.status(422).json({ message: 'ID inválido!'})
            return
        }

        // check if posts exists
        const post = await Posts.findOne({_id: id})

        if(!post) {
            res.status(402).json({
                message: 'Post não encontrado!'
            })
            return
        }

        // checking if the logged in user registered the post
        const token = getToken(req)
        const user = await getUserByToken(token)

        if(post.user.id.toString() !== user._id.toString()) {
            res.status(402).json({ message: 'Não foi possível concluir essa ação!'})
            return
        }

        await Posts.findByIdAndDelete(id)

        res.status(200).json({
            message: 'Post excluído com sucesso!'
        })
    }

    static async getPostsByTheme(req, res) {
        const theme = req.params.name

        const posts = await Posts.find({ 'theme': theme}).sort('-createdAt')

        if(!posts) {
            res.status(402).json({
                message: 'Não há posts correspondentes a esse tema!'
            })
        }

        res.status(200).json({
            posts: posts
        })
    }
}