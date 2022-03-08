

module.exports = class NewsmanController {
    static async createNewNotice(req, res) {
        res.status(200).json({
            message: 'Ok!'
        })
    }
}