const { Client } = require('pg');

function addEventListener() {
  document.getElementById('addVehicleBtn').addEventListener('click', () => {
    const marcaModelo = document.getElementById('marcaModelo').value;
    const placa = document.getElementById('placa').value;
    const cor = document.getElementById('cor').value;
    const entrada = new Date().toISOString();

    const client = new Client();
    client.query(
      'INSERT INTO veiculos (marca_modelo, placa, cor, entrada) VALUES ($1, $2, $3, $4)',
      [marcaModelo, placa, cor, entrada]
    );
  });
}

module.exports = { addEventListener };
