const tarifa = 10; // Tarifa fixa por hora

document.getElementById('addVehicleBtn').addEventListener('click', () => {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;
  const entrada = new Date().toISOString(); // Gera a entrada automaticamente

  if (marcaModelo && placa && cor) {
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

       window.location.href = `pagamento.html?placa=${vehicle.placa}`

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

  // Lógica de pagamento pode ser implementada aqui
}

window.addEventListener('DOMContentLoaded', carregarListaVeiculos);

// Função para adicionar um veículo e salvar dados no localStorage
document.getElementById('addVehicleBtn').addEventListener('click', function() {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;
  const entrada = new Date().toISOString(); // Salva a data/hora atual

  const vehicle = {
      marcaModelo,
      placa,
      cor,
      entrada
  };

  // Salva no localStorage
  localStorage.setItem('veiculo-' + placa, JSON.stringify(vehicle));
  
  carregarListaVeiculos(); // Carrega a lista de veículos após a adição
});



// index.html

document.getElementById('addVehicleBtn').addEventListener('click', function() {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;

  if (marcaModelo && placa && cor) {
    const veiculo = {
      marcaModelo: marcaModelo,
      placa: placa,
      cor: cor,
      entrada: new Date().toISOString() // Considera a entrada atual como exemplo
    };

    localStorage.setItem('selectedVehicle', JSON.stringify(veiculo));
    // index.html

document.getElementById('addVehicleBtn').addEventListener('click', function() {
  const marcaModelo = document.getElementById('marcaModelo').value;
  const placa = document.getElementById('placa').value;
  const cor = document.getElementById('cor').value;

  if (marcaModelo && placa && cor) {
    const veiculo = {
      marcaModelo: marcaModelo,
      placa: placa,
      cor: cor,
      entrada: new Date().toISOString() // Considera a entrada atual como exemplo
    };

    localStorage.setItem('selectedVehicle', JSON.stringify(veiculo));
    window.location.href = 'index.html'; // Redireciona para a página de pagamento
  } else {
    alert('Por favor, preencha todos os campos.');
  }
});

  } else {
    alert('Por favor, preencha todos os campos.');
  }
});
