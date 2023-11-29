/**
 * Declaração da variável Id, para contabilizar quantos funcionários vão ser cadastrados,
 * e a variável funcionário, que é uma lista de objetos.
 * 
 * Nesse modelo temos 3 maneiras de fazer a listagem dos elementos: geral, por nome ou por e-mail.
 */

const mongoose = require("mongoose");

const FuncionarioSchema = new mongoose.Schema({
  nome: String,
  salario: String,
  idade: Number,
  bonus: Number,
});

const FuncionarioModel = mongoose.model("Funcionario", FuncionarioSchema);

module.exports = {
  list: async function({ pagina = 1, limite = 10 }){
    const resultado = await FuncionarioModel.find({})
      .sort({ nome: 1 })
      .skipt((pagina - 1) * limite)
      .limit(limite)
      .lean();
    
    return resultado;
  },

  save: async function(nome, salario, idade){
    const funcionario = new FuncionarioModel({
      nome: nome,
      salario: salario,
      idade: idade,
      bonus: 0
    })
    return funcionario.save();
  },

  findById: async function(id){
    return await FuncionarioModel.findById(id).lean();
  },

  update: async function(id, obj){
    let funcionario = await FuncionarioModel.findById(id);
    if (!funcionario){
      return false;
    }

    const itens = Object.keys(obj).filter((key) => {
      return ["nome", "salario", "idade"].includes(key);
    });
    itens.forEach((key) => (item[key] = obj[key]));
    
    return funcionario.save();
  },

  updateBonus: async function(id, bonus){
    let item = await FuncionarioModel.findById(id);
    if(!item){
      return false;
    }

    item.bonus = bonus;
    return item.save();
  },

  delete: async function(id){
    return FuncionarioModel.findByIdAndDelete(id);
  },

  deleteMany: async function(){
    return FuncionarioModel.deleteMany();
  }
}