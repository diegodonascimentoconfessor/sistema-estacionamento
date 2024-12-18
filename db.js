// Banco de dados simulado em memória
const dbSimulado = {
    veiculos: [], // Array para armazenar os veículos
  };
  
  // Função para simular uma consulta ao banco de dados
  const query = async (sql, params) => {
    const comando = sql.split(' ')[0].toUpperCase();
  
    switch (comando) {
      case 'INSERT':
        const novoVeiculo = {
          placa: params[0],
          marca_modelo: params[1],
          cor: params[2],
          entrada: params[3],
        };
        dbSimulado.veiculos.push(novoVeiculo);
        return { rowCount: 1 };
  
      case 'SELECT':
        if (sql.includes('COUNT(*)')) {
          return { rows: [{ count: dbSimulado.veiculos.length.toString() }] };
        }
        return { rows: dbSimulado.veiculos };
  
      case 'DELETE':
        const placa = params[0];
        const index = dbSimulado.veiculos.findIndex((v) => v.placa === placa);
        if (index !== -1) {
          dbSimulado.veiculos.splice(index, 1);
          return { rowCount: 1 };
        }
        return { rowCount: 0 };
  
      default:
        throw new Error('Comando SQL não suportado na simulação');
    }
  };
  
  // Função para obter o cliente simulado
  const getClient = async () => ({
    query,
    release: () => {}, // Nenhuma ação necessária para liberar na simulação
  });
  
  module.exports = {
    getClient,
  };
  