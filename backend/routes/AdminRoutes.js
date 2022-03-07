const router = require('express').Router()

const AdminController = require('../controllers/AdminController')

const checkToken = require('../helpers/verifyToken')
const checkIfAdminIsTrue = require('../helpers/verifyAdminUser')

router.get('/users', checkToken, checkIfAdminIsTrue, AdminController.users)

module.exports = router