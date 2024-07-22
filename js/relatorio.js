
function carregarPagamentos() {
    
    const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  
    const tabelaPagamentos = document.getElementById('tabelaPagamentos');
  
 
    tabelaPagamentos.innerHTML = '';
  
   
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
  

  window.onload = carregarPagamentos;
  