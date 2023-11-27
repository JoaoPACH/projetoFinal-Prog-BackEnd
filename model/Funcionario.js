/**
 * Declaração da variável Id, para contabilizar quantos funcionários vão ser cadastrados,
 * e a variável funcionário, que é uma lista de objetos.
 * 
 * Nesse modelo temos 3 maneiras de fazer a listagem dos elementos: geral, por nome ou por e-mail.
 */

const mongoose = require("mongoose");

let ids = 0;
let funcionario = [];

const FuncionarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: Number
});

const FuncionarioModel = mongoose.model("Funcionario", FuncionarioSchema);

module.exports = {
  save: async function(nome, email, senha){
    const funcionario = new FuncionarioModel({
      id: ++ids,
      nome: nome,
      email: email,
      senha: senha
    })
    await funcionario.save();
    return funcionario;
  },
  update: async function(id, obj){
    let funcionario = await FuncionarioModel.findById(id);
    if (!funcionario){
      let obj = {
        id: id,
        nome: nome,
        email: email,
        senha: senha
      }
    }
    Object.keys(obj).forEach(key => funcionario[key] = obj[key]);
    await funcionario.save();
    return funcionario;
  },
  list: async function(){
    const funcionarios = await FuncionarioModel.find({}).lean()
    return funcionarios;
  },
  listByName(nome){
    let lista = []
    for (let cont = 0; cont < funcionario.length; cont++){
      if(funcionario[cont].nome.toUpperCase().startsWith(nome.toUpperCase())){
        lista.push(funcionario[cont]);
      }
    }
    return lista;
  },
  listByEmail(email){
    let lista = [];
    for (let cont = 0; cont < funcionario.length; cont++){
      if(funcionario[cont].email == email){
        lista.push(funcionario[cont]);
      }
    }
    return lista;
  },
  getElementById: async function(id){
    let posicao = this.getPositionById(id);
    if (posicao >= 0){
      return funcionario[posicao];
    }
  },
  getPositionById(id){
    for (let cont = 0; cont < funcionario.length; cont++){
      if(funcionario[cont].id == id){
        return cont;
      }
    }
    return ;
  },
  delete: async function(id){
    return await FuncionarioModel.findByIdAndDelete(id);
  }
}