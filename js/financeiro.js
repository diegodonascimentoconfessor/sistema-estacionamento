document.addEventListener('DOMContentLoaded', function() {
  // Função para formatar valores em moeda
  function formatarMoeda(valor) {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  }

  // Função para calcular o tempo em segundos
  function calcularTempo(entrada, saida) {
    const entradaDate = new Date(entrada);
    const saidaDate = new Date(saida);
    return Math.floor((saidaDate - entradaDate) / 1000); // Diferença em segundos
  }

  // Função para formatar data e hora
  function formatarData(data) {
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(data));
  }

  // Carregar os pagamentos do localStorage
  let veiculos = JSON.parse(localStorage.getItem('vehicles')) || [];
  const paymentsTableBody = document.getElementById('paymentsTableBody');
  let totalRecebido = 0;

  // Preencher a tabela com os dados de pagamentos
  veiculos.forEach((veiculo, index) => {
    const tr = document.createElement('tr');
    const tempoEmSegundos = calcularTempo(veiculo.entrada, veiculo.saida || new Date().toISOString());

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${veiculo.placa}</td>
      <td>${formatarMoeda(veiculo.valorRecebido)}</td>
      <td>${formatarData(veiculo.entrada)}</td>
      <td>${formatarData(veiculo.saida || new Date().toISOString())}</td>
      <td>${tempoEmSegundos}</td>
    `;
    
    paymentsTableBody.appendChild(tr);
    totalRecebido += veiculo.valorRecebido;
  });

  // Atualizar o total na tabela
  document.getElementById('totalValue').innerText = formatarMoeda(totalRecebido);
});
