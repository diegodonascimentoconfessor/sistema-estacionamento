document.addEventListener('DOMContentLoaded', function() {
  const paymentsTableBody = document.getElementById('paymentsTableBody');
  const totalValueElement = document.getElementById('totalValue');

  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  let totalValue = 0;

  pagamentos.forEach(pagamento => {
    const row = document.createElement('tr');

    const idCell = document.createElement('td');
    idCell.textContent = pagamento.id;
    row.appendChild(idCell);

    const placaCell = document.createElement('td');
    placaCell.textContent = pagamento.placa;
    row.appendChild(placaCell);

    const valorCell = document.createElement('td');
    valorCell.textContent = `R$ ${pagamento.valorRecebido.toFixed(2)}`;
    row.appendChild(valorCell);

    const dataCell = document.createElement('td');
    dataCell.textContent = pagamento.dataPagamento;
    row.appendChild(dataCell);

    paymentsTableBody.appendChild(row);

    totalValue += pagamento.valorRecebido;
  });

  totalValueElement.textContent = `R$ ${totalValue.toFixed(2)}`;
});


window.addEventListener('DOMContentLoaded', function() {
  const vehicleData = JSON.parse(localStorage.getItem('vehicleData'));

  if (vehicleData) {
      // Preencher os campos com os dados armazenados
      document.getElementById('placaVeiculo').value = vehicleData.placa;
      document.getElementById('marcaModelo').value = vehicleData.marcaModelo;
      document.getElementById('entradaPagamento').value = vehicleData.entrada; // Data de entrada automática
  }

  // Lógica para calcular o pagamento e outros processos
  document.getElementById('calcPagamentoBtn').addEventListener('click', function() {
      // Calcular pagamento
      const entrada = new Date(vehicleData.entrada);
      const agora = new Date();
      const horas = Math.ceil((agora - entrada) / (1000 * 60 * 60)); // Diferenca em horas

      const tarifa = document.getElementById('tarifaPagamento').value;
      const valorTotal = horas * tarifa;

      document.getElementById('valorPagamento').textContent = `Total a pagar: R$ ${valorTotal.toFixed(2)}`;
      document.getElementById('gerarCupomBtn').style.display = 'block';
  });

  // Limpar localStorage após o pagamento
  document.getElementById('gerarCupomBtn').addEventListener('click', function() {
      localStorage.removeItem('vehicleData');
  });
});
