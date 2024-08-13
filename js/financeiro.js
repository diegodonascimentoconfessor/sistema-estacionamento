const tarifaPorSegundo = 0.00278; // Valor por segundo

document.addEventListener('DOMContentLoaded', carregarDadosFinanceiros);

function carregarDadosFinanceiros() {
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    let totalValue = 0;

    vehicles.forEach((vehicle, index) => {
        const tr = document.createElement('tr');

        // ID
        const idTd = document.createElement('td');
        idTd.textContent = index + 1;
        tr.appendChild(idTd);

        // Placa do Veículo
        const placaTd = document.createElement('td');
        placaTd.textContent = vehicle.placa;
        tr.appendChild(placaTd);

        // Valor Recebido
        const valorPagoTd = document.createElement('td');
        const entrada = new Date(vehicle.entrada);
        const saida = new Date();
        const tempoEmSegundos = Math.floor((saida - entrada) / 1000);
        const valorPago = tempoEmSegundos * tarifaPorSegundo;
        valorPagoTd.textContent = `R$ ${valorPago.toFixed(2)}`;
        tr.appendChild(valorPagoTd);

        // Data do Pagamento
        const dataPagamentoTd = document.createElement('td');
        dataPagamentoTd.textContent = saida.toLocaleDateString();
        tr.appendChild(dataPagamentoTd);

        // Horário de Saída
        const horarioSaidaTd = document.createElement('td');
        horarioSaidaTd.textContent = saida.toLocaleTimeString();
        tr.appendChild(horarioSaidaTd);

        // Tempo (segundos)
        const tempoTd = document.createElement('td');
        tempoTd.textContent = tempoEmSegundos;
        tr.appendChild(tempoTd);

        paymentsTableBody.appendChild(tr);

        totalValue += valorPago;
    });

    document.getElementById('totalValue').textContent = `R$ ${totalValue.toFixed(2)}`;
}
