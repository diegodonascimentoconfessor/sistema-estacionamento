const tarifa = 10; // Tarifa fixa por hora
const SHEETS_DB_API_URL = "https://sheetdb.io/api/v1/l08nk3bd4w72f";

// Função para adicionar um veículo
document.getElementById('addVehicleBtn').addEventListener('click', () => {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;
  const entrada = new Date().toISOString(); // Gera a entrada automaticamente

  if (marcaModelo && placa && cor) {
    const newVehicle = { marcaModelo, placa, cor, entrada };

    // Salvar no localStorage
    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(newVehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    // Salvar no SheetsDB
    fetch(SHEETS_DB_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: [newVehicle] })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Veículo adicionado ao SheetsDB:', data);
      alert('Veículo adicionado com sucesso! Salvo no localStorage e no SheetsDB.');
    })
    .catch(error => {
      console.error('Erro ao adicionar no SheetsDB:', error);
      alert('Veículo salvo no localStorage, mas houve um erro ao salvar no SheetsDB.');
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

// Carregar lista de veículos
function carregarListaVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const veiculosList = document.getElementById('veiculosCadastrados');

  if (veiculosList) {
    veiculosList.innerHTML = '';

    if (vehicles.length > 0) {
      vehicles.forEach((vehicle, index) => {
        const li = document.createElement('li');
        li.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Cor: ${vehicle.cor}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Excluir';
        deleteBtn.addEventListener('click', () => {
          excluirVeiculo(index, vehicle.placa);
        });
        li.appendChild(deleteBtn);

        const payBtn = document.createElement('button');
        payBtn.textContent = 'Pagamento';
        payBtn.addEventListener('click', () => {
          window.location.href = `pagamento.html?placa=${vehicle.placa}&marcaModelo=${vehicle.marcaModelo}&cor=${vehicle.cor}`;
        });
        li.appendChild(payBtn);

        veiculosList.appendChild(li);
      });
    }
  }

  const vagasOcupadas = vehicles.length;
  const vagasDisponiveis = 50 - vagasOcupadas;
  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
}

// Função para excluir veículo
function excluirVeiculo(index, placa) {
  let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles.splice(index, 1);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  carregarListaVeiculos();

  // Excluir do SheetsDB
  fetch(`${SHEETS_DB_API_URL}/placa/${placa}`, {
    method: 'DELETE',
  }).then(response => response.json())
    .then(data => console.log('Veículo excluído do SheetsDB:', data))
    .catch(error => console.error('Erro ao excluir do SheetsDB:', error));
}

// Função de pesquisa de veículos
document.getElementById('searchPlaca').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const filteredVehicles = vehicles.filter(vehicle => 
      vehicle.placa.toLowerCase().includes(query) ||
      vehicle.marcaModelo.toLowerCase().includes(query) ||
      vehicle.cor.toLowerCase().includes(query)
  );
  exibirResultadoPesquisa(filteredVehicles);
});

function exibirResultadoPesquisa(vehicles) {
  const resultadoPesquisa = document.getElementById('resultadoPesquisa');
  resultadoPesquisa.innerHTML = '';

  if (vehicles.length > 0) {
    vehicles.forEach((vehicle) => {
      const div = document.createElement('div');
      div.classList.add('resultado-item');
      div.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Cor: ${vehicle.cor}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.addEventListener('click', () => {
        excluirVeiculoPesquisa(vehicle.placa);
      });
      div.appendChild(deleteBtn);

      const payBtn = document.createElement('button');
      payBtn.textContent = 'Pagamento';
      payBtn.addEventListener('click', () => {
        window.location.href = `pagamento.html?placa=${vehicle.placa}&marcaModelo=${vehicle.marcaModelo}&cor=${vehicle.cor}`;
      });
      div.appendChild(payBtn);

      resultadoPesquisa.appendChild(div);
    });
  } else {
    resultadoPesquisa.textContent = 'Nenhum veículo encontrado.';
  }
}

function excluirVeiculoPesquisa(placa) {
  let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles = vehicles.filter(vehicle => vehicle.placa !== placa);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));

  // Excluir do SheetsDB
  fetch(`${SHEETS_DB_API_URL}/placa/${placa}`, {
    method: 'DELETE',
  }).then(response => response.json())
    .then(data => console.log('Veículo excluído do SheetsDB:', data))
    .catch(error => console.error('Erro ao excluir do SheetsDB:', error));

  document.getElementById('searchPlaca').dispatchEvent(new Event('input')); // Atualiza a lista
}

window.addEventListener('DOMContentLoaded', carregarListaVeiculos);
