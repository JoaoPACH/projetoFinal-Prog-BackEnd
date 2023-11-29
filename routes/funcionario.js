/**
 * Declaração do express e criar o meu router, elemento que vai ser exportado
 * ao final desse código, para que possa ser utilizado em outros códigos.
 */

const express = require('express');
const router = express.Router();

const FuncionarioModel = require('../model/Funcionario');
const Auth = require("../helpers/Auth");
const { isValidObjectId } = require("mongoose");

/**
 * Código responsável por listar todos os elementos da lista.
 */

router.get('/', Auth.validaAcesso, async (req, res) => {
  const {
    pagina,
    limite
  } = req.query;
  const data = await FuncionarioModel.list({ pagina, limite });
  res.send(data);
});

router.get('/:id', Auth.validaAcesso, async (req, res) => {
  const {
    id
  } = req.params;
  
  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não é válido." })
  } else {
    const data = await FuncionarioModel.findById(id);
    res.send(data);
  }
});

router.post('/', Auth.validaAcesso, async (req, res) => {
  const {
    nome,
    salario,
    senha
  } = req.body;

  if(nome && salario && senha){
    let obj = FuncionarioModel.save(nome, salario, senha);
    res.json({ obj: obj })
  } else {
    res.status(400).json({ mensagem: "Falha ao inserir o novo colaborador." })
  }
});

router.put('/:id', Auth.validaAcesso, async (req, res) => {
  const {
    id
  } = req.params;
  
  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não foi encontrado." });
  } else{
    const funcionario = await FuncionarioModel.update(id, req.body);
    res.json({
      mensagem: "Funcionario editado com sucesso.",
      funcionario
    });
  }
});

router.delete('/:id', Auth.validaAcesso, async (req, res) => {
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "Falha ao excluir o colaborador." });
  } else{
    const funcionario = await FuncionarioModel.delete(id);
    res.json({
      mensagem: "Colaborador excluido com sucesso.",
      funcionario
    });
  }
});

module.exports = router;
