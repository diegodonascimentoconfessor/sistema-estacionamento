window.onload = function() {
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    const totalValueElement = document.getElementById('totalValue');
  
    // Função para formatar valores em moeda
    function formatCurrency(value) {
      return `R$ ${parseFloat(value).toFixed(2).replace('.', ',')}`;
    }
  
    // Carregar pagamentos do localStorage
    let veiculos = JSON.parse(localStorage.getItem('vehicles')) || [];
    
    // Inicializar total
    let total = 0;
  
    // Preencher a tabela com dados dos pagamentos
    veiculos.forEach((veiculo, index) => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${veiculo.placa}</td>
        <td>${formatCurrency(veiculo.valorRecebido)}</td>
        <td>${new Date(veiculo.entrada).toLocaleString('pt-BR')}</td>
      `;
      
      paymentsTableBody.appendChild(row);
      
      total += veiculo.valorRecebido;
    });
  
    // Atualizar o total recebido
    totalValueElement.textContent = formatCurrency(total);
  };
  