const express = require('express');
const router = express.Router();

const Usuario = require('../model/Usuario');
const Cliente = require('../model/Cliente');
const Colaborador = require('../model/Colaborador');
const Servico = require('../model/Servico');
const Venda = require('../model/Venda');

const Auth = require('../helpers/Auth');

async function install() {
  await Promise.all([
    Usuario.saveAdmin({
      nome: "Administrador",
      usuario: "admin",
      senha: "#Admin123",
    }),
    Usuario.save({ nome: "User1", usuario: "user1", senha: "#User123" }),
    Usuario.save({ nome: "User2", usuario: "user2", senha: "#User321" }),
    Usuario.save({ nome: "User3", usuario: "user3", senha: "#User132" }),
    Usuario.save({ nome: "User4", usuario: "user4", senha: "#User312" }),
  ]);

  const colaboradores = await Promise.all([
    Colaborador.save({ idade: 21, nome: "Cleber", salario: 1200 }),
    Colaborador.save({ idade: 24, nome: "Junior", salario: 1300 }),
    Colaborador.save({ idade: 25, nome: "Roberto", salario: 1300 }),
    Colaborador.save({ idade: 23, nome: "Vitor", salario: 1600 }),
    Colaborador.save({ idade: 30, nome: "Tiago", salario: 2000 }),
  ]);

  const clientes = await Promise.all([
    Cliente.save({ cnpj: "00.000.000/0001-00", idade: 27, nome: "João" }),
    Cliente.save({ cnpj: "11.111.111/0001-11", idade: 42, nome: "Gabriel" }),
    Cliente.save({ cnpj: "22.222.222/0001-22", idade: 33, nome: "Rafael" }),
    Cliente.save({ cnpj: "33.333.333/0001-33", idade: 31, nome: "Lucas" }),
    Cliente.save({ cnpj: "44.444.444/0001-44", idade: 33, nome: "Mateus" }),
  ]);

  const servicos = await Promise.all([
    Servico.save({ nome: "Corte de Cabelo", preco: 30 }),
    Servico.save({ nome: "Corte Degrade", preco: 40 }),
    Servico.save({ nome: "Fazer a Barba", preco: 15 }),
    Servico.save({ nome: "Fazer a Sombrancelha", preco: 20 }),
    Servico.save({ nome: "Pintura de Cabelo", preco: 45 }),
  ]);

  for (let i = 0; i < colaboradores.length; i++) {
    await Venda.save({
      empregado: colaboradores[0],
      cliente: clientes[0],
      servico: servicos[0],
    });
  }
}

async function resetar(){
  await Usuario.deleteMany();
  await Cliente.deleteMany();
  await Colaborador.deleteMany();
  await Servico.deleteMany();
  await Venda.deleteMany();
}

router.get("/install", async (req, res) => {
  /*
    #swagger.summary = 'Instalar Sistema, caso ainda não esteja instalado.'
    #swagger.tags = ['Sistema']
  */
  
  const usuarios = await Usuario.list({});

  if(!usuarios.length){
    await install();
    res.status(200).json({
      mensagem: "Sistema atualizado com sucesso."
    });
  } else{
    res.status(200).json({
      mensagem: "O sistema já está instalado."
    })
  }
});

router.post("/reset", Auth.validaAdmin, async (req, res) => {
  /*
    #swagger.security = [{ "Bearer": [] }]
    #swagger.summary = 'Resetar o sistema, limpa todas tabelas e instala novamente.'
    #swagger.tags = ['Sistema']
  */
  
  await resetar();
  await install();

  res.status(200).json({
    mensagem: "Sistema resetado com sucesso."
  });
});

module.exports = router;
