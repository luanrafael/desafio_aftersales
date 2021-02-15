# desafio_aftersales [![Build Status](https://travis-ci.com/luanrafael/desafio_aftersales.svg?branch=main)](https://travis-ci.com/luanrafael/desafio_aftersales)

# requisitos
Antes de qualquer coisa vamos precisar ter em nosso ambiente o **Node** e **npm** devidamente instalados e configurados

[Node](https://nodejs.org/en/)

[npm](https://www.npmjs.com/)


# Instalação e configuração

Depois vamos clonar e instalar as dependências do projeto

```sh
    git clone https://github.com/luanrafael/desafio_aftersales.git
    cd desafio_aftersales
    npm install
```

Antes de iniciar a aplicação devemos configuar as credencias que o serviço de email irá utilizar, para isso navegue até o arquivo `server/app/config/index.js` e configure apropriadamente como o exemplo abaixo:

```javascript
module.exports = {
    'secret': '<>',
    'email': {
        'from': 'teste@email.com',
        'user': 'teste@email.com',
        'pass': 'senha1235'
    }
}
```

# inicialização
Terminada a configuração basta rodar o comando abaixo para iniciar a aplicação

```sh
    npm start
```

Se tudo estiver certo a aplicação será iniciada e você terá no seu output o seguinte conteúdo

```sh
> desafio_aftersales_server@1.0.0 start D:\repositorio\desafio_aftersales\server
> node ./bin/www

POST /api/usuario
POST /api/usuario/autenticar
GET /api/perfil
GET /api/produto
GET /api/produto/favoritos  
POST /api/produto/favorito  
DELETE /api/produto/favorito
GET /api/cron/email
Listening on port 5000
```


depois disso basta acessar os recursos da aplicação através da url:
http://localhost:5000

# Api Docs

[Documentação API - POSTMAN](https://www.getpostman.com/collections/f6fdaa9147a9b85f7244)

## Considerações

O serviço disponilizado utiliza-se de JWT como forma de autenticação, o token de autenticação pode ser recuperado através do endpoint `/api/usuario/autenticar` informando o email e senha do usuário, para as demais rotas autenticadas será preciso informar no header o parâmetro `x-access-token`.