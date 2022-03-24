const router = require('express').Router()

const PostsController = require('../controllers/PostsController.js')

const checkToken = require('../helpers/verifyToken')
const checkOccupationUser = require('../helpers/verifyOccupationIsNewsman')

router.get('/myposts', checkToken, PostsController.getAllPostsUser)
router.post('/createnotice', checkToken, checkOccupationUser, PostsController.createNewNotice)
router.get('/:id', checkToken, checkOccupationUser, PostsController.getPostById)
router.get('', PostsController.getAllPosts)
router.patch('/editnotice/:id', checkToken, checkOccupationUser, PostsController.editPosts)
router.delete('/:id', checkToken, checkOccupationUser, PostsController.deletePostById)

module.exports = router