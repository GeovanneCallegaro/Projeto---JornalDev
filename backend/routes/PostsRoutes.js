const router = require('express').Router()

const PostsController = require('../controllers/PostsController.js')

const checkToken = require('../helpers/verifyToken')
const checkOccupationUser = require('../helpers/verifyOccupationIsNewsman')

router.post('/createnotice', checkToken, checkOccupationUser, PostsController.createNewNotice)
router.get('/:id', checkToken, checkOccupationUser, PostsController.getPostById)
router.get('/user/:id', checkToken, checkOccupationUser, PostsController.getAllPostUser)
router.get('', PostsController.getAllPosts)

module.exports = router