// Função para carregar e exibir os dados de pagamento
function carregarPagamentos() {
  const paymentsTableBody = document.getElementById('paymentsTableBody');
  const totalValueElement = document.getElementById('totalValue');

  let pagamentos = JSON.parse(localStorage.getItem('payments')) || [];
  let totalRecebido = 0;

  // Limpa a tabela antes de carregar os dados
  paymentsTableBody.innerHTML = '';

  pagamentos.forEach(pagamento => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${pagamento.id}</td>
      <td>${pagamento.placa}</td>
      <td>R$ ${pagamento.valor.toFixed(2)}</td>
      <td>${new Date(pagamento.dataPagamento).toLocaleString('pt-BR')}</td>
    `;
    paymentsTableBody.appendChild(row);
    totalRecebido += pagamento.valor;
  });

  totalValueElement.innerText = `R$ ${totalRecebido.toFixed(2)}`;
}

// Carregar pagamentos ao carregar a página
document.addEventListener('DOMContentLoaded', carregarPagamentos);
