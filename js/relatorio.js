document.addEventListener('DOMContentLoaded', carregarRelatorio);

function carregarRelatorio() {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  const relatorioContainer = document.getElementById('relatorioContainer');

  if (pagamentos.length === 0) {
    relatorioContainer.innerHTML = '<p>Nenhum pagamento registrado.</p>';
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
      </tr>
    </thead>
    <tbody>
    </tbody>
  `;

  const tbody = relatorioTable.querySelector('tbody');

  pagamentos.forEach(pagamento => {
    const entradaDate = new Date(pagamento.entrada);
    const saidaDate = new Date(pagamento.saida);
    const diffMs = saidaDate - entradaDate;
    const diffHrs = diffMs / (1000 * 60 * 60);
    const diffHrsComTolerancia = Math.max(diffHrs - (pagamento.tolerancia / 60), 0);
    const valorRecebido = pagamento.valorRecebido;

    totalRecebido += valorRecebido;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${pagamento.placa}</td>
      <td>${pagamento.marcaModelo}</td>
      <td>${entradaDate.toLocaleString()}</td>
      <td>${saidaDate.toLocaleString()}</td>
      <td>${diffHrs.toFixed(2)}</td>
      <td>R$ ${valorRecebido.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });

  const resumo = document.createElement('div');
  resumo.innerHTML = `
    <p>Total Recebido: R$ ${totalRecebido.toFixed(2)}</p>
    <p>Total de Pagamentos: ${pagamentos.length}</p>
  `;

  relatorioContainer.appendChild(resumo);
  relatorioContainer.appendChild(relatorioTable);
}
