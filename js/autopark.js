const tarifa = 10; // Tarifa fixa por hora

document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);

function calcularPagamento() {
  const entrada = document.getElementById('entrada').value;

  if (!entrada) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date();
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);

  const valorPagamento = diffHrs * tarifa;

  salvarPagamento(valorPagamento);

  window.location.href = `pagamento.html?valor=${valorPagamento.toFixed(2)}`;
}

function salvarPagamento(valorPagamento) {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  const novoPagamento = {
    id: pagamentos.length + 1,
    valor: valorPagamento.toFixed(2),
    data: new Date().toLocaleString()
  };
  pagamentos.push(novoPagamento);
  localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
}

document.getElementById('addVehicleBtn').addEventListener('click', () => {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const entrada = document.getElementById('entrada').value;

  if (marcaModelo && placa && entrada) {
    const newVehicle = {
      marcaModelo,
      placa,
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
        li.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

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
