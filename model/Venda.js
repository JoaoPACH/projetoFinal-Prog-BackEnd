const mongoose = require('mongoose');

const calcularBonus = require('../helpers/calcularBonus');

const VendasSchema = new mongoose.Schema({
  valor: Number,
  servico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Servico',
  },
  colaborador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Colaborador',
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
  }
});

const VendasModel = mongoose.model("Vendas", VendasSchema);

module.exports = {
  list: async function({ pagina = 1, limite = 10 }){
    const resultado = await VendasModel.find({})
      .sort({ _id: 1 })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .populate('colaborador')
      .populate('cliente')
      .populate('servico');
    
    return resultado;
  },
  
  save: async function({
    valor,
    servico,
    colaborador,
    cliente
  }){
    const item = new VendasModel({
      valor,
      servico,
      colaborador,
      cliente
    });
    const resultado = await item.save();
    await calcularBonus(colaborador);

    await resultado.populate('colaborador');
    await resultado.populate('servico');
    await resultado.populate('cliente');

    return resultado;
  },

  findById: async function(id){
    return await VendasModel.findById(id)
      .populate('colaborador')
      .populate('cliente')
      .populate('servico');
  },

  findByIdColaborador: async function(idColaborador){
    const resultado = await VendasModel.find({
      colaborador: idColaborador
    }).exec();

    return resultado;
  },

  update: async function(id, obj){
    let colaborador = await VendasModel.findById(id);
    if(!colaborador){
      return false;
    }

    const atualColaborador = new VendasModel(colaborador);

    const itens = Object.keys(obj).filter((key) => {
      return ["valor", "servico", "colaborador", "cliente"].includes(key);
    });
    itens.forEach((key) => (colaborador[key] = obj[key]));

    await colaborador.save();

    const mudouColaborador = atualColaborador.colaborador && atualColaborador.colaborador !== colaborador.colaborador;

    if(mudouColaborador){
      await calcularBonus(colaborador.colaborador);
      await calcularBonus(resultado.colaborador);
    }

    if(atualColaborador.valor !== colaborador.valor && !mudouColaborador){
      await calcularBonus(colaborador.colaborador);
    }

    await colaborador.populate('colaborador');
    await colaborador.populate('servico');
    await colaborador.populate('cliente');

    return colaborador;
  },

  delete: async function(id){
    const item = await VendasModel.findById(id);

    await VendasModel.findByIdAndDelete(id);

    await calcularBonus(item.colaborador);

    await item.populate('colaborador');
    await item.populate('servico');
    await item.populate('cliente');

    return item;
  },

  deleteMany: async function(){
    return VendasModel.deleteMany();
  }
}

