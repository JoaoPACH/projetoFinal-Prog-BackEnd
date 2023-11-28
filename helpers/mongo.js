const mongoose = require('mongoose');

module.exports = (req, res, next) => {
  mongoose.connect(process.env.URL_BANCO).catch((err) => {
    console.log("Erro ao conectar no banco ...")
  });
  return next()
}
