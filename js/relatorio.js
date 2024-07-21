// Função para carregar dados do localStorage e exibir na tabela
function carregarPagamentos() {
    // Buscar dados do localStorage
    const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  
    // Selecionar o corpo da tabela
    const tabelaPagamentos = document.getElementById('tabelaPagamentos');
  
    // Limpar tabela antes de inserir novos dados
    tabelaPagamentos.innerHTML = '';
  
    // Iterar sobre os pagamentos e criar linhas na tabela
    pagamentos.forEach(pagamento => {
      const linha = document.createElement('tr');
  
      const colunaId = document.createElement('td');
      colunaId.textContent = pagamento.id;
      linha.appendChild(colunaId);
  
      const colunaValor = document.createElement('td');
      colunaValor.textContent = pagamento.valor;
      linha.appendChild(colunaValor);
  
      const colunaData = document.createElement('td');
      colunaData.textContent = pagamento.data;
      linha.appendChild(colunaData);
  
      tabelaPagamentos.appendChild(linha);
    });
  }
  
  // Carregar pagamentos ao carregar a página
  window.onload = carregarPagamentos;
  