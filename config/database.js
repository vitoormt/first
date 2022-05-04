const mongoose = require('mongoose')

const conexao = async() => {
    //conexao local
    //var bdlocal = await mongoose.connect('mongodb://localhost/ac1tri')
    //conexao atlas
    var atlas = await mongoose.connect('mongodb+srv://AC1:Vitor123456@cluster0.mabqy.mongodb.net/ACZINHA')
}

module.exports = conexao
