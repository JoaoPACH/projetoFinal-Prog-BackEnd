const mongoose = require('mongoose');

const ServicoModel = new mongoose.Schema({
  nome: String,
  preco: Number,
});

const Model = mongoose.model("Servico", ServicoModel);

module.exports = {
  list: async function({ pagina = 1, limite = 10 }){
    const resultado = await Model.find({})
      .sort({ nome: 1 })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .lean();
    
    return resultado;
  },

  save: async function ({ nome, preco }){
    const item = new Model({ nome, preco });
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

    const items = Object.keys(obj).filter((key) => {
      return ["nome", "preco"].includes(key);
    });
    items.forEach((key) => (item[key] = obj[key]));

    return item.save();
  },
  
  delete: async function(id){
    return Model.findByIdAndDelete(id);
  },

  deleteMany: async function(){
    return Model.deleteMany();
  }
}




