const mongoose = require('mongoose');

const ClienteModel = new mongoose.Schema({
  cnpj: String,
  nome: String,
  idade: Number,
});

const Model = mongoose.model("Cliente", ClienteModel);

module.exports = {
  list: async function ({ pagina = 1, limite = 10 }){
    const resultado = await Model.find({})
      .sort({ nome: 1 })
      .skip(( pagina - 1) * limite)
      .limit(limite)
      .lean();

    return resultado;
  },

  save: async function ({ cnpj, nome, idade }){
    const item = new Model({ cnpj, nome, idade });
    return item.save();
  },

  findById: async function(id){
    return await Model.findById(id).lean();
  },

  update: async function(id, obj){
    let item = await Model.findById(id);
    if(!item){
      return false;
    }

    const itens = Object.keys(obj).filter((key) => {
      return ["cnpj", "nome", "idade"].includes(key);
    });
    itens.forEach((key) => (item[key] = obj[key]));

    return item.save();
  },

  delete: async function(id){
    return Model.findByIdAndDelete(id);
  },

  deleteMany: async function(){
    return Model.deleteMany();
  }
}




