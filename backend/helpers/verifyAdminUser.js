const jwt = require('jsonwebtoken')
const getToken = require('./getToken')
const User = require('../models/User')

const checkIfAdminIsTrue = async (req, res, next) => {
        const token = getToken(req)
        const decoded = jwt.verify(token, "secret")
        const getUser = await User.findById(decoded.id)

    if(!token) {
        return res.status(401).json({ message: "Acesso Negado"})
    }

    if(getUser.admin !== true) {
        return res.status(200) .json({message: 'Não é admin!'})
    } 

    next()
}

module.exports = checkIfAdminIsTrue