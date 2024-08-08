document.getElementById('searchBtn').addEventListener('click', () => {
  const searchPlaca = document.getElementById('searchPlaca').value.toLowerCase();
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const resultadoPesquisaContainer = document.getElementById('resultadoPesquisa');
  
  resultadoPesquisaContainer.innerHTML = '';

  // Filtra os veículos que contenham a string digitada em qualquer parte da placa
  const filteredVehicles = vehicles.filter(vehicle => vehicle.placa.toLowerCase().includes(searchPlaca));

  if (filteredVehicles.length > 0) {
      filteredVehicles.forEach(vehicle => {
          const li = document.createElement('li');
          li.textContent = `Placa: ${vehicle.placa}, Marca/Modelo: ${vehicle.marcaModelo}, Cor: ${vehicle.cor}, Modelo: ${vehicle.modelo}, Entrada: ${new Date(vehicle.entrada).toLocaleString()}`;

          const editBtn = document.createElement('button');
          editBtn.textContent = 'Editar';
          editBtn.addEventListener('click', () => {
              editarVeiculo(vehicles.indexOf(vehicle));
          });
          li.appendChild(editBtn);

          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Excluir';
          deleteBtn.addEventListener('click', () => {
              excluirVeiculo(vehicles.indexOf(vehicle));
          });
          li.appendChild(deleteBtn);

          const payBtn = document.createElement('button');
          payBtn.textContent = 'Pagamento';
          payBtn.addEventListener('click', () => {
              calcularPagamentoVeiculo(vehicle);
          });
          li.appendChild(payBtn);

          resultadoPesquisaContainer.appendChild(li);
      });
  } else {
      resultadoPesquisaContainer.textContent = 'Veículo não encontrado.';
  }
});
