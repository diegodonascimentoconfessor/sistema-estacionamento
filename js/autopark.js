const tarifa = 10; // Tarifa fixa por hora

document.getElementById('addVehicleBtn').addEventListener('click', () => {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;
  const entrada = document.getElementById('entrada').value;

  if (marcaModelo && placa && cor && entrada) {
    const newVehicle = {
      marcaModelo,
      placa,
      cor,
      entrada
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
    veiculosList.innerHTML = ''; 

    if (vehicles.length > 0) {
      vehicles.forEach((vehicle, index) => {
        const li = document.createElement('li');
        li.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Cor: ${vehicle.cor}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

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

        veiculosList.appendChild(li);
      });
    }
  }

  const vagasOcupadas = vehicles.length;
  const vagasDisponiveis = 50 - vagasOcupadas;
  document.getElementById('vagasOcupadas').textContent = vagasOcupadas;
  document.getElementById('vagasDisponiveis').textContent = vagasDisponiveis;
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
  const valorPagamento = diffHrs * tarifa;

  salvarPagamento(valorPagamento);

  window.location.href = `pagamento.html?valor=${valorPagamento.toFixed(2)}`;
}

window.addEventListener('DOMContentLoaded', carregarListaVeiculos);
