let valorPagamentoGlobal = 0;
let entradaGlobal = '';
let saidaGlobal = ''; // Armazenar a saída global
let metodoPagamentoGlobal = '';
let numeroCartaoGlobal = '';
let nomeTitularGlobal = '';
let validadeCartaoGlobal = '';
let cvvCartaoGlobal = '';

document.getElementById('metodoPagamento').addEventListener('change', function() {
  const metodoPagamento = this.value;
  const cartaoInfo = document.getElementById('cartaoInfo');
  cartaoInfo.style.display = (metodoPagamento === 'credito' || metodoPagamento === 'debito') ? 'block' : 'none';
});

document.getElementById('calcPagamentoBtn').addEventListener('click', calcularPagamento);
document.getElementById('gerarCupomBtn').addEventListener('click', gerarCupom);
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'index.html';
});

function formatarData(data) {
  const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('pt-BR', opcoes).format(new Date(data));
}

function calcularPagamento() {
  const placaVeiculo = document.getElementById('placaVeiculo').value;
  const entrada = document.getElementById('entradaPagamento').value;
  const metodoPagamento = document.getElementById('metodoPagamento').value;

  // Definindo valores fixos para tarifa e tolerância
  const tarifa = 10; // Valor fixo
  const tolerancia = 10; // Valor fixo

  if (!placaVeiculo || !entrada) {
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
  const saidaDate = new Date(); // Data e hora atuais para a saída

  const diffMs = saidaDate - entradaDate;
  const diffHrs = diffMs / (1000 * 60 * 60);
  const diffHrsComTolerancia = Math.max(diffHrs - (tolerancia / 60), 0);

  const valorPagamento = diffHrsComTolerancia * tarifa;
  valorPagamentoGlobal = valorPagamento;
  entradaGlobal = entrada;
  saidaGlobal = saidaDate.toISOString(); // Armazenar a data de saída globalmente

  metodoPagamentoGlobal = metodoPagamento;

  document.getElementById('valorPagamento').innerText = `R$ ${valorPagamento.toFixed(2)}`;
  document.getElementById('gerarCupomBtn').style.display = 'inline-block';

  // Armazenar o valor de pagamento no localStorage
  let veiculos = JSON.parse(localStorage.getItem('vehicles')) || [];
  let veiculoExistente = veiculos.find(v => v.placa === placaVeiculo);
  
  if (veiculoExistente) {
    veiculoExistente.valorRecebido = valorPagamentoGlobal;
  } else {
    veiculos.push({
      placa: placaVeiculo,
      marcaModelo: document.getElementById('marcaModelo').value,
      cor: document.getElementById('cor').value,
      entrada: entradaGlobal,
      valorRecebido: valorPagamentoGlobal
    });
  }

  localStorage.setItem('vehicles', JSON.stringify(veiculos));
}

function gerarCupom() {
  const cupom = `
    <html>
      <head>
        <title>Cupom</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #FFFFE0; /* Fundo amarelo claro */
            color: #000000; /* Texto preto para contraste */
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 10px;
            border: 1px solid #000000; /* Borda preta */
            border-radius: 5px;
            background-color: #FFFFFF; /* Fundo branco para a área do cupom */
          }
          h2 {
            text-align: center;
            color: #000000; /* Cor do título */
            margin-bottom: 20px;
          }
          p {
            margin: 5px 0; /* Espaçamento entre parágrafos */
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Cupom de Pagamento AutoPark</h2>
          <p><strong>Placa:</strong> ${document.getElementById('placaVeiculo').value}</p>
          <p><strong>Marca e Modelo:</strong> ${document.getElementById('marcaModelo').value}</p>
          <p><strong>Cor:</strong> ${document.getElementById('cor').value}</p>
          <p><strong>Entrada:</strong> ${formatarData(entradaGlobal)}</p>
          <p><strong>Saída:</strong> ${formatarData(saidaGlobal)}</p>
          <p><strong>Valor a Pagar:</strong> R$ ${valorPagamentoGlobal.toFixed(2)}</p>
            <p><strong>Tarifa:</strong> R$ ${tarifa.toFixed(2)}</p>
          <p><strong>Tolerância:</strong> ${tolerancia} minutos</p>
          <p class="footer">Obrigado e Volte Sempre!</p>
        </div>
      </body>
    </html>
  `;
  
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write(cupom);
  printWindow.document.close();
  printWindow.print();
}
