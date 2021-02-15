const db = require("../banco/modelos");
const nodemailer = require('nodemailer');
const config = require('../config');
const shopify = require('./shopify');

const diferenca_em_minutos = (dt2, dt1) => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
}

const agendarEmail = async (id_usuario) => {

    const email = await db.email.findOne({
        where: { 
            fk_id_usuario: id_usuario,
            status: true
        }
    });

    if (email) return;

    await db.email.create({
        fk_id_usuario: id_usuario,
        status: true
    })

}

const enviarEmails = async () => {
    console.log("Verificando se para tem emails a enviar.")
    const emails = await db.email.findAll({
        where: {
            status: true
        },
        include: db.usuario
    })

    const produtos = await shopify.recuperarProdutos();

    if (emails) {
        emails.forEach( async (email) => {
            let diferenca = diferenca_em_minutos(new Date(), email.createdAt)
            console.log('diferenca: ', diferenca, 'minutos')
            if (diferenca >= 2) {
                await processarEmail(email, produtos);
            }
        })
    }

}

const processarEmail = async (email, produtos) => {

    const favoritos = await db.produto_favorito.findAll({
        where: {
            fk_id_usuario: email.fk_id_usuario
        },
        raw: true
    });

    let texto = 'Você não possuí nenhum produto favorito :('
    
    if (favoritos) {
        texto = 'Produtos favoritos:\n\n'
        for (let i = 0; i < favoritos.length; i++) {
            const favorito = favoritos[i];
            let produto = produtos.products.find( p =>  p.id == favorito.fk_id_produto)
            texto += produto.title + '\n'
            
        }
    }

    email.status = false;
    await email.save()

    enviarEmail(email.usuario.email, texto)

}

const enviarEmail = (email, texto) => {
    let mailOptions = {
        from: config.email.from,
        to: email,
        subject: 'Atualização produtos favoritos',
        text: texto
    };

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: config.email.user,
          pass: config.email.pass
        }
    });

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
    });
  
  
}

module.exports = {
    agendarEmail,
    enviarEmails
}