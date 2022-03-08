const router = require('express').Router()

const NewsmanController = require('../controllers/NewsmanController.js')

const checkToken = require('../helpers/verifyToken')
const checkOccupationUser = require('../helpers/verifyOccupationIsNewsman')

router.get('/createnotice', checkToken, checkOccupationUser, NewsmanController.createNewNotice)

module.exports = router