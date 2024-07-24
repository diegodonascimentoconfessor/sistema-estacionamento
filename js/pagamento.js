document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);
document.getElementById('gerarCupomBtn').addEventListener('click', gerarCupom);
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'index.html';
});

let valorPagamentoGlobal = 0;
let entradaGlobal = '';
let saidaGlobal = '';
let metodoPagamentoGlobal = '';
let numeroCartaoGlobal = '';
let nomeTitularGlobal = '';
let validadeCartaoGlobal = '';
let cvvCartaoGlobal = '';

document.getElementById('metodoPagamento').addEventListener('change', function() {
  const metodoPagamento = this.value;
  const cartaoInfo = document.getElementById('cartaoInfo');

  if (metodoPagamento === 'credito' || metodoPagamento === 'debito') {
    cartaoInfo.style.display = 'block';
  } else {
    cartaoInfo.style.display = 'none';
  }
});

function calcularPagamento() {
  const entrada = document.getElementById('entradaPagamento').value;
  const saida = document.getElementById('saidaPagamento').value;
  const tarifa = parseFloat(document.getElementById('tarifaPagamento').value) || 10;
  const tolerancia = parseInt(document.getElementById('toleranciaPagamento').value) || 10;
  const metodoPagamento = document.getElementById('metodoPagamento').value;

  if (!entrada || !saida || isNaN(tarifa) || isNaN(tolerancia)) {
    alert('Por favor, preencha todos os campos necessários.');
    return;
  }

  if (metodoPagamento === 'credito' || metodoPagamento === 'debito') {
    const numeroCartao = document.getElementById('numeroCartao').value;
    const nomeTitular = document.getElementById('nomeTitular').value;
    const validadeCartao = document.getElementById('validadeCartao').value;
    const cvvCartao = document.getElementById('cvvCartao').value;

    if (!numeroCartao || !nomeTitular || !validadeCartao || !cvvCartao) {
      alert('Por favor, preencha todos os campos do cartão.');
      return;
    }

    numeroCartaoGlobal = numeroCartao;
    nomeTitularGlobal = nomeTitular;
    validadeCartaoGlobal = validadeCartao;
    cvvCartaoGlobal = cvvCartao;
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
  metodoPagamentoGlobal = metodoPagamento;

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
        <p><strong>Método de Pagamento:</strong> ${getMetodoPagamentoTexto(metodoPagamentoGlobal)}</p>
        ${metodoPagamentoGlobal === 'credito' || metodoPagamentoGlobal === 'debito' ? `
          <p><strong>Número do Cartão:</strong> ${numeroCartaoGlobal}</p>
          <p><strong>Nome do Titular:</strong> ${nomeTitularGlobal}</p>
          <p><strong>Validade:</strong> ${validadeCartaoGlobal}</p>
          <p><strong>CVV:</strong> ${cvvCartaoGlobal}</p>
        ` : ''}
      </div>
      <button onclick="window.print();">Imprimir Cupom</button>
    </body>
    </html>
  `);
}

function getMetodoPagamentoTexto(metodo) {
  switch (metodo) {
    case 'dinheiro':
      return 'Dinheiro';
    case 'credito':
      return 'Cartão de Crédito';
    case 'debito':
      return 'Cartão de Débito';
    case 'pix':
      return 'PIX';
    default:
      return 'Não especificado';
  }
}
