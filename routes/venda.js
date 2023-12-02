const express = require('express');
const router = express.Router();

const ServicoModel = require('../model/Servico');
const VendaModel = require('../model/Venda');
const Auth = require('../helpers/Auth');
const { isValidObjectId } = require('mongoose');

router.get("/", Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Listar Vendas'
  */

  const {
    pagina,
    limite
  } = req.query;
  const data = await VendaModel.list({ pagina, limite });
  res.send(data);
});

router.get("/:id", Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Buscar Venda'
  */

  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({ mensagem: "O ID informado não é valido." })
  } else {
    const data = await VendaModel.findById(id);
    res.send(data);
  }
});

router.post("/", Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Incluir Venda'
  */

  const {
    valor,
    servico,
    colaborador,
    cliente
  } = req.body;

  if(
    (servico && !isValidObjectId(servico)) ||
    (empregado && !isValidObjectId(empregado)) ||
    (cliente && !isValidObjectId(cliente))
  ){
    res.status(400).json({ mensagem: "Falha ao inserir a nova venda." })
  } else{
    if (isNaN(valor)){
      const servicoVendido = await ServicoModel.findById(servico);

      if(!servicoVendido){
        res.status(400).json({ mensagem: "Preço ou Servico Inválidos." });
        return
      }

      valor = servicoVendido.preco || 0;
    }

    const venda = await VendaModel.save({
      servico,
      colaborador,
      cliente,
      valor: +valor,
    });

    res.json({
      mensagem: "Venda criada com sucesso!",
      venda
    })
  }
});

router.put("/:id", Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Editar Venda'
  */

  const {
    id
  } = req.params;
  const {
    servico,
    colaborador,
    cliente
  } = req.body;

  if (
    (servico && !isValidObjectId(servico)) ||
    (empregado && !isValidObjectId(empregado)) ||
    (cliente && !isValidObjectId(cliente))
  ) {
    res.status(400).json({ mensagem: "O ID informado não foi encontrado." });
  } else{
    const venda = await VendaModel.update(id, req.body);
    res.json({
      mensagem: "Venda editada com sucesso.",
      venda
    })
  }
});

router.delete("/:id", Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Excluir Vendas'
  */

  const {
    id
  } = req.params;

  if(!isValidObjectId){
    res.status(400).json({ mensagem: "Falha ao excluir a venda."});
  } else{
    const venda = await VendaModel.delete(id);
    res.json({
      mensagem: "Venda removida com sucesso.",
      venda
    });
  }
});

module.exports = router;
