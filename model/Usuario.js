const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  nome: String,
  usuario: String,
  senha: String,
  admin: Boolean,
});

const UsuarioModel = mongoose.model("Usuario", UsuarioSchema);

module.exports = {
  list: async function({ pagina = 1, limite = 10 }){
    const resultado = await UsuarioModel.find({})
      .sort({ nome: 1 })
      .skip((pagina - 1) * limite)
      .limit(limite)
      .lean();
    
    return resultado;
  },

  getById: async function(id){
    return UsuarioModel.findById(id).lean();
  },

  save: async function({ nome, usuario, senha }){
    const user = new UsuarioModel({
      nome,
      usuario,
      senha
    });
    return user.save();
  },

  saveAdmin: async function({ nome, usuario, senha }){
    const usuarioAdmin = new UsuarioModel({
      nome,
      usuario,
      senha,
      admin: true
    });
    return usuarioAdmin.save();
  },

  findUsuario: async function(usuario){
    return await UsuarioModel.findOne({
      usuario
    });
  },

  findById: async function(id){
    const usuario = await UsuarioModel.findOne({
      _id: id
    });
    return usuario;
  },

  update: async function(id, obj){
    let usuario = await UsuarioModel.findById(id);
    if(!usuario){
      return false;
    }

    const itens = Object.keys(obj).filter((key) => {
      return ["nome", "usuario", "senha", "admin"].includes(key);
    });
    itens.forEach((key) => (item[key] = obj[key]));

    return usuario.save();
  },

  /* Rota para atualizar o próprio usuário mesmo. */
  selfUpdate: async function(usuario, obj){
    let user = await UsuarioModel.findOne({
      usuario
    }).exec();

    if(!user){
      return false;
    }

    user.nome = obj.nome;

    return user.save();
  },

  delete: async function(id){
    return UsuarioModel.findByIdAndDelete(id);
  },

  deleteMany: async function(){
    return UsuarioModel.deleteMany();
  }
}


