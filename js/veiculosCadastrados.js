const { ipcRenderer } = require('electron');

    // Receber dados de veículos cadastrados do processo principal
    ipcRenderer.on('veiculos-cadastrados', (event, veiculos) => {
      const veiculosList = document.getElementById('veiculos-list');

      // Limpar conteúdo anterior
      veiculosList.innerHTML = '';

      // Renderizar os veículos cadastrados
      veiculos.forEach((veiculo, index) => {
        const veiculoElement = document.createElement('div');
        veiculoElement.classList.add('veiculo-item');
        veiculoElement.innerHTML = `
          <h2>Veículo ${index + 1}</h2>
          <p><strong>Placa:</strong> ${veiculo.placa}</p>
          <p><strong>Marca:</strong> ${veiculo.marca}</p>
          <p><strong>Modelo:</strong> ${veiculo.modelo}</p>
          <p><strong>Cor:</strong> ${veiculo.cor}</p>
          <hr>
        `;
        veiculosList.appendChild(veiculoElement);
      });
    });

    // Solicitar dados de veículos cadastrados ao carregar a página
    window.addEventListener('DOMContentLoaded', () => {
      ipcRenderer.send('get-vehicles');
    });