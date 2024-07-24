document.addEventListener('DOMContentLoaded', carregarResumoPagamento);

function carregarResumoPagamento() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const pagamentoContainer = document.getElementById('pagamentoContainer'); // Substitua pelo ID do seu container de pagamento

  if (vehicles.length === 0) {
    pagamentoContainer.innerHTML = '<p>Nenhum veículo registrado.</p>';
    return;
  }

  let totalRecebido = 0;

  const resumoPagamento = document.createElement('div');
  resumoPagamento.innerHTML = `
    <h2>Resumo de Pagamento</h2>
    <ul>
      ${vehicles.map(vehicle => {
        const entradaDate = new Date(vehicle.entrada);
        const saidaDate = new Date();
        const diffMs = saidaDate - entradaDate;
        const diffHrs = diffMs / (1000 * 60 * 60);
        const diffHrsComTolerancia = Math.max(diffHrs - (vehicle.tolerancia / 60), 0);
        const valorRecebido = diffHrsComTolerancia * parseFloat(vehicle.tarifa);

        totalRecebido += valorRecebido;

        return `
          <li>
            Placa: ${vehicle.placa}, Entrada: ${entradaDate.toLocaleString()}, Saída: ${saidaDate.toLocaleString()}, Valor: R$ ${valorRecebido.toFixed(2)}
          </li>
        `;
      }).join('')}
    </ul>
    <p>Total Recebido: R$ ${totalRecebido.toFixed(2)}</p>
  `;

  pagamentoContainer.appendChild(resumoPagamento);
}
