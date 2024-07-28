document.addEventListener('DOMContentLoaded', () => {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  const relatorioPagamentos = document.getElementById('relatorioPagamentos');
  let receitaTotal = 0;

  if (pagamentos.length > 0) {
    pagamentos.forEach((pagamento, index) => {
      const li = document.createElement('li');
      li.textContent = `ID: ${pagamento.id}, Valor: R$ ${pagamento.valor}, Data: ${pagamento.data}`;

      // Botão de excluir
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Excluir';
      deleteBtn.addEventListener('click', () => {
        excluirPagamento(index);
      });
      li.appendChild(deleteBtn);

      // Botão de gerar cupom
      const cupomBtn = document.createElement('button');
      cupomBtn.textContent = 'Gerar Cupom';
      cupomBtn.addEventListener('click', () => {
        gerarCupom(pagamento);
      });
      li.appendChild(cupomBtn);

      relatorioPagamentos.appendChild(li);
      receitaTotal += parseFloat(pagamento.valor);
    });
  } else {
    relatorioPagamentos.textContent = 'Nenhum pagamento registrado.';
  }

  const totalReceitaElement = document.createElement('p');
  totalReceitaElement.textContent = `Receita Total: R$ ${receitaTotal.toFixed(2)}`;
  relatorioPagamentos.appendChild(totalReceitaElement);
});

function excluirPagamento(index) {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  pagamentos.splice(index, 1);
  localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
  location.reload(); // Recarrega a página para atualizar a lista de pagamentos
}

function gerarCupom(pagamento) {
  const cupomWindow = window.open('', '_blank', 'width=400,height=600');
  cupomWindow.document.write(`
    <html>
    <head>
      <title>Cupom de Pagamento</title>
    </head>
    <body>
      <h1>Cupom de Pagamento</h1>
      <p>ID: ${pagamento.id}</p>
      <p>Valor: R$ ${pagamento.valor}</p>
      <p>Data: ${pagamento.data}</p>
      <button onclick="window.print()">Imprimir</button>
    </body>
    </html>
  `);
  cupomWindow.document.close();
}
