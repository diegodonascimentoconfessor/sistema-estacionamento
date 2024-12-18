const excluirVeiculo = async (client, placa) => {
  try {
    await client.query('DELETE FROM veiculos WHERE placa = $1', [placa]);
    return true;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    throw new Error('Erro ao excluir veículo');
  }
};

module.exports ={
  excluirVeiculo
}