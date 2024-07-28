// relatorio.js
document.addEventListener('DOMContentLoaded', () => {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  const relatorioPagamentos = document.getElementById('relatorioPagamentos');

  if (pagamentos.length > 0) {
    pagamentos.forEach(pagamento => {
      const li = document.createElement('li');
      li.textContent = `ID: ${pagamento.id}, Valor: R$ ${pagamento.valor}, Data: ${pagamento.data}`;
      relatorioPagamentos.appendChild(li);
    });
  } else {
    relatorioPagamentos.textContent = 'Nenhum pagamento registrado.';
  }
});
