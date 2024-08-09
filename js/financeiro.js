
document.addEventListener('DOMContentLoaded', carregarRelatorio);

function carregarRelatorio() {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  const paymentsTableBody = document.getElementById('paymentsTableBody');
  let totalValue = 0;

  pagamentos.forEach(pagamento => {
    const row = paymentsTableBody.insertRow();
    
    row.insertCell(0).textContent = pagamento.id;
    row.insertCell(1).textContent = pagamento.placa;
    row.insertCell(2).textContent = `R$ ${pagamento.valorRecebido.toFixed(2)}`;
    row.insertCell(3).textContent = new Date(pagamento.data).toLocaleString();

    totalValue += pagamento.valorRecebido;
  });

  document.getElementById('totalValue').textContent = `R$ ${totalValue.toFixed(2)}`;
}
