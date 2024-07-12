document.getElementById('searchBtn').addEventListener('click', () => {
    const searchPlaca = document.getElementById('searchPlaca').value.toUpperCase(); // Converter para maiúsculas para padronizar
    if (searchPlaca) {
      pesquisarPlaca(searchPlaca);
    } else {
      alert('Por favor, insira uma placa para pesquisar.');
    }
  });
  
  function pesquisarPlaca(placa) {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const vehicle = vehicles.find(v => v.placa === placa);
  
    if (vehicle) {
      mostrarDetalhesVeiculo(vehicle);
    } else {
      alert(`Veículo com a placa ${placa} não encontrado.`);
    }
  }
  
  function mostrarDetalhesVeiculo(vehicle) {
    const container = document.querySelector('.container');
    const detailsElement = document.createElement('div');
    detailsElement.classList.add('vehicle-details');
    detailsElement.innerHTML = `
      <h2>Detalhes do Veículo</h2>
      <p><strong>Placa:</strong> ${vehicle.placa}</p>
      <p><strong>Marca/Modelo:</strong> ${vehicle.marcaModelo}</p>
      <p><strong>Entrada:</strong> ${new Date(vehicle.entrada).toLocaleString()}</p>
      <p><strong>Saída:</strong> ${new Date(vehicle.saida).toLocaleString()}</p>
      <p><strong>Tolerância:</strong> ${vehicle.tolerancia} minutos</p>
      <p><strong>Tarifa por Hora:</strong> R$ ${vehicle.tarifa}</p>
    `;
    

    const existingDetails = document.querySelector('.vehicle-details');
    if (existingDetails) {
      container.removeChild(existingDetails);
    }
    
    container.appendChild(detailsElement);
  }
  