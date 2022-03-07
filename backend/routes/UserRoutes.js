const router = require('express').Router()

const UserController = require('../controllers/UserController')
const checkToken = require('../helpers/verifyToken')


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edituser/:id', checkToken, UserController.editUser)

module.exports = router