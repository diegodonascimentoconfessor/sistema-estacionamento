// Função para adicionar um veículo ao banco de dados
const adicionarVeiculo = async (client, { placa, marca_modelo, cor, entrada }) => {
  try {
    const query = 'INSERT INTO veiculos (placa, marca_modelo, cor, entrada) VALUES ($1, $2, $3, $4)';
    await client.query(query, [placa, marca_modelo, cor, entrada]);
    return true;
  } catch (error) {
    throw new Error('Erro ao adicionar veículo');
  }
};

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
  
  module.exports = { adicionarVeiculo, atualizarVagas, carregarListaVeiculos, excluirVeiculo };
  