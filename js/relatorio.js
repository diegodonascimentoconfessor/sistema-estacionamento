document.addEventListener('DOMContentLoaded', function () {
  console.log('Script relatorio.js carregado.');

  const tabelaPagamentos = document.getElementById('tabelaPagamentos');

  
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];

  console.log('Pagamentos recuperados do localStorage:', pagamentos);

 
  pagamentos.forEach(pagamento => {
      const tr = document.createElement('tr');
      
      const tdPlaca = document.createElement('td');
      tdPlaca.textContent = pagamento.placa;
      tr.appendChild(tdPlaca);

      const tdMarcaModelo = document.createElement('td');
      tdMarcaModelo.textContent = pagamento.marcaModelo;
      tr.appendChild(tdMarcaModelo);

      const tdEntrada = document.createElement('td');
      tdEntrada.textContent = pagamento.entrada;
      tr.appendChild(tdEntrada);

      const tdSaida = document.createElement('td');
      tdSaida.textContent = pagamento.saida;
      tr.appendChild(tdSaida);

      const tdValorRecebido = document.createElement('td');
      tdValorRecebido.textContent = `R$ ${pagamento.valorRecebido.toFixed(2)}`;
      tr.appendChild(tdValorRecebido);

      const tdTarifa = document.createElement('td');
      tdTarifa.textContent = `R$ ${pagamento.tarifa}`;
      tr.appendChild(tdTarifa);

      const tdTolerancia = document.createElement('td');
      tdTolerancia.textContent = `${pagamento.tolerancia} minutos`;
      tr.appendChild(tdTolerancia);

      tabelaPagamentos.appendChild(tr);
  });
});
