// Define a tarifa por segundo
const tarifaPorSegundo = 0.00278; // Valor por segundo

// Adiciona um evento que chama a função de carregar dados financeiros quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarDadosFinanceiros);

function carregarDadosFinanceiros() {
    // Recupera os dados dos veículos armazenados no localStorage
    const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    let totalValue = 0;

    // Limpa o conteúdo da tabela para evitar duplicação
    paymentsTableBody.innerHTML = '';

    // Itera sobre cada veículo e cria uma linha na tabela
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
        const entrada = new Date(vehicle.entrada); // Data e hora de entrada do veículo
        const saida = new Date(); // Data e hora atuais como saída
        const tempoEmSegundos = Math.floor((saida - entrada) / 1000); // Calcula o tempo em segundos
        const valorPago = tempoEmSegundos * tarifaPorSegundo; // Calcula o valor a pagar
        valorPagoTd.textContent = `R$ ${valorPago.toFixed(2)}`; // Formata o valor para 2 casas decimais
        tr.appendChild(valorPagoTd);

        // Data do Pagamento
        const dataPagamentoTd = document.createElement('td');
        dataPagamentoTd.textContent = saida.toLocaleDateString(); // Formata a data para DD/MM/YYYY
        tr.appendChild(dataPagamentoTd);

        // Horário de Saída
        const horarioSaidaTd = document.createElement('td');
        horarioSaidaTd.textContent = saida.toLocaleTimeString(); // Formata a hora para HH:MM:SS
        tr.appendChild(horarioSaidaTd);

        // Tempo (segundos)
        const tempoTd = document.createElement('td');
        tempoTd.textContent = tempoEmSegundos; // Exibe o tempo em segundos
        tr.appendChild(tempoTd);

        // Adiciona a linha à tabela
        paymentsTableBody.appendChild(tr);

        // Soma o valor pago ao valor total
        totalValue += valorPago;
    });

    // Exibe o valor total dos pagamentos
    document.getElementById('totalValue').textContent = `Total: R$ ${totalValue.toFixed(2)}`;
}


function carregarDadosFinanceiros() {
    const pagamentoData = JSON.parse(localStorage.getItem('pagamentoData')) || {};
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    let totalValue = 0;

    paymentsTableBody.innerHTML = '';

    if (pagamentoData.placaVeiculo) {
        const tr = document.createElement('tr');

        // ID
        const idTd = document.createElement('td');
        idTd.textContent = 1;
        tr.appendChild(idTd);

        // Placa do Veículo
        const placaTd = document.createElement('td');
        placaTd.textContent = pagamentoData.placaVeiculo;
        tr.appendChild(placaTd);

        // Valor Recebido
        const valorPagoTd = document.createElement('td');
        const entrada = new Date(pagamentoData.entrada);
        const saida = new Date(pagamentoData.saida);
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
    }

    document.getElementById('totalValue').textContent = `Total: R$ ${totalValue.toFixed(2)}`;
}


function excluirPagamento(index) {
    let pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
    pagamentos.splice(index, 1); // Remove o item na posição `index`
    localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
    carregarDadosFinanceiros(); // Recarregar a tabela após exclusão
}
