const jwt = require('jsonwebtoken')
const getToken = require('./getToken')
const User = require('../models/User')

const checkIfAdminIsTrue = async (req, res, next) => {
    const token = getToken(req)
    const decoded = jwt.verify(token, "secret")
    const getUser = await User.findById(decoded.id)

    // check if exists token
    if(!token) {
        return res.status(401).json({ message: "Acesso Negado"})
    }

    // check if user logged is admin
    if(getUser.admin !== 'Sim') {
        return res.status(200) .json({message: 'Não é admin!'})
    } 

    next()
}

module.exports = checkIfAdminIsTrue