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
  const diffHrsComTolerancia = Math.max(diffHrs - (tolerancia / 60), 0);

  const valorPagamento = diffHrsComTolerancia * tarifa;

  window.location.href = `pagamento.html?valor=${valorPagamento}`;
}

document.getElementById('ajudaBtn').addEventListener('click', () => {
  ipcRenderer.send('open-help');
});

document.getElementById('addVehicleBtn').addEventListener('click', () => {
  const vehicle = {
    marcaModelo: inputs['marcaModelo'].value,
    placa: inputs['placa'].value,
    entrada: inputs['entrada'].value,
    saida: inputs['saida'].value,
    tolerancia: inputs['tolerancia'].value,
    tarifa: inputs['tarifa'].value
  };

  adicionarVeiculo(vehicle);
});

function adicionarVeiculo(vehicle) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles.push(vehicle);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  limparCampos();
  carregarVeiculos();
  ipcRenderer.send('vehicle-added', vehicle);
}

function limparCampos() {
  inputFields.forEach(id => {
    inputs[id].value = '';
  });
}

function carregarVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const veiculosCadastrados = document.getElementById('veiculosCadastrados');
  veiculosCadastrados.innerHTML = '';

  vehicles.forEach((vehicle, index) => {
    const li = document.createElement('li');
    li.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}, Saída: ${new Date(vehicle.saida).toLocaleString()}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
      editarVeiculo(index);
    });
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', () => {
      excluirVeiculo(index);
    });
    li.appendChild(deleteBtn);

    veiculosCadastrados.appendChild(li);
  });

  const vagasOcupadas = vehicles.length;
  const vagasDisponiveis = 50 - vagasOcupadas;
  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
}

window.addEventListener('DOMContentLoaded', carregarVeiculos);

function editarVeiculo(index) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const vehicle = vehicles[index];

  inputs['marcaModelo'].value = vehicle.marcaModelo;
  inputs['placa'].value = vehicle.placa;
  inputs['entrada'].value = vehicle.entrada;
  inputs['saida'].value = vehicle.saida;
  inputs['tolerancia'].value = vehicle.tolerancia;
  inputs['tarifa'].value = vehicle.tarifa;

  // Salvar o índice do veículo em localStorage para referência durante a edição
  localStorage.setItem('editIndex', index);

  // Mudar o texto do campo menu para indicar que está editando
  inputs['menu'].value = 'Editando Veículo';
}

function excluirVeiculo(index) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const deletedVehicle = vehicles.splice(index, 1)[0];
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  carregarVeiculos(); // Recarregar a lista após a exclusão

  // Atualizar contagem de vagas ocupadas e disponíveis
  const vagasOcupadas = vehicles.length;
  const vagasDisponiveis = 50 - vagasOcupadas;
  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;

  // Informar sobre a exclusão via IPC Renderer, se necessário
  ipcRenderer.send('vehicle-deleted', deletedVehicle);
}

