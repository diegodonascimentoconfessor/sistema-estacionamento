const atualizarVagas = async (client, capacidadeTotal) => {
    try {
      const result = await client.query('SELECT COUNT(*) FROM veiculos');
      const vagasOcupadas = parseInt(result.rows[0].count, 10);
      const vagasDisponiveis = capacidadeTotal - vagasOcupadas;
  
      return { vagasDisponiveis, vagasOcupadas };
    } catch (error) {
      throw new Error('Erro ao calcular vagas');
    }
  };
  
  const carregarListaVeiculos = async (client) => {
    try {
      const result = await client.query('SELECT * FROM veiculos');
      return result.rows;
    } catch (error) {
      throw new Error('Erro ao carregar veículos');
    }
  };
  
  const excluirVeiculo = async (client, placa) => {
    try {
      await client.query('DELETE FROM veiculos WHERE placa = $1', [placa]);
      return true;
    } catch (error) {
      throw new Error('Erro ao excluir veículo');
    }
  };
  
  module.exports = { atualizarVagas, carregarListaVeiculos, excluirVeiculo };
  