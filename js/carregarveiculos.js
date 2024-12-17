const { Client } = require('pg');
const { renderVeiculos } = require('../../js/carregarveiculos'); // Atualize o caminho para o correto

async function carregarListaVeiculos() {
  const client = new Client();

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM veiculos');
    const vehicles = result.rows;

    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    // Chama a função renderVeiculos
    renderVeiculos(vehicles);

    return vehicles; // Retorna a lista de veículos para que o teste aguarde
  } catch (error) {
    console.error('Erro ao carregar veículos do PostgreSQL:', error);
    throw error;
  } finally {
    await client.end();
  }
}

module.exports = { carregarListaVeiculos };  // Certifique-se de que está exportando a função corretamente
