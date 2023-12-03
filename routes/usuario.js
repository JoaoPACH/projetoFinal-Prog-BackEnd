const express = require('express');
const router = express.Router();

const UsuarioModel = require('../model/Usuario');
const Auth = require('../helpers/Auth');
const { isValidObjectId } = require('mongoose');

router.get("/", Auth.validaAdmin, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Listar Usuários (Apenas Admin)'
    #swagger.tags = ['Usuario']
  */

  const {
    pagina,
    limite
  } = req.query;
  const usuarios = await UsuarioModel.list({
    pagina,
    limite
  });

  res.status(200).send(usuarios);
});

router.get("/:id", Auth.validaAdmin, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Buscar Usuário (Apenas Admin)'
    #swagger.tags = ['Usuario']
  */

  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({
    menssagem: "O ID informado não é válido."
    });
  } else {
    const data = await UsuarioModel.findById(id);
    res.send(data);
  }
});

router.post("/", Auth.validaAdmin, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Criar Usuário Comum (Apenas Admin)'
    #swagger.tags = ['Usuario']
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        nome: 'John Doe',
        usuario: 'jhondoe',
        senha: 'jhon123'
      }
    }
  */

  const {
    nome,
    usuario,
    senha
  } = req.body;

  if(nome && usuario && senha){
    const user = await UsuarioModel.save({
      nome,
      usuario,
      senha
    });
    res.json({
      mensagem: "Usuario criado com sucesso.",
      user
    });
  } else{
    res.status(400).json({
      mensagem: "Falha ao inserir o novo usuarário o acesso."
    });
    return;
  }
});

router.post("/admin", Auth.validaAdmin, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Criar Usuário Administrador (Apenas Admin)'
    #swagger.tags = ['Usuario']
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        nome: 'Administrador',
        usuario: 'adm',
        senha: 'adm123'
      }
    }
  */

  const {
    nome,
    usuario,
    senha
  } = req.body;

  if(!nome || !usuario || !senha){
    const user = await UsuarioModel.saveAdmin({
      nome,
      usuario,
      senha
    });
    res.status(200).send(user);
  } else{
    res.status(400).json({
      mensagem: "Falha ao inserir o novo usuarário o acesso."
    });
    return;
  }
});

router.put("/", Auth.validaAcesso, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Alterar o seu próprio usuário'
    #swagger.tags = ['Usuario']
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        nome: 'John Doe'
      }
    }
  */

  if (!req.body.nome){
    res.status(400).json({
      mensagem: "O nome não foi informado, por favor, verifique."
    });
  }

  const usuario = await UsuarioModel.selfUpdate(req.usuario, req.body);
  res.status(200).json({
    mensagem: "O perfil do usuário foi atualizado com sucesso.",
    usuario
  });
});

router.put("/:id", Auth.validaAdmin, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Alterar qualquer Usuário (Apenas Admin)'
    #swagger.tags = ['Usuario']
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        nome: 'John Doe 2',
        usuario: 'jhondoe2',
        senha: 'jhon321'
      }
    }
  */

  const {
    id
  } = req.params;
  
  if(!isValidObjectId(id)){
    res.status(400).json({
      mensagem: "O ID informado não foi encontrado."
    });
  } else{
    const usuario = await UsuarioModel.update(id, req.body);
    res.json({
      mensagem: "Usuario editado com sucesso.",
      usuario
    });
  }
});

router.delete(":id", Auth.validaAdmin, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Remover Usuário (Apenas Admin)'
    #swagger.tags = ['Usuario']
  */

  const {
    id
  } = req.params;

  if(!isValidObjectId(id)){
    res.status(400).json({
      mensagem: "Falha ao excluir o usuário."
    });
  } else{
    const usuario = await UsuarioModel.delete(id);
    res.json({
      mensagem: "Usuario excluido com sucesso.",
      usuario
    });
  }
});

module.exports = router;
