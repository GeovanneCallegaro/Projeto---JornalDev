const checkIfAdminIsTrue = require("../helpers/verifyAdminUser")


module.exports = class AdminController {
    static async users(req, res) {
        await checkIfAdminIsTrue(req, res)
    }
}