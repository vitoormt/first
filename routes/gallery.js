var multer = require('multer')

module.exports = (app) => {
    //importar as configs do database
    var conexao = require('../config/database')
        //importar a model gallery
    var gallery = require('../models/gallery')

    //abrir o formulário
    app.get('/gallery', async(req, res) => {
        //conectar com o banco de dados
        conexao()
            //buscar os documentos gravados na coleção gallery
        var documentos = await gallery.find()
            //enviar os documentos para a página ejs
        res.render('gallery.ejs', { resultado: documentos })
    })

    //importar as configurações do upload
    var upload = require('../config/upload')
        //fazer o upload da imagem na pasta de destino
    app.post('/gallery', (req, res) => {

        //executar o upload da imagem
        upload(req, res, async(err) => {
            if (err instanceof multer.MulterError) {
                //res.send("Arquivo maior que o limite")
                res.render('erros.ejs', { erro: "Arquivo maior que o limite!" })
            } else if (err) {
                //res.send("Tipo de arquivo inválido")
                res.render('erros.ejs', { erro: "Tipo de Arquivo Inválido" })
            } else {
                //conectar com o databaase
                conexao()
                    //gravar o nome do arquivo na collection gallery
                var arquivo = await new gallery({
                        arquivo: req.file.filename
                    }).save()
                    //apos o upload voltar para o formulario
                res.redirect('/gallery')

            }
        })

    })
    //visualizar a imagem que será alterada
    app.get('/alterar_gallery',async(req,res)=>{
        //recuperar o id da barra de endereço
        var id = req.query.id
        //procurar um decomento com o id
        var procurar = await gallery.findOne({_id:id})
        //exebir a imagem localizada
        res.render('gallery_alterar.ejs', {dados:procurar})
    })

    //alterar a imagem selecionada
    app.post('/alterar_gallery', (req, res) => {
        //executar o upload da imagem
        upload(req, res, async(err) => {
            if (err instanceof multer.MulterError) {
                //res.send("Arquivo maior que o limite")
                res.render('erros.ejs', { erro: "Arquivo maior que o limite!" })
            } else if (err) {
                //res.send("Tipo de arquivo inválido")
                res.render('erros.ejs', { erro: "Tipo de Arquivo Inválido" })
            } else {
                //conectar com o databaase
                conexao()
                    //gravar o nome do arquivo na collection gallery
                var arquivo = await gallery.findOneAndUpdate(
                    {_id:req.query.id},
                    {
                        arquivo: req.file.filename
                    })
                    //apos o upload voltar para o formulario
                res.redirect('/gallery')
            }
        })

    })

}