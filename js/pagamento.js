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

function calcularPagamento() {
  const placaVeiculo = document.getElementById('placaVeiculo').value;
  const entrada = document.getElementById('entradaPagamento').value;
  const tarifa = parseFloat(document.getElementById('tarifaPagamento').value) || 10;
  const tolerancia = parseInt(document.getElementById('toleranciaPagamento').value) || 10;
  const metodoPagamento = document.getElementById('metodoPagamento').value;

  if (!placaVeiculo || !entrada || isNaN(tarifa) || isNaN(tolerancia)) {
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
  saidaGlobal = saidaDate.toISOString(); // Armazena a data de saída globalmente

  metodoPagamentoGlobal = metodoPagamento;

  document.getElementById('valorPagamento').innerText = ` R$ ${valorPagamento.toFixed(2)}`;
  document.getElementById('gerarCupomBtn').style.display = 'inline-block';
}

function gerarCupom() {
  const placaVeiculo = document.getElementById('placaVeiculo').value;

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
        <p><strong>Placa do Veículo:</strong> ${placaVeiculo}</p>
        <p><strong>Entrada:</strong> ${entradaGlobal}</p>
        <p><strong>Saída:</strong> ${saidaGlobal}</p>
        <p><strong>Tarifa por Hora:</strong> R$ ${document.getElementById('tarifaPagamento').value}</p>
        <p><strong>Tolerância:</strong> ${document.getElementById('toleranciaPagamento').value} minutos</p>
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

  // Armazenar informações de pagamento em localStorage
  let pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  pagamentos.push({
    id: pagamentos.length + 1, // Gerar um ID simples para o pagamento
    placa: placaVeiculo,
    marcaModelo: document.getElementById('marcaModelo').value,
    entrada: entradaGlobal,
    saida: saidaGlobal,
    valorRecebido: valorPagamentoGlobal,
    tarifa: document.getElementById('tarifaPagamento').value,
    tolerancia: document.getElementById('toleranciaPagamento').value,
    metodoPagamento: metodoPagamentoGlobal,
    numeroCartao: numeroCartaoGlobal,
    nomeTitular: nomeTitularGlobal,
    validadeCartao: validadeCartaoGlobal,
    cvvCartao: cvvCartaoGlobal,
    data: new Date().toISOString()
  });

  localStorage.setItem('pagamentos', JSON.stringify(pagamentos));
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
      return '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  carregarVeiculos();
  carregarPagamentos();
});

function carregarVeiculos() {
  const vehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
  const vehiclesTableBody = document.getElementById('vehiclesTable').getElementsByTagName('tbody')[0];

  vehicles.forEach(vehicle => {
    const row = vehiclesTableBody.insertRow();
    
    row.insertCell(0).textContent = vehicle.placa;
    row.insertCell(1).textContent = vehicle.marcaModelo;
    row.insertCell(2).textContent = new Date(vehicle.entrada).toLocaleString();
    row.insertCell(3).textContent = vehicle.tolerancia;
    row.insertCell(4).textContent = vehicle.tarifa;
    row.insertCell(5).textContent = vehicle.valorRecebido || 'N/A'; // Adiciona valor recebido, se disponível
  });
}

function carregarPagamentos() {
  const pagamentos = JSON.parse(localStorage.getItem('pagamentos')) || [];
  const paymentsTableBody = document.getElementById('paymentsTable').getElementsByTagName('tbody')[0];

  pagamentos.forEach(pagamento => {
    const row = paymentsTableBody.insertRow();
    
    row.insertCell(0).textContent = pagamento.id;
    row.insertCell(1).textContent = `R$ ${pagamento.valorRecebido.toFixed(2)}`;
    row.insertCell(2).textContent = new Date(pagamento.data).toLocaleString();
  });
}


document.addEventListener("DOMContentLoaded", function() {
  let marcaModelo = localStorage.getItem("marcaModelo");
  let entrada = localStorage.getItem("entrada");
  let placa = localStorage.getItem("placa");

  document.getElementById("marcaModelo").value = marcaModelo;
  document.getElementById("entradaPagamento").value = entrada;
  document.getElementById("placaVeiculo").value = placa;
});