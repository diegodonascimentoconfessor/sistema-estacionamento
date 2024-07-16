function carregarVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const veiculosCadastrados = document.getElementById('veiculosCadastrados');
  if (veiculosCadastrados) {
    veiculosCadastrados.innerHTML = '';

    vehicles.forEach((vehicle, index) => {
      const li = document.createElement('li');
      li.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

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

      const payBtn = document.createElement('button');
      payBtn.textContent = 'Pagamento';
      payBtn.addEventListener('click', () => {
        calcularPagamentoVeiculo(vehicle);
      });
      li.appendChild(payBtn);

      veiculosCadastrados.appendChild(li);
    });

    const vagasOcupadas = vehicles.length;
    const vagasDisponiveis = 50 - vagasOcupadas;
    document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
    document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
  }
}

function calcularPagamentoVeiculo(vehicle) {
  const entradaDate = new Date(vehicle.entrada);
  const saidaDate = new Date();
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (parseInt(vehicle.tolerancia) / 60), 0);

  const valorPagamento = diffHrsComTolerancia * parseFloat(vehicle.tarifa);

  window.location.href = `pagamento.html?valor=${valorPagamento.toFixed(2)}`;
}

function editarVeiculo(index) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const vehicle = vehicles[index];

  inputs['marcaModelo'].value = vehicle.marcaModelo;
  inputs['placa'].value = vehicle.placa;
  inputs['entrada'].value = vehicle.entrada;
  inputs['tolerancia'].value = vehicle.tolerancia;
  inputs['tarifa'].value = vehicle.tarifa;

  localStorage.setItem('editIndex', index);

  inputs['menu'].value = 'Editando Veículo';
}

function excluirVeiculo(index) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const deletedVehicle = vehicles.splice(index, 1)[0];
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  carregarVeiculos(); 

  const vagasOcupadas = vehicles.length;
  const vagasDisponiveis = 50 - vagasOcupadas;
  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;

  ipcRenderer.send('vehicle-deleted', deletedVehicle);
}

document.getElementById('searchBtn').addEventListener('click', () => {
  const searchPlaca = document.getElementById('searchPlaca').value.toUpperCase(); 
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
  const resultadoPesquisa = document.getElementById('resultadoPesquisa');
  resultadoPesquisa.innerHTML = ''; 

  const detailsElement = document.createElement('div');
  detailsElement.classList.add('vehicle-details');
  detailsElement.innerHTML = `
    <h2>Detalhes do Veículo</h2>
    <p><strong>Placa:</strong> ${vehicle.placa}</p>
    <p><strong>Marca/Modelo:</strong> ${vehicle.marcaModelo}</p>
    <p><strong>Entrada:</strong> ${new Date(vehicle.entrada).toLocaleString()}</p>
  `;

  resultadoPesquisa.appendChild(detailsElement);
}

window.addEventListener('DOMContentLoaded', carregarListaVeiculos);

function carregarListaVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const veiculosList = document.getElementById('veiculos-list');

  if (veiculosList) {
    veiculosList.innerHTML = '';

    vehicles.forEach((vehicle) => {
      const vehicleElement = document.createElement('div');
      vehicleElement.classList.add('vehicle-item');
      vehicleElement.innerHTML = `
        <p><strong>Placa:</strong> ${vehicle.placa}</p>
        <p><strong>Marca/Modelo:</strong> ${vehicle.marcaModelo}</p>
        <p><strong>Entrada:</strong> ${new Date(vehicle.entrada).toLocaleString()}</p>
      `;
      veiculosList.appendChild(vehicleElement);
    });
  }
}
