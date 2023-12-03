const jwt = require('jsonwebtoken');

module.exports = {
  validaAcesso: (req, res, next) => {
    let beartoken = req.headers['authorization'] || "";
    // console.log(beartoken);
    let token = beartoken.split(" ");
    if(token[0] == 'Bearer'){
      token = token[1];
    }
    // console.log('Bear Token: ', beartoken);
    // console.log('Token: ', token);
    jwt.verify(token, '123!@#', (err, obj) => {
      if(err){
        res.status(403).json({ mensagem: "Token inválido, acesso negado." })
        // console.log(err);
        // console.log(token);
      } else{
        req.usuario = obj.usuario;
        next();
      }
    });
  },

  validaAdmin: (req, res, next) => {
    let beartoken = req.headers['authorization'] || "";
    let token = beartoken.split(" ");

    jwt.verify(token[1], '123!@#', (err, obj) => {
      if(err){
        res.status(403).json({
          mensagem: "Token inválido, acesso negado."
        });
      } else if(!obj.admin){
        res.status(403).json({
          mensagem: "Acesso negado, seu usuário não é administrador."
        });
      } else {
        req.usuario = obj.usuario;
        next();
      }
    })
  }
}