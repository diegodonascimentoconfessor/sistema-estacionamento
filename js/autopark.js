const { ipcRenderer } = require('electron');
const menuInput = document.getElementById('menu');
const marcaModeloInput = document.getElementById('marcaModelo');
const entradaInput = document.getElementById('entrada');
const toleranciaInput = document.getElementById('tolerancia');
const pesquisaInput = document.getElementById('pesquisa');
const placaInput = document.getElementById('placa');
const saidaInput = document.getElementById('saida');
const pagamentoInput = document.getElementById('pagamento');

function saveToLocalStorage() {
  localStorage.setItem('menu', menuInput.value);
  localStorage.setItem('marcaModelo', marcaModeloInput.value);
  localStorage.setItem('entrada', entradaInput.value);
  localStorage.setItem('tolerancia', toleranciaInput.value);
  localStorage.setItem('pesquisa', pesquisaInput.value);
  localStorage.setItem('placa', placaInput.value);
  localStorage.setItem('saida', saidaInput.value);
  localStorage.setItem('pagamento', pagamentoInput.value);
  console.log("Dados salvos no localStorage");
}

function loadFromLocalStorage() {
  menuInput.value = localStorage.getItem('menu') || '';
  marcaModeloInput.value = localStorage.getItem('marcaModelo') || '';
  entradaInput.value = localStorage.getItem('entrada') || '';
  toleranciaInput.value = localStorage.getItem('tolerancia') || '';
  pesquisaInput.value = localStorage.getItem('pesquisa') || '';
  placaInput.value = localStorage.getItem('placa') || '';
  saidaInput.value = localStorage.getItem('saida') || '';
  pagamentoInput.value = localStorage.getItem('pagamento') || '';
  console.log("Dados carregados do localStorage");
}

menuInput.addEventListener('input', saveToLocalStorage);
marcaModeloInput.addEventListener('input', saveToLocalStorage);
entradaInput.addEventListener('input', saveToLocalStorage);
toleranciaInput.addEventListener('input', saveToLocalStorage);
pesquisaInput.addEventListener('input', saveToLocalStorage);
placaInput.addEventListener('input', saveToLocalStorage);
saidaInput.addEventListener('input', saveToLocalStorage);
pagamentoInput.addEventListener('input', saveToLocalStorage);


window.addEventListener('load', loadFromLocalStorage);

// Lidar com os eventos do menu
ipcRenderer.on('menu-add-vehicle', () => {
  console.log('Adicionar Veículo');
  marcaModeloInput.value = '';
  entradaInput.value = '';
  toleranciaInput.value = '';
  pesquisaInput.value = '';
  placaInput.value = '';
  saidaInput.value = '';
  pagamentoInput.value = '';
  menuInput.value = 'Novo Veículo';
  saveToLocalStorage();
});

ipcRenderer.on('menu-edit-vehicle', () => {
  console.log('Editar Veículo');
  menuInput.value = 'Editando Veículo';
  saveToLocalStorage();
});

ipcRenderer.on('menu-delete-vehicle', () => {
  console.log('Excluir Veículo');
  menuInput.value = '';
  marcaModeloInput.value = '';
  entradaInput.value = '';
  toleranciaInput.value = '';
  pesquisaInput.value = '';
  placaInput.value = '';
  saidaInput.value = '';
  pagamentoInput.value = '';
  saveToLocalStorage();
});
