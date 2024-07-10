document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);

function calcularPagamento() {
  const entrada = document.getElementById('entradaPagamento').value;
  const saida = document.getElementById('saidaPagamento').value;
  const tarifa = parseFloat(document.getElementById('tarifaPagamento').value);
  const tolerancia = parseInt(document.getElementById('toleranciaPagamento').value);

  if (!entrada || !saida || isNaN(tarifa) || isNaN(tolerancia)) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date(saida);
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (tolerancia / 60), 0); // Deduz a tolerância em horas

  const valorPagamento = diffHrsComTolerancia * tarifa;
  document.getElementById('valorPagamento').innerText = `Valor a Pagar: R$ ${valorPagamento.toFixed(2)}`;
}
