function gerarRelatorio() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];

  let relatorioHTML = `
    <html>
    <head>
      <title>Relatório de Veículos e Pagamentos</title>
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f2f2f2;
          text-align: left;
        }
      </style>
    </head>
    <body>
      <h2>Relatório de Veículos</h2>
      <table>
        <thead>
          <tr>
            <th>Placa</th>
            <th>Marca/Modelo</th>
            <th>Entrada</th>
            <th>Saída</th>
            <th>Tolerância (min)</th>
            <th>Tarifa (R$)</th>
          </tr>
        </thead>
        <tbody>`;

  vehicles.forEach(vehicle => {
    relatorioHTML += `
      <tr>
        <td>${vehicle.placa}</td>
        <td>${vehicle.marcaModelo}</td>
        <td>${new Date(vehicle.entrada).toLocaleString()}</td>
        <td>${vehicle.saida ? new Date(vehicle.saida).toLocaleString() : 'N/A'}</td>
        <td>${vehicle.tolerancia}</td>
        <td>${vehicle.tarifa}</td>
      </tr>`;
  });

  relatorioHTML += `
        </tbody>
      </table>
      <h2>Relatório de Pagamentos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Valor (R$)</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>`;

  pagamentos.forEach(pagamento => {
    relatorioHTML += `
      <tr>
        <td>${pagamento.id}</td>
        <td>${pagamento.valor}</td>
        <td>${pagamento.data}</td>
      </tr>`;
  });

  relatorioHTML += `
        </tbody>
      </table>
    </body>
    </html>`;

  const relatorioWindow = window.open('', '_blank');
  relatorioWindow.document.open();
  relatorioWindow.document.write(relatorioHTML);
  relatorioWindow.document.close();
}

// Adicionando um evento de clique ao botão para gerar o relatório
document.getElementById('generateReportBtn').addEventListener('click', gerarRelatorio);
