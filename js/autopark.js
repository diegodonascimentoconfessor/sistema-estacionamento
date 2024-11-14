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
      
      atualizarVagas(); // Atualizar vagas após adicionar veículo
    })
    .catch(error => {
      console.error('Erro ao adicionar no PostgreSQL:', error);
      ;
    });

    carregarListaVeiculos();

    // Limpar os campos após adicionar o veículo
    document.getElementById('marcaModelo').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('cor').value = '';
  } else {
    
  }
});

// Função para atualizar vagas
function atualizarVagas() {
  client.query('SELECT COUNT(*) FROM veiculos')
    .then(result => {
      const vagasOcupadas = parseInt(result.rows[0].count, 10);
      const vagasDisponiveis = capacidadeTotal - vagasOcupadas;

      // Atualizar elementos na página
      const vagasDisponiveisEl = document.getElementById('vagasDisponiveis');
      const vagasOcupadasEl = document.getElementById('vagasOcupadas');

      vagasDisponiveisEl.textContent = vagasDisponiveis;
      vagasOcupadasEl.textContent = vagasOcupadas;

      // Aplicar cores: verde para vagas disponíveis e vermelho para vagas ocupadas
      vagasDisponiveisEl.style.color = 'green';
      vagasOcupadasEl.style.color = 'red';
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
    .then(() => console.log(`Veículo com a placa ${placa} excluído do PostgreSQL`))
    .catch(error => console.error('Erro ao excluir veículo do PostgreSQL:', error));
}

// Função para buscar veículos no localStorage
document.getElementById('searchBtn').addEventListener('click', () => {
  const searchPlaca = document.getElementById('searchPlaca').value.toUpperCase();
  let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

  const filteredVehicles = vehicles.filter(vehicle => vehicle.placa.toUpperCase().includes(searchPlaca));

  mostrarResultadoPesquisa(filteredVehicles);
});

// Exibir resultados da pesquisa
function mostrarResultadoPesquisa(vehicles) {
  const resultadoContainer = document.getElementById('resultadoPesquisa');
  resultadoContainer.innerHTML = '';

  if (vehicles.length > 0) {
    vehicles.forEach(vehicle => {
      const div = document.createElement('div');
      div.classList.add('vehicle-result');
      div.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marca_modelo}, Cor: ${vehicle.cor}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;
      resultadoContainer.appendChild(div);
    });
  } else {
    resultadoContainer.textContent = 'Nenhum veículo encontrado com a placa fornecida.';
  }
}

carregarListaVeiculos();
atualizarVagas();


// Função para mostrar resultado da pesquisa em tabela
function mostrarResultadoPesquisa(vehicles) {
  const resultadoTable = document.getElementById('resultadoPesquisa');
  resultadoTable.innerHTML = '';

  if (vehicles.length > 0) {
    vehicles.forEach(vehicle => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${vehicle.placa}</td>
        <td>${vehicle.marca_modelo}</td>
        <td>${vehicle.cor}</td>
        <td>${new Date(vehicle.entrada).toLocaleString()}</td>
      `;
      resultadoTable.appendChild(tr);
    });
  } else {
    resultadoTable.innerHTML = `<tr><td colspan="4">Nenhum veículo encontrado com a placa fornecida.</td></tr>`;
  }
}

// Função para renderizar a lista de veículos cadastrados em tabela
function renderVeiculos(vehicles) {
  const veiculosList = document.getElementById('veiculosCadastrados');
  veiculosList.innerHTML = '';

  vehicles.forEach(vehicle => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${vehicle.placa}</td>
      <td>${vehicle.marca_modelo}</td>
      <td>${vehicle.cor}</td>
      <td>${new Date(vehicle.entrada).toLocaleString()}</td>
      <td>
        <button onclick="excluirVeiculo('${vehicle.placa}')">Excluir</button>
        <button onclick="window.location.href='pagamento.html?placa=${vehicle.placa}&marcaModelo=${vehicle.marca_modelo}&cor=${vehicle.cor}'">Pagamento</button>
      </td>
    `;
    veiculosList.appendChild(tr);
  });
}

// Evento para o botão de pesquisa
document.getElementById('searchBtn').addEventListener('click', () => {
  const searchPlaca = document.getElementById('searchPlaca').value.toUpperCase();
  let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];

  const filteredVehicles = vehicles.filter(vehicle => vehicle.placa.toUpperCase().includes(searchPlaca));

  mostrarResultadoPesquisa(filteredVehicles);
});

carregarListaVeiculos();
atualizarVagas();
