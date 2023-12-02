const TOTAL_MINIMO = 200;
const BONUS_PORCENTAGEM = 0.05;

module.exports = async function(idColaborador){
  const Vendas = require('../model/Venda');
  const colaboradorVendas = await Vendas.findByIdColaborador(idColaborador);

  let total = 0;
  for (let venda of colaboradorVendas){
    total += venda.valor || 0;
  }

  const bonus = total >= TOTAL_MINIMO ? total * BONUS_PORCENTAGEM : 0;
  
  const ColaboradorModel = require('../model/Colaborador');
  return ColaboradorModel.updateBonus(idColaborador, bonus);
}


