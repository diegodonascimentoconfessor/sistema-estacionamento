document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);
document.getElementById('gerarCupomBtn').addEventListener('click', gerarCupom);

let valorPagamentoGlobal = 0;
let entradaGlobal = '';
let saidaGlobal = '';

function calcularPagamento() {
  const entrada = document.getElementById('entradaPagamento').value;
  const saida = document.getElementById('saidaPagamento').value;
  const tarifa = parseFloat(document.getElementById('tarifaPagamento').value) || 10;
  const tolerancia = parseInt(document.getElementById('toleranciaPagamento').value) || 10;

  if (!entrada || !saida || isNaN(tarifa) || isNaN(tolerancia)) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  const entradaDate = new Date(entrada);
  const saidaDate = new Date(saida);
  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (tolerancia / 60), 0); 

  const valorPagamento = diffHrsComTolerancia * tarifa;
  valorPagamentoGlobal = valorPagamento;
  entradaGlobal = entrada;
  saidaGlobal = saida;
  

  document.getElementById('valorPagamento').innerText = `Valor a Pagar: R$ ${valorPagamento.toFixed(2)}`;
  document.getElementById('gerarCupomBtn').style.display = 'block';
}

function gerarCupom() {
  const cupomWindow = window.open('', 'Cupom', 'width=600,height=400');
  cupomWindow.document.write(`
    <html>
    <head>
      <title>Cupom de Pagamento - Autopark</title>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        h1 { text-align: center; }
        .cupom { border: 1px solid #000; padding: 20px; margin-top: 20px; }
        .cupom p { margin: 5px 0; }
      </style>
    </head>
    <body>
      <h1>Cupom de Pagamento</h1>
      <div class="cupom">
        <p><strong>Entrada:</strong> ${entradaGlobal}</p>
        <p><strong>Saída:</strong> ${saidaGlobal}</p>
        <p><strong>Tarifa por Hora:</strong> R$ 10.00</p>
        <p><strong>Tolerância:</strong> 10 minutos</p>
        <p><strong>Valor a Pagar:</strong> R$ ${valorPagamentoGlobal.toFixed(2)}</p>
      </div>
      <button onclick="window.print();">Imprimir Cupom</button>
    </body>
    </html>
  `);
}
