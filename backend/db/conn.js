const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/journal')
    console.log('Conectou ao moongose')
}

main().catch((err) => console.error(err))

module.exports = mongoose