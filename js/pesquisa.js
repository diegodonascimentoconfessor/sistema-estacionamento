const { ipcRenderer } = require('electron');

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchPlaca = document.getElementById('searchPlaca').value;
  if (searchPlaca) {
    alert(`Pesquisando ajuda para a placa: ${searchPlaca}`);
    
  } else {
    alert('Por favor, insira uma placa para pesquisar.');
  }
});
