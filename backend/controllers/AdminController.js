const checkIfAdminIsTrue = require("../helpers/verifyAdminUser")
const checkToken = require("../helpers/verifyToken")
const User = require("../models/User")


module.exports = class AdminController {
    static async users(req, res) {
        const user = await User.find({ admin: false})
        console.log('Ok')
        
    }
}