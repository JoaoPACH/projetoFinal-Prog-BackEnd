const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const UsuarioModel = require('../model/Usuario');

router.post("/", async (req, res) => {
  /*
    #swagger.summary = 'Autenticar'
    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        usuario: 'jhondoe',
        senha: 'jhon123'
      }
    }
  */

  let {
    usuario = "",
    senha
  } = req.body;

  const usuarioLogin = await UsuarioModel.findUsuario(usuario);

  if(usuarioLogin && usuarioLogin.senha === senha){
    const {
      usuario,
      admin
    } = usuarioLogin;

    const token = jwt.sign({
      usuario,
      admin
    }, "123!@#", {
      expiresIn: "2 hour",
    });
    res.json({
      authorized: true,
      token
    });
  } else{
    res.status(403).json({
      authorized: false,
      mensagem: "Login Inválido"
    });
  }
});

module.exports = router;



