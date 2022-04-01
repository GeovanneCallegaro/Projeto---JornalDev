const mongoose = require('mongoose')

const mongodb_conn = () => {
    if(!process.env.CONN_MONGODB) throw new Error('É necessário um arquivo .env com a conexão do MONGODB')
    return process.env.CONN_MONGODB
}

async function main() {
    await mongoose.connect(mongodb_conn())
    console.log('Conectou ao moongose')
}

main().catch((err) => console.log(err))

module.exports = mongoose