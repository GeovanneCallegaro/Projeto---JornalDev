const router = require('express').Router()

const AdminController = require('../controllers/AdminController')

const checkToken = require('../helpers/verifyToken')
const checkIfAdminIsTrue = require('../helpers/verifyAdminUser')

router.get('/users', checkToken, checkIfAdminIsTrue, AdminController.getAllUsers)
router.get('/user/:id', checkToken, checkIfAdminIsTrue, AdminController.getUserById)
router.delete('/user/:id', checkToken, checkIfAdminIsTrue, AdminController.deleteUserById)
router.patch('/user/edit/:id', checkToken, checkIfAdminIsTrue, AdminController.editUser)

module.exports = router