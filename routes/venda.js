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
    #swagger.tags = ['Venda']
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
    #swagger.tags = ['Venda']
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
    #swagger.tags = ['Venda']
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        servico: '',
        empregado: '',
        cliente: ''
      }
    }
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
    #swagger.tags = ['Venda']
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        valor: 60
      }
    }
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
    #swagger.tags = ['Venda']
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
