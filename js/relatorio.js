document.addEventListener('DOMContentLoaded', carregarRelatorio);

function carregarRelatorio() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const relatorioContainer = document.getElementById('relatorioContainer');

  if (vehicles.length === 0) {
    relatorioContainer.innerHTML = '<p>Nenhum veículo registrado.</p>';
    return;
  }

  let totalRecebido = 0;

  const relatorioTable = document.createElement('table');
  relatorioTable.innerHTML = `
    <thead>
      <tr>
        <th>Placa</th>
        <th>Marca/Modelo</th>
        <th>Entrada</th>
        <th>Saída</th>
        <th>Tempo (Horas)</th>
        <th>Valor Recebido</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  const tbody = relatorioTable.querySelector('tbody');

  vehicles.forEach((vehicle, index) => {
    const entradaDate = new Date(vehicle.entrada);
    const saidaDate = new Date(); // Usando a data atual como data de saída
    const diffMs = saidaDate - entradaDate;
    const diffHrs = diffMs / (1000 * 60 * 60);
    const diffHrsComTolerancia = Math.max(diffHrs - (vehicle.tolerancia / 60), 0);
    const valorRecebido = diffHrsComTolerancia * parseFloat(vehicle.tarifa);

    totalRecebido += valorRecebido;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${vehicle.placa}</td>
      <td>${vehicle.marcaModelo}</td>
      <td>${entradaDate.toLocaleString()}</td>
      <td>${saidaDate.toLocaleString()}</td>
      <td>${diffHrs.toFixed(2)}</td>
      <td>R$ ${valorRecebido.toFixed(2)}</td>
      <td><button onclick="excluirVeiculo(${index})">Excluir</button></td>
    `;
    tbody.appendChild(tr);
  });

  const resumo = document.createElement('div');
  resumo.innerHTML = `
    <p>Total Recebido: R$ ${totalRecebido.toFixed(2)}</p>
    <p>Total de Veículos: ${vehicles.length}</p>
  `;

  relatorioContainer.appendChild(resumo);
  relatorioContainer.appendChild(relatorioTable);
}

function excluirVeiculo(index) {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  vehicles.splice(index, 1);
  localStorage.setItem('vehicles', JSON.stringify(vehicles));
  carregarRelatorio(); // Recarrega o relatório para atualizar a lista
}
