const excluirVeiculo = async (client, placa) => {
  try {
    await client.query('DELETE FROM veiculos WHERE placa = $1', [placa]);
    return true;
  } catch (error) {
    throw new Error('Erro ao excluir veículo');
  }
};

module.exports ={
  excluirVeiculo
}