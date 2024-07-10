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
