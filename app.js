/**
 * Importação do Framework express, um framework web para NodeJS responsável por encapsular as requisições e respostas HTTP.
 * Para inicializar o express, vamos usar a constante app, assim podemos iniciar os middlewares que serão utilizados no projeto.
*/
const express = require('express');
const app = express();

/**
  * Códigos responsáveis por rodar os middlewares da aplicação. Os middlewares são funções responsáveis por processarem
  * uma requisição/resposta HTTP. Eles podem executar um código, alterar objetos de requisição e resposta,
  * finalizar uma requisição HTTP ou até mesmo chamar outro middleware.
*/
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
  * Código responsável pelas rotas que vamos utilizar para desenvolver os 03 CRUDs da aplicação. Ou seja,
  * desenvolver as rotas para que a gente consiga fazer a criação de uma requisição, listagem, modificar e deletar.
*/

FuncionarioRouter = require('./routes/funcionario');
app.use('/funcionario', FuncionarioRouter);

/**
  * Código responsável por inicializar o servidor na porta indicada acima,
  * pelas variável 'port', no caso, na porta 3001.
*/
 
app.listen(3001, () => {
  console.log('Aplicação rodando ...');
});


