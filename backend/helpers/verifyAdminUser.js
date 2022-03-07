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

    try {
        if(getUser.admin) {
            res.status(200) .json({message: 'OK!'})
        } else {
            next()
        }
    } catch(err) {
        return res.status(400).json({message: "Usuário não é admin!"})
    }
}

module.exports = checkIfAdminIsTrue