const router = require('express').Router()

const PostsController = require('../controllers/PostsController.js')

const checkToken = require('../helpers/verifyToken')
const checkOccupationUser = require('../helpers/verifyOccupationIsNewsman')

router.post('/createnotice', checkToken, checkOccupationUser, PostsController.createNewNotice)
router.get('/:id', checkToken, checkOccupationUser, PostsController.getPostById)
router.get('/user/:id', checkToken, checkOccupationUser, PostsController.getAllPostUser)
router.get('', PostsController.getAllPosts)
router.patch('/user/editnotice/:id', checkToken, checkOccupationUser, PostsController.editPosts)
router.delete('/:id', checkToken, checkOccupationUser, PostsController.deletePostById)

module.exports = router