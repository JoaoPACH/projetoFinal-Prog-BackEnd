/**
 * Declaração do express e criar o meu router, elemento que vai ser exportado
 * ao final desse código, para que possa ser utilizado em outros códigos.
 */

const express = require('express');
const router = express.Router();

const FuncionarioModel = require('../model/Funcionario');

/**
 * Código responsável por listar todos os elementos da lista.
 */

router.get('/', (req, res) => {
  let lista = FuncionarioModel.list();
  if(req.query.nome){
    lista = FuncionarioModel.listByName(req.query.nome);
  } else if(req.query.email){
    lista = FuncionarioModel.listByEmail(req.query.email)
  }
  
  res.json({
    count: lista.length,
    lista: lista
  });
});

router.get('/:id', (req, res) => {
  let obj = FuncionarioModel.getElementById(req.params.id);
  if(obj){
    res.json({ obj: obj })
  } else {
    res.status(404).json({ mensagem: "O ID informado não é válido." })
  }
});

router.post('/', (req, res) => {
  let {
    nome,
    email,
    senha
  } = req.body;
  if(nome && email && senha){
    let obj = FuncionarioModel.save(nome, email, senha);
    res.json({ obj: obj })
  } else {
    res.status(400).json({ mensagem: "Falha ao inserir o novo colaborador." })
  }
});

router.put('/:id', (req, res) => {
  let {
    nome,
    email,
    senha
  } = req.body;
  let id = req.params.id;
  if(nome && email && senha){
    let obj = FuncionarioModel.update(id, nome, email, senha)
    if(obj){
      res.json({ obj: obj })
    } else{
      res.status(400).json({ mensagem: "O ID informado não foi encontrado." })
    }
  } else {
    res.status(400).json({ mensagem: "Falha ao alterar o colaborador." })
  }

});

router.delete('/:id', (req, res) => {
  let id = req.params.id;
  if (FuncionarioModel.delete(id)){
    res.json({ "mensagem": "Colaborador excluido com sucesso" });
  } else{
    res.status(400).json({ mensagem: "Falha ao excluir o colaborador." });
  }
});

module.exports = router;
