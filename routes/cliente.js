const express = require('express');
const router = express.Router();

const ClienteModel = require('../model/Cliente');
const Auth = require('../helpers/Auth');
const { isValidObjectId } = require('mongoose');

router.get("/", Auth.validaAcesso, async (req, res) => {
  const {
    pagina,
    limite
  } = req.query;
  const data = await ClienteModel.list({ pagina, limite });
  
  res.send(data);
});

router.get("/:id", Auth.validaAcesso, async (req, res) => {
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ menssagem: "O ID informado não é válido." });
  } else{
    const data = await ClienteModel.findById(id);
    res.send(data);
  }
});

router.post("/", Auth.validaAcesso, async (req, res) => {
  const {
    cnpj,
    nome,
    idade
  } = req.body;
  if (cnpj && nome && idade){
    let obj = await ClienteModel.save(cnpj, nome, idade);
    res.json({ obj: obj });
  } else {
    res.status(400).json({ mensagem: "Falha ao inserir o novo cliente." });
  }
});

router.put("/:id", Auth.validaAcesso, async (req, res) => {
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não foi encontrado." })
  } else{
    const cliente = await ClienteModel.update(id, req.body);
    req.json({
      mensagem: "Cliente editado com sucesso.",
      cliente
    });
  }
});

router.delete("/:id", Auth.validaAcesso, async (req, res) => {
  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "Falha ao excluir o cliente."});
  } else{
    const cliente = await ClienteModel.delete(id);
    res.json({
      mensagem: "Cliente excluido com sucesso",
      cliente
    });
  }
});

module.exports = router;
