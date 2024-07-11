const { ipcRenderer } = require('electron');

const inputFields = [
  'menu',
  'marcaModelo',
  'entrada',
  'tolerancia',
  'placa',
  'saida',
  'tarifa'
];

const inputs = {};

inputFields.forEach(id => {
  inputs[id] = document.getElementById(id);
  inputs[id].addEventListener('input', saveToLocalStorage);
});

function saveToLocalStorage() {
  inputFields.forEach(id => {
    localStorage.setItem(id, inputs[id].value);
  });
  console.log("Dados salvos no localStorage");
}

function loadFromLocalStorage() {
  inputFields.forEach(id => {
    inputs[id].value = localStorage.getItem(id) || '';
  });
  console.log("Dados carregados do localStorage");
}

window.addEventListener('load', loadFromLocalStorage);

ipcRenderer.on('menu-add-vehicle', () => {
  console.log('Adicionar Veículo');
  inputFields.forEach(id => {
    inputs[id].value = '';
  });
  inputs['menu'].value = 'Novo Veículo';
  saveToLocalStorage();
});

ipcRenderer.on('menu-edit-vehicle', () => {
  console.log('Editar Veículo');
  inputs['menu'].value = 'Editando Veículo';
  saveToLocalStorage();
});

ipcRenderer.on('menu-delete-vehicle', () => {
  console.log('Excluir Veículo');
  inputFields.forEach(id => {
    inputs[id].value = '';
  });
  saveToLocalStorage();
});

document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);

function calcularPagamento() {
  const entrada = document.getElementById('entrada').value;
  const saida = document.getElementById('saida').value;
  const tarifa = parseFloat(document.getElementById('tarifa').value);
  const tolerancia = parseInt(document.getElementById('tolerancia').value);

  if (!entrada || !saida || isNaN(tarifa) || isNaN(tolerancia)) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date(saida);
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (tolerancia / 60), 0); // Deduz a tolerância em horas

  const valorPagamento = diffHrsComTolerancia * tarifa;
  document.getElementById('valorPagamento').innerText = `Valor a Pagar: R$ ${valorPagamento.toFixed(2)}`;
}

document.getElementById('ajudaBtn').addEventListener('click', () => {
  ipcRenderer.send('open-help');
});

document.getElementById('calcPagamentoBtn').addEventListener('click', function() {
  // Lógica para calcular o valor do pagamento
  const valorPagamento = "20.00"; 
  window.location.href = `pagamento.html?valor=${valorPagamento}`;
});

function adicionarVeiculo(vehicle) {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    ipcRenderer.send('vehicle-added', vehicle);
  }
  
  function excluirVeiculo(vehicle) {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
    ipcRenderer.send('vehicle-added', vehicle);
  }



  document.getElementById('addVehicleBtn').addEventListener('click', () => {
    const vehicle = {
      placa: document.getElementById('placaVeiculo').value,
      entrada: document.getElementById('entradaPagamento').value,
      vaga: Math.floor(Math.random() * 100) + 1 
    };
    adicionarVeiculo(vehicle);
  });

  document.getElementById('addVehicleBtn').addEventListener('click', () => {
    const vehicle = {
      placa: document.getElementById('placaVeiculo').value,
      entrada: document.getElementById('entradaPagamento').value,
      vaga: Math.floor(Math.random() * 100) + 1 
    };
    excluirVeiculo(vehicle);
  });
  

  ipcRenderer.on('vehicle-added', (event, vehicle) => {
    console.log('Veículo adicionado:', vehicle);
    
  });
  
  

let vagasOcupadas = 00;
let totalVagas = 100;


function atualizarVagas() {
  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = totalVagas - vagasOcupadas;
}

function adicionarVeiculo() {
  
  vagasOcupadas++; 
  atualizarVagas();
}

function excluirVeiculo() {
  
  vagasOcupadas--; 
  atualizarVagas();
}

atualizarVagas();



window.addEventListener('DOMContentLoaded', () => {
  
  function carregarVeiculos() {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const vagasTableBody = document.querySelector('#vagasTable tbody');
    vagasTableBody.innerHTML = '';

    vehicles.forEach(vehicle => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${vehicle.placa}</td>
        <td>${new Date(vehicle.entrada).toLocaleString()}</td>
        <td>${vehicle.vaga}</td>
      `;
      vagasTableBody.appendChild(row);
    });

    // Atualizar número de vagas
    const totalVagas = 100;
    const vagasOcupadas = vehicles.length;
    const vagasDisponiveis = totalVagas - vagasOcupadas;
    document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
    document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
  }

  // Carregar veículos ao carregar a página
  carregarVeiculos();
});



// pesquisa 


document.getElementById('searchBtn').addEventListener('click', () => {
  const searchPlaca = document.getElementById('searchPlaca').value;
  if (searchPlaca) {
    alert(`Pesquisando ajuda para a placa: ${searchPlaca}`);
    
  } else {
    alert('Por favor, insira uma placa para pesquisar.');
  }
});



// listas de carros cadastrado 
// Função para adicionar veículo à lista de cadastrados
// Referências aos elementos do formulário e da lista
const formVeiculo = document.getElementById('formVeiculo');
const veiculosCadastrados = document.getElementById('veiculosCadastrados');

// Array para armazenar os veículos cadastrados
let veiculos = [];

// Função para adicionar veículo
function adicionarVeiculo() {
  // Coletar dados do formulário
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const entrada = document.getElementById('entrada').value;
  const saida = document.getElementById('saida').value;
  const tolerancia = document.getElementById('tolerancia').value;
  const tarifa = document.getElementById('tarifa').value;

  // Validar se todos os campos foram preenchidos (implemente validações adicionais conforme necessário)

  // Criar objeto de veículo
  const novoVeiculo = {
    marcaModelo,
    placa,
    entrada,
    saida,
    tolerancia,
    tarifa
  };

  // Adicionar veículo ao array
  veiculos.push(novoVeiculo);

  // Limpar formulário
  formVeiculo.reset();

  // Atualizar lista de veículos cadastrados
  renderizarVeiculos();
}

// Função para renderizar lista de veículos
function renderizarVeiculos() {
  // Limpar lista atual
  veiculosCadastrados.innerHTML = '';

  // Gerar HTML para cada veículo cadastrado
  veiculos.forEach((veiculo, index) => {
    const li = document.createElement('li');
    li.textContent = `${veiculo.marcaModelo} - ${veiculo.placa}`;
    veiculosCadastrados.appendChild(li);
  });

  // Atualizar contagem de vagas ocupadas e disponíveis
  const vagasOcupadas = veiculos.length;
  const vagasDisponiveis = 50 - vagasOcupadas; // Supondo um total de 50 vagas

  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
}

// Evento de clique no botão "Adicionar Veículo"
document.getElementById("addVehicleBtn").addEventListener('click', function(event) {
  event.preventDefault(); // Evitar envio do formulário

  adicionarVeiculo();
});
