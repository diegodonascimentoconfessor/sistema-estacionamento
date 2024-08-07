document.getElementById('searchBtn').addEventListener('click', () => {
    const searchPlaca = document.getElementById('searchPlaca').value;
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const resultadoPesquisa = vehicles.find(vehicle => vehicle.placa === searchPlaca);
  
    const resultadoPesquisaContainer = document.getElementById('resultadoPesquisa');
    resultadoPesquisaContainer.innerHTML = '';
  
    if (resultadoPesquisa) {
      const li = document.createElement('li');
      li.textContent = `Placa: ${resultadoPesquisa.placa}, Marca/Modelo: ${resultadoPesquisa.marcaModelo}, Entrada: ${new Date(resultadoPesquisa.entrada).toLocaleString()}`;
  
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Editar';
      editBtn.addEventListener('click', () => {
        editarVeiculo(vehicles.indexOf(resultadoPesquisa));
      });
      li.appendChild(editBtn);
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.addEventListener('click', () => {
        excluirVeiculo(vehicles.indexOf(resultadoPesquisa));
      });
      li.appendChild(deleteBtn);
  
      const payBtn = document.createElement('button');
      payBtn.textContent = 'Pagamento';
      payBtn.addEventListener('click', () => {
        calcularPagamentoVeiculo(resultadoPesquisa);
      });
      li.appendChild(payBtn);
  
      resultadoPesquisaContainer.appendChild(li);
    } else {
      resultadoPesquisaContainer.textContent = 'Veículo não encontrado.';
    }
  });