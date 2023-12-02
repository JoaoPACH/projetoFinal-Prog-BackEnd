/**
 * Declaração da variável Id, para contabilizar quantos funcionários vão ser cadastrados,
 * e a variável funcionário, que é uma lista de objetos.
 * 
 * Nesse modelo temos 3 maneiras de fazer a listagem dos elementos: geral, por nome ou por e-mail.
 */

const mongoose = require("mongoose");

const ColaboradorSchema = new mongoose.Schema({
  nome: String,
  salario: String,
  idade: Number,
  bonus: Number,
});

const ColaboradorModel = mongoose.model("Colaborador", ColaboradorSchema);

module.exports = {
  list: async function({ pagina = 1, limite = 10 }){
    const resultado = await ColaboradorModel.find({})
      .sort({ nome: 1 })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .lean();
    
    return resultado;
  },

  save: async function(nome, salario, idade){
    const colaborador = new ColaboradorModel({
      nome: nome,
      salario: salario,
      idade: idade,
      bonus: 0
    })
    return colaborador.save();
  },

  findById: async function(id){
    return await ColaboradorModel.findById(id).lean();
  },

  update: async function(id, obj){
    let colaborador = await ColaboradorModel.findById(id);
    if (!colaborador){
      return false;
    }

    const itens = Object.keys(obj).filter((key) => {
      return ["nome", "salario", "idade"].includes(key);
    });
    itens.forEach((key) => (item[key] = obj[key]));
    
    return colaborador.save();
  },

  updateBonus: async function(id, bonus){
    let item = await ColaboradorModel.findById(id);
    if(!item){
      return false;
    }

    item.bonus = bonus;
    return item.save();
  },

  delete: async function(id){
    return ColaboradorModel.findByIdAndDelete(id);
  },

  deleteMany: async function(){
    return ColaboradorModel.deleteMany();
  }
}