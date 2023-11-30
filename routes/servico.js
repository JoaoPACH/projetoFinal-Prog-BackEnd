const express = require('express');
const router = express.Router();

const ServicoModel = require('../model/Cliente');
const Auth = require('../helpers/Auth');
const { isValidObjectId } = require('mongoose');

router.get("/", Auth.validaAcesso, async (req, res) => {
  // #swagger.summary = 'Listar Serviços'
  
  const {
    pagina,
    limite
  } = req.query;
  const data = await ServicoModel.list({ pagina, limite });

  res.send(data);
});

router.get("/:id", Auth.validaAcesso, async (req, res) => {
  // #swagger.summary = 'Buscar Serviço'
  
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não é válido." });
  } else{
    const data = await ServicoModel.findById(id);
    res.send(data);
  }
});

router.post("/", Auth.validaAcesso, async (req, res) => {
  // #swagger.summary = 'Incluir Serviço'

  const {
    nome,
    preco
  } = req.body;

  if(nome && preco){
    let obj = await ServicoModel.save(nome, preco);
    res.json({ obj: obj });
  } else{
    res.status(400).json({ mensagem: "Falha ao inserir o novo serviço." });
  }
});

router.put("/:id", Auth.validaAcesso, async (req, res) => {
  // #swagger.summary = 'Editar Serviço'
  
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não é válido." });
  } else{
    const servico = await ServicoModel.update(id, req.body);
    req.json({
      mensagem: "Serviço editado com sucesso.",
      servico
    });
  }
});

router.delete("/:id", Auth.validaAcesso, async (req, res) => {
  // #swagger.summary = 'Excluir Serviço'
  
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "Falha ao excluir o serviço." })
  } else{
    const servico = await ServicoModel.delete(id);
    res.json({
      mensagem: "Serviço excluido com sucesso",
      servico
    });
  }
});

module.exports = router;
