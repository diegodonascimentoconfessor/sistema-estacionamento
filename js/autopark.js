const { Client } = require('pg');
const tarifa = 10; // Tarifa fixa por hora
const capacidadeTotal = 100; // Defina a capacidade total de vagas

// Configuração da conexão com o PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Auto-park2',
  password: 'BemVindo!',
  port: 5432,
});

// Conectar ao PostgreSQL
client.connect()
  .then(() => console.log('Conectado ao PostgreSQL'))
  .catch(err => console.error('Erro ao conectar ao PostgreSQL', err));

// Função para adicionar um veículo
document.getElementById('addVehicleBtn').addEventListener('click', () => {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;
  const entrada = new Date().toISOString();

  if (marcaModelo && placa && cor) {
    const newVehicle = { marcaModelo, placa, cor, entrada };

    // Salvar no localStorage
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(newVehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    // Salvar no PostgreSQL
    client.query(
      'INSERT INTO veiculos (marca_modelo, placa, cor, entrada) VALUES ($1, $2, $3, $4)',
      [marcaModelo, placa, cor, entrada]
    )
    .then(() => {
      console.log('Veículo adicionado ao PostgreSQL');
      alert('Veículo adicionado com sucesso! Salvo no localStorage e no PostgreSQL.');
      atualizarVagas(); // Atualizar vagas após adicionar veículo
    })
    .catch(error => {
      console.error('Erro ao adicionar no PostgreSQL:', error);
      alert('Veículo salvo no localStorage, mas houve um erro ao salvar no PostgreSQL.');
    });

    carregarListaVeiculos();

    // Limpar os campos após adicionar o veículo
    document.getElementById('marcaModelo').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('cor').value = '';
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

// Função para atualizar vagas
function atualizarVagas() {
  client.query('SELECT COUNT(*) FROM veiculos')
    .then(result => {
      const vagasOcupadas = parseInt(result.rows[0].count, 10);
      const vagasDisponiveis = capacidadeTotal - vagasOcupadas;

      // Atualizar elementos na página
      document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
      document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
    })
    .catch(error => console.error('Erro ao calcular vagas:', error));
}

// Função para carregar a lista de veículos do PostgreSQL
function carregarListaVeiculos() {
  client.query('SELECT * FROM veiculos')
    .then(result => {
      const vehicles = result.rows;
      localStorage.setItem('vehicles', JSON.stringify(vehicles)); // Atualiza o localStorage com os dados do PostgreSQL
      renderVeiculos(vehicles);
    })
    .catch(error => console.error('Erro ao carregar veículos do PostgreSQL:', error));
}

// Função para renderizar a lista de veículos
function renderVeiculos(vehicles) {
  const veiculosList = document.getElementById('veiculosCadastrados');
  veiculosList.innerHTML = '';

  vehicles.forEach((vehicle, index) => {
    const li = document.createElement('li');
    li.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marca_modelo}, Cor: ${vehicle.cor}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', () => {
      excluirVeiculo(vehicle.placa);
    });
    li.appendChild(deleteBtn);

    const payBtn = document.createElement('button');
    payBtn.textContent = 'Pagamento';
    payBtn.addEventListener('click', () => {
      window.location.href = `pagamento.html?placa=${vehicle.placa}&marcaModelo=${vehicle.marca_modelo}&cor=${vehicle.cor}`;
    });
    li.appendChild(payBtn);

    veiculosList.appendChild(li);
  });
}

// Função para excluir veículo
function excluirVeiculo(placa) {
  let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles = vehicles.filter(vehicle => vehicle.placa !== placa);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  carregarListaVeiculos();
  atualizarVagas(); // Atualizar vagas após excluir veículo

  // Excluir do PostgreSQL
  client.query('DELETE FROM veiculos WHERE placa = $1', [placa])
    .then(() => console.log('Veículo excluído do PostgreSQL'))
    .catch(error => console.error('Erro ao excluir do PostgreSQL:', error));
}

// Função de pesquisa de veículos
document.getElementById('searchPlaca').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  client.query('SELECT * FROM veiculos WHERE LOWER(placa) LIKE $1 OR LOWER(marca_modelo) LIKE $1 OR LOWER(cor) LIKE $1', [`%${query}%`])
    .then(result => renderVeiculos(result.rows))
    .catch(error => console.error('Erro ao pesquisar veículos:', error));
});

// Carregar lista de veículos e atualizar vagas ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  carregarListaVeiculos();
  atualizarVagas();
});
