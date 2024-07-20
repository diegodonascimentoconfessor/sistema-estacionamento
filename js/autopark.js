const isElectron = typeof window !== 'undefined' && window.process && window.process.type === 'renderer';
const ipcRenderer = isElectron ? require('electron').ipcRenderer : null;

const inputFields = [
  'menu',
  'marcaModelo',
  'entrada',
  'tolerancia',
  'placa',
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

if (isElectron) {
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
}

document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);

function calcularPagamento() {
  const entrada = document.getElementById('entrada').value;
  const tarifa = parseFloat(document.getElementById('tarifa').value);
  const tolerancia = parseInt(document.getElementById('tolerancia').value);

  if (!entrada || isNaN(tarifa) || isNaN(tolerancia)) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date();
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (tolerancia / 60), 0);

  const valorPagamento = diffHrsComTolerancia * tarifa;

  window.location.href = `pagamento.html?valor=${valorPagamento.toFixed(2)}`;
}

document.getElementById('addVehicleBtn').addEventListener('click', () => {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const entrada = document.getElementById('entrada').value;
  const tolerancia = document.getElementById('tolerancia').value;
  const tarifa = document.getElementById('tarifa').value;

  if (marcaModelo && placa && entrada && tolerancia && tarifa) {
    const newVehicle = {
      marcaModelo,
      placa,
      entrada,
      tolerancia,
      tarifa
    };

    let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    vehicles.push(newVehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));

    alert('Veículo adicionado com sucesso!');
    carregarListaVeiculos();
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

function carregarListaVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const veiculosList = document.getElementById('veiculosCadastrados');

  if (veiculosList) {
    veiculosList.innerHTML = ''; // Limpa a lista atual

    if (vehicles.length > 0) {
      const lastVehicle = vehicles[vehicles.length - 1];

      const li = document.createElement('li');
      li.textContent = `Placa: ${lastVehicle.placa}, Marca/Modelo: ${lastVehicle.marcaModelo}, Entrada: ${new Date(lastVehicle.entrada).toLocaleString()}`;

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => {
        editarVeiculo(vehicles.length - 1);
      });
      li.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.addEventListener('click', () => {
        excluirVeiculo(vehicles.length - 1);
      });
      li.appendChild(deleteBtn);

      const payBtn = document.createElement('button');
      payBtn.textContent = 'Pagamento';
      payBtn.addEventListener('click', () => {
        calcularPagamentoVeiculo(lastVehicle);
      });
      li.appendChild(payBtn);

      veiculosList.appendChild(li);
    }
  }

  const vagasOcupadas = vehicles.length;
  const vagasDisponiveis = 50 - vagasOcupadas;
  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
}

function adicionarVeiculo(vehicle) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles.push(vehicle);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  limparCampos();
  carregarListaVeiculos();

  if (isElectron) {
    ipcRenderer.send('vehicle-added', vehicle);
  }
}

function limparCampos() {
  inputFields.forEach(id => {
    inputs[id].value = '';
  });
}

function editarVeiculo(index) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const vehicle = vehicles[index];

  inputs['marcaModelo'].value = vehicle.marcaModelo;
  inputs['placa'].value = vehicle.placa;
  inputs['entrada'].value = vehicle.entrada;
  inputs['tolerancia'].value = vehicle.tolerancia;
  inputs['tarifa'].value = vehicle.tarifa;

  vehicles.splice(index, 1);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
}

function excluirVeiculo(index) {
  let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles.splice(index, 1);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  carregarListaVeiculos();
}

function calcularPagamentoVeiculo(vehicle) {
  const entradaDate = new Date(vehicle.entrada);
  const saidaDate = new Date();
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (vehicle.tolerancia / 60), 0);
  const valorPagamento = diffHrsComTolerancia * parseFloat(vehicle.tarifa);

  window.location.href = `pagamento.html?valor=${valorPagamento.toFixed(2)}`;
}

window.addEventListener('DOMContentLoaded', carregarListaVeiculos);

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchPlaca = document.getElementById('searchPlaca').value;
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const resultadoPesquisa = vehicles.find(vehicle => vehicle.placa === searchPlaca);

  const resultadoPesquisaContainer = document.getElementById('resultadoPesquisa');
  resultadoPesquisaContainer.innerHTML = '';

  if (resultadoPesquisa) {
    const li = document.createElement('li');
    li.textContent = `Placa: ${resultadoPesquisa.placa}, Marca/Modelo: ${resultadoPesquisa.marcaModelo}, Entrada: ${new Date(resultadoPesquisa.entrada).toLocaleString()}`;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.addEventListener('click', () => {
      editarVeiculo(vehicles.indexOf(resultadoPesquisa));
    });
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.addEventListener('click', () => {
      excluirVeiculo(vehicles.indexOf(resultadoPesquisa));
    });
    li.appendChild(deleteBtn);

    const payBtn = document.createElement('button');
    payBtn.textContent = 'Pagamento';
    payBtn.addEventListener('click', () => {
      calcularPagamentoVeiculo(resultadoPesquisa);
    });
    li.appendChild(payBtn);

    resultadoPesquisaContainer.appendChild(li);
  } else {
    resultadoPesquisaContainer.textContent = 'Veículo não encontrado.';
  }
});
