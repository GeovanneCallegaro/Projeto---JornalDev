const jwt = require('jsonwebtoken')
const getToken = require('./getToken')
const User = require('../models/User')

const checkOccupationUser = async (req, res, next) => {
    const token = getToken(req)
    const decoded = jwt.verify(token, "secret")
    const getUser = await User.findById(decoded.id)

    // check if exists token
    if(!token) {
        return res.status(401).json({ message: "Acesso Negado"})
    }

    // check if occupation is valid for creation posts
    if(getUser.occupation !== 'escritor') {
        return res.status(402).json({ message: 'Usuário não tem permissão para essa ação!'})
    } else if (getUser.admin !== 'Não' || getUser.occupation === 'escritor') {
        next()
    }
}

module.exports = checkOccupationUser