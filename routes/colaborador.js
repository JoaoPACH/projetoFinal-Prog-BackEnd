/**
 * Declaração do express e criar o meu router, elemento que vai ser exportado
 * ao final desse código, para que possa ser utilizado em outros códigos.
 */

const express = require('express');
const router = express.Router();

const ColaboradorModel = require('../model/Colaborador');
const Auth = require("../helpers/Auth");
const { isValidObjectId } = require("mongoose");

/**
 * Código responsável por listar todos os elementos da lista.
 */

router.get('/', Auth.validaAcesso, async (req, res) => {
  /* 
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Listar Colaboradores.'
    #swagger.tags = ['Colaborador']
  */

  const {
    pagina,
    limite
  } = req.query;
  const data = await ColaboradorModel.list({ pagina, limite });
  res.send(data);
});

router.get('/:id', Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Buscar Colaborador.'
    #swagger.tags = ['Colaborador']
  */

  const {
    id
  } = req.params;
  
  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não é válido." })
  } else {
    const data = await ColaboradorModel.findById(id);
    res.send(data);
  }
});

router.post('/', Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Incluir Colaborador.'
    #swagger.tags = ['Colaborador']
  */

  const {
    nome,
    salario,
    idade
  } = req.body;

  if(nome && salario && idade){
    let obj = ColaboradorModel.save(nome, salario, idade);
    res.json({ obj: obj })
  } else {
    res.status(400).json({ mensagem: "Falha ao inserir o novo colaborador." })
  }
});

router.put('/:id', Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Editar Colaborador.'
    #swagger.tags = ['Colaborador']
  */

  const {
    id
  } = req.params;
  
  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não foi encontrado." });
  } else{
    const colaborador = await ColaboradorModel.update(id, req.body);
    res.json({
      mensagem: "Colaborador editado com sucesso.",
      colaborador
    });
  }
});

router.delete('/:id', Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Excluir Colaborador.'
    #swagger.tags = ['Colaborador']
  */
  
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "Falha ao excluir o colaborador." });
  } else{
    const colaborador = await ColaboradorModel.delete(id);
    res.json({
      mensagem: "Colaborador excluido com sucesso.",
      colaborador
    });
  }
});

module.exports = router;
