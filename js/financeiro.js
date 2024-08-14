const tarifaPorSegundo = 0.00278; // Valor por segundo

// Adiciona um evento que chama a função de carregar dados financeiros quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', carregarDadosFinanceiros);

function carregarDadosFinanceiros() {
    const paymentsTableBody = document.getElementById('paymentsTableBody');
    let totalValue = 0;

    paymentsTableBody.innerHTML = '';

    // Recupera os dados do pagamento a partir do momento em que um veículo foi adicionado
    const pagamentoData = JSON.parse(localStorage.getItem('pagamentoData')) || {};

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

function salvarPagamento(placa, entrada, saida) {
    const pagamentoData = {
        placaVeiculo: placa,
        entrada: entrada,
        saida: saida
    };

    // Salva os dados do pagamento no localStorage
    localStorage.setItem('pagamentoData', JSON.stringify(pagamentoData));

    // Chama a função para carregar e exibir os dados financeiros
    carregarDadosFinanceiros();
}

function excluirPagamento() {
    localStorage.removeItem('pagamentoData'); // Remove o dado do pagamento
    carregarDadosFinanceiros(); // Recarregar a tabela após exclusão
}
