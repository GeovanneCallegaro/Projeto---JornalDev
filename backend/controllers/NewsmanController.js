const getToken = require("../helpers/getToken")
const getUserByToken = require("../helpers/getUserByToken")
const Post = require("../models/Posts")


module.exports = class NewsmanController {
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

        const post = new Post({
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
}