const jwt = require('jsonwebtoken');

module.exports = {
  validaAcesso: (req, res, next) => {
    let beartoken = req.headers['authorization'] || "";
    let token = beartoken.split(" ");
    if(token[0] == 'Bearer'){
      token = token[1];
    }
    // console.log('Bear Token: ', beartoken);
    // console.log('Token: ', token);
    jwt.verify(token, '123!@#', (err, obj) => {
      if(err){
        res.status(403).json({ mensagem: "Token inválido, acesso negado." })
      } else{
        req.usuario = obj.usuario;
        next();
      }
    });
  }
}