const { Client } = require('pg');

const capacidadeTotal = 100;

async function atualizarVagas() {
  const client = new Client();

  try {
    const result = await client.query('SELECT COUNT(*) FROM veiculos');
    const vagasOcupadas = parseInt(result.rows[0].count, 10);
    const vagasDisponiveis = capacidadeTotal - vagasOcupadas;
    return vagasDisponiveis; // Retorna o número de vagas disponíveis
  } catch (error) {
    console.error('Erro ao atualizar vagas:', error);
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = { atualizarVagas };
