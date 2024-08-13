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

    // Limpa os campos após adicionar o veículo
    document.getElementById('marcaModelo').value = '';
    document.getElementById('placa').value = '';
    document.getElementById('cor').value = '';
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
          window.location.href = `pagamento.html?placa=${vehicle.placa}&marcaModelo=${vehicle.marcaModelo}&cor=${vehicle.cor}`;
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

window.addEventListener('DOMContentLoaded', carregarListaVeiculos);


// pesqusa 


document.getElementById('searchPlaca').addEventListener('input', function() {
  const query = this.value.toLowerCase();
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const filteredVehicles = vehicles.filter(vehicle => 
      vehicle.placa.toLowerCase().includes(query) ||
      vehicle.marcaModelo.toLowerCase().includes(query) ||
      vehicle.cor.toLowerCase().includes(query)
  );
  exibirResultadoPesquisa(filteredVehicles);
});

function exibirResultadoPesquisa(vehicles) {
  const resultadoPesquisa = document.getElementById('resultadoPesquisa');
  resultadoPesquisa.innerHTML = '';

  if (vehicles.length > 0) {
      vehicles.forEach((vehicle, index) => {
          const div = document.createElement('div');
          div.classList.add('resultado-item');
          div.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Cor: ${vehicle.cor}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Excluir';
          deleteBtn.addEventListener('click', () => {
              excluirVeiculoPesquisa(vehicle.placa);
          });
          div.appendChild(deleteBtn);

          const payBtn = document.createElement('button');
          payBtn.textContent = 'Pagamento';
          payBtn.addEventListener('click', () => {
              window.location.href = `pagamento.html?placa=${vehicle.placa}&marcaModelo=${vehicle.marcaModelo}&cor=${vehicle.cor}`;
          });
          div.appendChild(payBtn);

          resultadoPesquisa.appendChild(div);
      });
  } else {
      resultadoPesquisa.textContent = 'Nenhum veículo encontrado.';
  }
}

function excluirVeiculoPesquisa(placa) {
  let vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles = vehicles.filter(vehicle => vehicle.placa !== placa);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  document.getElementById('searchPlaca').dispatchEvent(new Event('input')); // Atualiza a lista
}
